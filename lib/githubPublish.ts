const GITHUB_API = "https://api.github.com";

interface PublishResult {
  branch: string;
  commitSha: string;
  prNumber: number;
  prUrl: string;
  applyReport?: ApplyReport;
}

interface GitHubRefResponse {
  object: {
    sha: string;
  };
}

export interface CopyRow {
  id: string;
  page: string;
  section: string;
  field: string;
  current_text: string;
  new_text: string;
  notes: string;
}

interface ApplyReport {
  attempted: number;
  applied: number;
  skipped: number;
  details: Array<{
    id: string;
    status: "applied" | "skipped";
    reason?: string;
    file?: string;
  }>;
}

const MANAGED_FILES = [
  "app/layout.tsx",
  "components/Header.tsx",
  "components/Footer.tsx",
  "app/page.tsx",
  "app/about/page.tsx",
  "app/videos/page.tsx",
  "app/gallery/page.tsx",
  "app/calendar/page.tsx",
  "app/tools/page.tsx",
  "app/get-involved/page.tsx",
  "app/bone-zone/page.tsx",
  "app/not-found.tsx",
];

const PAGE_TO_FILES: Record<string, string[]> = {
  global: ["app/layout.tsx", "components/Header.tsx", "components/Footer.tsx"],
  home: ["app/page.tsx"],
  about: ["app/about/page.tsx"],
  videos: ["app/videos/page.tsx"],
  gallery: ["app/gallery/page.tsx"],
  calendar: ["app/calendar/page.tsx"],
  tools: ["app/tools/page.tsx"],
  "get-involved": ["app/get-involved/page.tsx"],
  "bone-zone": ["app/bone-zone/page.tsx"],
  "404": ["app/not-found.tsx"],
};

async function githubRequest<T>(
  pathname: string,
  init: RequestInit = {}
): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN environment variable");
  }

  const response = await fetch(`${GITHUB_API}${pathname}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}

function getRepoConfig() {
  const owner = process.env.GITHUB_OWNER || "jacobpopcantstop";
  const repo = process.env.GITHUB_REPO || "dadskeleton";
  const baseBranch = process.env.GITHUB_BASE_BRANCH || "main";
  return { owner, repo, baseBranch };
}

async function getFileAtRef(
  owner: string,
  repo: string,
  filePath: string,
  ref: string
): Promise<{ sha: string; content: string }> {
  const data = await githubRequest<{ sha: string; content: string }>(
    `/repos/${owner}/${repo}/contents/${filePath}?ref=${ref}`
  );
  const decoded = Buffer.from(data.content.replaceAll("\n", ""), "base64").toString(
    "utf8"
  );
  return { sha: data.sha, content: decoded };
}

async function putFile(
  owner: string,
  repo: string,
  filePath: string,
  content: string,
  branch: string,
  message: string
): Promise<{ sha: string }> {
  let existingSha: string | undefined;
  try {
    const existing = await githubRequest<{ sha: string }>(
      `/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
    );
    existingSha = existing.sha;
  } catch {
    existingSha = undefined;
  }

  const updated = await githubRequest<{ content: { sha: string } }>(
    `/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf8").toString("base64"),
        branch,
        sha: existingSha,
      }),
    }
  );
  return { sha: updated.content.sha };
}

function shouldSkipRow(row: CopyRow): string | null {
  const current = row.current_text?.trim() ?? "";
  const next = row.new_text?.trim() ?? "";
  if (!next) return "empty_new_text";
  if (!current) return "empty_current_text";
  if (current === next) return "unchanged";
  if (current.length < 8) return "current_text_too_short";
  return null;
}

function applyRowsToFiles(
  rows: CopyRow[],
  fileContents: Map<string, string>
): { updatedFiles: Map<string, string>; report: ApplyReport } {
  const updated = new Map(fileContents);
  const details: ApplyReport["details"] = [];

  for (const row of rows) {
    const skip = shouldSkipRow(row);
    if (skip) {
      details.push({ id: row.id, status: "skipped", reason: skip });
      continue;
    }

    const targetFiles =
      PAGE_TO_FILES[row.page] && PAGE_TO_FILES[row.page].length > 0
        ? PAGE_TO_FILES[row.page]
        : MANAGED_FILES;

    const matches: Array<{ file: string; count: number }> = [];
    for (const file of targetFiles) {
      const content = updated.get(file);
      if (!content) continue;
      const count = content.split(row.current_text).length - 1;
      if (count > 0) matches.push({ file, count });
    }

    const totalMatches = matches.reduce((sum, m) => sum + m.count, 0);
    if (totalMatches === 0) {
      details.push({ id: row.id, status: "skipped", reason: "no_match_found" });
      continue;
    }
    if (totalMatches > 1) {
      details.push({
        id: row.id,
        status: "skipped",
        reason: "ambiguous_multiple_matches",
      });
      continue;
    }

    const target = matches[0].file;
    const content = updated.get(target)!;
    const next = content.replace(row.current_text, row.new_text);
    updated.set(target, next);
    details.push({ id: row.id, status: "applied", file: target });
  }

  const applied = details.filter((d) => d.status === "applied").length;
  const skipped = details.length - applied;
  return {
    updatedFiles: updated,
    report: {
      attempted: details.length,
      applied,
      skipped,
      details,
    },
  };
}

export async function publishCopySheetToBranch(args: {
  filePath: string;
  fileContent: string;
  rows?: CopyRow[];
  commitMessage?: string;
  prTitle?: string;
  prBody?: string;
}): Promise<PublishResult> {
  const { owner, repo, baseBranch } = getRepoConfig();
  const timestamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
  const branch = `admin/copy-${timestamp}`;

  const baseRef = await githubRequest<GitHubRefResponse>(
    `/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`
  );

  await githubRequest<{ ref: string }>(`/repos/${owner}/${repo}/git/refs`, {
    method: "POST",
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha: baseRef.object.sha,
    }),
  });

  const commitMessage = args.commitMessage || "Update site copy via admin";

  // Always write the CSV first.
  const csvResult = await putFile(
    owner,
    repo,
    args.filePath,
    args.fileContent,
    branch,
    commitMessage
  );

  let applyReport: ApplyReport | undefined;
  if (Array.isArray(args.rows) && args.rows.length > 0) {
    const fileContents = new Map<string, string>();
    for (const file of MANAGED_FILES) {
      const loaded = await getFileAtRef(owner, repo, file, branch);
      fileContents.set(file, loaded.content);
    }

    const applied = applyRowsToFiles(args.rows, fileContents);
    applyReport = applied.report;

    for (const [file, content] of applied.updatedFiles.entries()) {
      if (content !== fileContents.get(file)) {
        await putFile(
          owner,
          repo,
          file,
          content,
          branch,
          `Admin: apply copy rows to ${file}`
        );
      }
    }
  }

  const pr = await githubRequest<{ number: number; html_url: string }>(
    `/repos/${owner}/${repo}/pulls`,
    {
      method: "POST",
      body: JSON.stringify({
        title: args.prTitle || "Admin: update site copy",
        head: branch,
        base: baseBranch,
        body:
          args.prBody ||
          "Automated PR created from `/admin` one-click publish.",
      }),
    }
  );

  if (process.env.ADMIN_AUTO_MERGE === "true") {
    await githubRequest(
      `/repos/${owner}/${repo}/pulls/${pr.number}/merge`,
      {
        method: "PUT",
        body: JSON.stringify({
          merge_method: "squash",
        }),
      }
    );
  }

  return {
    branch,
    commitSha: csvResult.sha,
    prNumber: pr.number,
    prUrl: pr.html_url,
    applyReport,
  };
}
