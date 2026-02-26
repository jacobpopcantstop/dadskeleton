import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_auth";

export function isPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return true;
  return password === configured;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!isPasswordConfigured()) return true;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "1";
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
