"use client";

import { useEffect, useMemo, useState } from "react";

type CopyRow = {
  id: string;
  page: string;
  section: string;
  field: string;
  current_text: string;
  new_text: string;
  notes: string;
};

type PublishResult = {
  branch: string;
  prNumber: number;
  prUrl: string;
  commitSha: string;
  applyReport?: {
    attempted: number;
    applied: number;
    skipped: number;
  };
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(true);
  const [rows, setRows] = useState<CopyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [pageFilter, setPageFilter] = useState("all");
  const [lastPublish, setLastPublish] = useState<PublishResult | null>(null);

  const pageOptions = useMemo(() => {
    const values = new Set(rows.map((r) => r.page));
    return ["all", ...Array.from(values).sort()];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (pageFilter !== "all" && r.page !== pageFilter) return false;
      if (!q) return true;
      const hay = [
        r.id,
        r.page,
        r.section,
        r.field,
        r.current_text,
        r.new_text,
        r.notes,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, pageFilter, search]);

  const changedCount = useMemo(
    () => rows.filter((r) => r.new_text.trim() !== "").length,
    [rows]
  );

  async function loadRows() {
    setLoading(true);
    setStatus("");
    const res = await fetch("/api/admin/copy");
    if (res.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setRows(data.rows || []);
    setLoading(false);
  }

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/admin/session");
      const data = await res.json();
      setAuthenticated(Boolean(data.authenticated));
      setPasswordRequired(Boolean(data.passwordRequired));
      if (data.authenticated) {
        await loadRows();
      } else {
        setLoading(false);
      }
    };
    void run();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setStatus("Login failed. Check password.");
      return;
    }
    setAuthenticated(true);
    setPassword("");
    await loadRows();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setRows([]);
    setStatus("Logged out.");
  }

  function updateRowValue(index: number, value: string) {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], new_text: value };
      return next;
    });
  }

  async function saveDraft() {
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/admin/copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || "Failed to save draft.");
      setSaving(false);
      return;
    }
    setStatus(`Draft saved (${data.count} rows).`);
    setSaving(false);
  }

  async function publishNow() {
    setPublishing(true);
    setStatus("");
    setLastPublish(null);
    const res = await fetch("/api/admin/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rows,
        commitMessage: "Admin: update site copywriting sheet",
        prTitle: "Admin copy updates",
        prBody:
          "Automated one-click publish from `/admin` with updated copywriting rows.",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || "Failed to publish.");
      setPublishing(false);
      return;
    }
    setLastPublish(data as PublishResult);
    setStatus("Published: branch + commit + PR created.");
    setPublishing(false);
  }

  if (!authenticated && passwordRequired) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
        <p className="text-foreground/70 mb-6">
          Enter admin password to edit copy and publish to GitHub.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-foreground/20 bg-background px-3 py-2"
            placeholder="Admin password"
          />
          <button
            type="submit"
            className="rounded bg-pink px-4 py-2 font-semibold text-white"
          >
            Login
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-red-500">{status}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Admin Copy Console</h1>
          <p className="text-foreground/70 mt-2">
            Edit copy, save drafts, and one-click publish to a GitHub branch + PR.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded border border-foreground/20 px-3 py-2 text-sm"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Stat label="Total Rows" value={String(rows.length)} />
        <Stat label="Rows Edited" value={String(changedCount)} />
        <Stat label="Visible Rows" value={String(filteredRows.length)} />
        <Stat
          label="Auth Mode"
          value={passwordRequired ? "Password" : "Open (No Password)"}
        />
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search id/page/text..."
          className="rounded border border-foreground/20 bg-background px-3 py-2"
        />
        <select
          value={pageFilter}
          onChange={(e) => setPageFilter(e.target.value)}
          className="rounded border border-foreground/20 bg-background px-3 py-2"
        >
          {pageOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={saveDraft}
            disabled={saving || publishing || loading}
            className="rounded border border-foreground/20 px-4 py-2 text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={publishNow}
            disabled={saving || publishing || loading}
            className="rounded bg-yellow px-4 py-2 text-sm font-bold text-black disabled:opacity-50"
          >
            {publishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {status && (
        <p className="mb-4 rounded border border-foreground/20 bg-foreground/5 px-3 py-2 text-sm">
          {status}
        </p>
      )}

      {lastPublish && (
        <div className="mb-6 rounded border border-foreground/20 bg-foreground/5 p-4 text-sm">
          <p>
            <strong>Branch:</strong> {lastPublish.branch}
          </p>
          <p>
            <strong>Commit:</strong> {lastPublish.commitSha}
          </p>
          <p>
            <strong>PR:</strong>{" "}
            <a
              href={lastPublish.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink underline"
            >
              #{lastPublish.prNumber}
            </a>
          </p>
          {lastPublish.applyReport && (
            <p>
              <strong>Auto-apply:</strong>{" "}
              {lastPublish.applyReport.applied} applied /{" "}
              {lastPublish.applyReport.skipped} skipped (
              {lastPublish.applyReport.attempted} attempted)
            </p>
          )}
        </div>
      )}

      {loading ? (
        <p>Loading copy rows...</p>
      ) : (
        <div className="overflow-x-auto rounded border border-foreground/20">
          <table className="min-w-[1200px] w-full text-sm">
            <thead className="bg-foreground/5 text-left">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Page</th>
                <th className="p-2">Section</th>
                <th className="p-2">Field</th>
                <th className="p-2">Current Text</th>
                <th className="p-2">New Text (editable)</th>
                <th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const absoluteIndex = rows.findIndex((r) => r.id === row.id);
                return (
                  <tr key={row.id} className="border-t border-foreground/10 align-top">
                    <td className="p-2 font-mono">{row.id}</td>
                    <td className="p-2">{row.page}</td>
                    <td className="p-2">{row.section}</td>
                    <td className="p-2">{row.field}</td>
                    <td className="p-2 whitespace-pre-wrap">{row.current_text}</td>
                    <td className="p-2">
                      <textarea
                        value={row.new_text}
                        onChange={(e) =>
                          updateRowValue(absoluteIndex, e.target.value)
                        }
                        rows={3}
                        className="w-full rounded border border-foreground/20 bg-background px-2 py-1"
                      />
                    </td>
                    <td className="p-2 text-foreground/60">{row.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-foreground/20 bg-foreground/5 p-3">
      <p className="text-xs uppercase tracking-wide text-foreground/60">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
