import { NextResponse } from "next/server";
import {
  isAdminAuthenticated,
  isPasswordConfigured,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    ok: true,
    authenticated,
    passwordRequired: isPasswordConfigured(),
  });
}
