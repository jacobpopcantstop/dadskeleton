import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { CopyRow, readCopyRows, writeCopyRows } from "@/lib/copySheet";

export const runtime = "nodejs";

async function ensureAuth() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  return null;
}

export async function GET() {
  const auth = await ensureAuth();
  if (auth) return auth;

  const rows = await readCopyRows();
  return NextResponse.json({ ok: true, rows });
}

export async function POST(req: Request) {
  const auth = await ensureAuth();
  if (auth) return auth;

  const body = (await req.json().catch(() => ({}))) as {
    rows?: CopyRow[];
  };
  if (!Array.isArray(body.rows)) {
    return NextResponse.json(
      { ok: false, error: "rows is required" },
      { status: 400 }
    );
  }

  await writeCopyRows(body.rows);
  return NextResponse.json({ ok: true, count: body.rows.length });
}
