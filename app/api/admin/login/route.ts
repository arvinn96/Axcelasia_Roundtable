import { passwordMatches, createSessionToken, SESSION_COOKIE, SESSION_HOURS } from "../../../../lib/organiser-policy";
import { isSameOrigin, requestOrigin } from "../../../../lib/request-origin";

export const dynamic = "force-dynamic";

function redirect(location: string, cookie?: string) {
  const headers = new Headers({ Location: location, "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status: 303, headers });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return redirect("/admin?error=origin");
  const secret = process.env.ADMIN_SESSION_SECRET;
  const form = await request.formData().catch(() => null);
  const password = typeof form?.get("password") === "string" ? String(form!.get("password")).trim() : "";
  if (!secret || !passwordMatches(password, process.env.ADMIN_PASSWORD)) {
    await new Promise(resolve => setTimeout(resolve, 800)); // slow down password guessing
    return redirect("/admin?error=password");
  }
  const secure = requestOrigin(request).startsWith("https:") ? "; Secure" : "";
  return redirect("/admin", `${SESSION_COOKIE}=${createSessionToken(secret)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_HOURS * 3600}${secure}`);
}
