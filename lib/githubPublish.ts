const GITHUB_API = "https://api.github.com";

interface PublishResult {
  branch: string;
  commitSha: string;
  prNumber: number;
  prUrl: string;
}

interface GitHubRefResponse {
  object: {
    sha: string;
  };
}

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

export async function publishCopySheetToBranch(args: {
  filePath: string;
  fileContent: string;
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

  let existingSha: string | undefined;
  try {
    const existing = await githubRequest<{ sha: string }>(
      `/repos/${owner}/${repo}/contents/${args.filePath}?ref=${branch}`
    );
    existingSha = existing.sha;
  } catch {
    existingSha = undefined;
  }

  const commitMessage = args.commitMessage || "Update site copy via admin";
  const updatedFile = await githubRequest<{ content: { sha: string } }>(
    `/repos/${owner}/${repo}/contents/${args.filePath}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(args.fileContent, "utf8").toString("base64"),
        branch,
        sha: existingSha,
      }),
    }
  );

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
    commitSha: updatedFile.content.sha,
    prNumber: pr.number,
    prUrl: pr.html_url,
  };
}
