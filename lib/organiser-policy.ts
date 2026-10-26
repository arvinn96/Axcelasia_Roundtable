import { createHmac, createHash, timingSafeEqual } from "node:crypto";

// Organiser access on Railway: a shared ADMIN_PASSWORD (Railway variable) unlocks a signed,
// HTTP-only session cookie. ADMIN_SESSION_SECRET signs the cookie; rotating either value
// signs every organiser out.
export const SESSION_COOKIE = "axc_organiser";
export const SESSION_HOURS = 12;

function sha256(value: string) { return createHash("sha256").update(value).digest(); }
function sign(payload: string, secret: string) { return createHmac("sha256", secret).update(payload).digest("base64url"); }

export function passwordMatches(candidate: string, expected: string | undefined): boolean {
  if (!expected || !candidate) return false;
  return timingSafeEqual(sha256(candidate), sha256(expected));
}

export function createSessionToken(secret: string, now = Date.now()): string {
  const expires = String(now + SESSION_HOURS * 3600_000);
  return `${expires}.${sign(expires, secret)}`;
}

export function isValidSessionToken(token: string | undefined, secret: string | undefined, now = Date.now()): boolean {
  if (!token || !secret) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires) || Number(expires) < now) return false;
  const expected = Buffer.from(sign(expires, secret)), actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
