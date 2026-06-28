import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Supabase's transaction-mode pooler doesn't support prepared statements,
// which Prisma uses by default — concurrent queries on a pooled connection
// fail with "prepared statement does not exist". Force simple query mode
// regardless of what's configured in DATABASE_URL.
function poolerSafeUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return url;
  if (url.includes("pgbouncer=")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}pgbouncer=true`;
}

export const prisma =
  global.prisma ?? new PrismaClient({ datasourceUrl: poolerSafeUrl() });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
