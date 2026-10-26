// Behind Railway's proxy the app sees an internal host; use the forwarded public host instead.
export function requestOrigin(request: Request): string {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "");
  return host ? `${proto}://${host}` : new URL(request.url).origin;
}

export function isSameOrigin(request: Request): boolean {
  return request.headers.get("origin") === requestOrigin(request);
}
