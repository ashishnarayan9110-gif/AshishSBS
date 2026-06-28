import type { NextAuthConfig } from "next-auth";

// Routing/authorization rules and token<->session mapping only — no
// providers here, so this config can be imported by middleware (Edge
// runtime) without pulling in bcryptjs or Prisma, which don't run there.
// The jwt/session callbacks below only copy fields already present on the
// token; the actual database lookup happens in the Credentials provider's
// authorize() in auth.ts, which is node-runtime only.
export const authConfig: NextAuthConfig = {
  // Vercel terminates TLS and proxies requests, so the Host header Auth.js
  // sees can legitimately differ from a fixed AUTH_URL. Trusting the host
  // is Auth.js's documented approach for platforms like Vercel.
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (!isOnAdmin || isLoginPage) return true;

      const role = auth?.user?.role;
      const isStaff = role === "FOUNDER" || role === "ADMINISTRATOR" || role === "EDITOR";

      return isStaff;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") session.user.id = token.id;
      if (typeof token.role === "string") session.user.role = token.role;
      return session;
    },
  },
  providers: [],
};
