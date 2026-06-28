import { auth } from "@/auth";

const STAFF_ROLES = new Set(["FOUNDER", "ADMINISTRATOR", "EDITOR"]);

export async function requireStaff() {
  const session = await auth();
  if (!session?.user || !STAFF_ROLES.has(session.user.role)) {
    throw new Error("Not authorized.");
  }
  return session.user;
}
