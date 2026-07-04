import NextAuth from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

// Edge-safe: uses only the routing config (no Prisma/bcrypt), per Auth.js's
// recommended split for middleware. Wrapped in an explicit named function
// because Next's build-time analyzer doesn't recognize a destructured
// re-export as the required middleware export.
const { auth } = NextAuth(authConfig);

export function middleware(request: NextRequest, event: unknown) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  // Skip static assets and Next.js internals regardless of host
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Subdomain routing — rewrites before auth so realty/smallbiz pages
  // never accidentally go through the admin authorization check.
  if (hostname.startsWith("realty.")) {
    const url = request.nextUrl.clone();
    url.pathname = `/realty${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  if (
    hostname.startsWith("smallbusinessforsale.") ||
    hostname.startsWith("smallbiz.")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/smallbiz${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Main domain — auth middleware protects /admin routes
  // @ts-expect-error — Auth.js's middleware signature takes a second
  // NextFetchEvent-like arg that Next's NextRequest types don't model here.
  return auth(request, event);
}

export const config = {
  // Match everything except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
