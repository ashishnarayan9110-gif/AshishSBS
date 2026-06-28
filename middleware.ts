import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

// Edge-safe: uses only the routing config (no Prisma/bcrypt), per Auth.js's
// recommended split for middleware. Wrapped in an explicit named function
// because Next's build-time analyzer doesn't recognize a destructured
// re-export as the required middleware export.
const { auth } = NextAuth(authConfig);

export function middleware(request: NextRequest, event: unknown) {
  // @ts-expect-error — Auth.js's middleware signature takes a second
  // NextFetchEvent-like arg that Next's NextRequest types don't model here.
  return auth(request, event);
}

export const config = {
  matcher: ["/admin/:path*"],
};
