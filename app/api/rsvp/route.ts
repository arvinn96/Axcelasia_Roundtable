import { saveRegistration } from "../../../db";
import { isSameOrigin } from "../../../lib/request-origin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return Response.json({ error: "Please submit from the RSVP page." }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 4096)
    return Response.json({ error: "Request is too large." }, { status: 413 });
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") return Response.json({ error: "Invalid form." }, { status: 400 });
    const data = body as Record<string, unknown>;
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const company = typeof data.company === "string" ? data.company.trim() : "";
    const rawPhone = typeof data.phone === "string" ? data.phone.trim() : "";
    const phone = rawPhone.replace(/[ ()-]/g, "");
    if (!name || name.length > 120 || !company || company.length > 160 || rawPhone.length > 30 || !/^\+?\d{7,15}$/.test(phone) || (data.spa !== "yes" && data.spa !== "no"))
      return Response.json({ error: "Please enter your name, company, a valid phone number and spa preference." }, { status: 400 });
    await saveRegistration({ name, company, phone, spa: data.spa });
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("RSVP could not be saved", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "We couldn’t save your RSVP. Please try again shortly." }, { status: 503 });
  }
}
