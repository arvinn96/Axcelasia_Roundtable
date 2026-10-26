import { cookies } from "next/headers";
import { SESSION_COOKIE, isValidSessionToken } from "./organiser-policy";

export function organiserConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export async function organiserAccess() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return { configured: organiserConfigured(), authorised: isValidSessionToken(token, process.env.ADMIN_SESSION_SECRET) };
}

export async function requireOrganiserApi() {
  const { authorised } = await organiserAccess();
  if (!authorised) return Response.json({ error: "Your organiser session has expired. Please sign in again." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  return null;
}
