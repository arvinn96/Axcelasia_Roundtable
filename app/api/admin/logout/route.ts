import { SESSION_COOKIE } from "../../../../lib/organiser-policy";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(null, { status: 303, headers: { Location: "/admin", "Cache-Control": "no-store", "Set-Cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` } });
}
