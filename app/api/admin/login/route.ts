import { NextResponse } from "next/server";
import { setAdminSession, verifyPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const password = body.password || "";

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Invalid password" },
      { status: 401 }
    );
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
