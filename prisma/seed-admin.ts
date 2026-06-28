/**
 * One-off script to create (or update the password of) the founder admin
 * account. Run with: pnpm exec tsx --env-file=.env prisma/seed-admin.ts
 * Reads ADMIN_EMAIL / ADMIN_NAME / ADMIN_PASSWORD from the environment so
 * the password never has to be typed into source code or chat.
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const name = process.env.ADMIN_NAME ?? "Ashish";
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD env vars before running this script.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "FOUNDER" },
    create: { email, name, passwordHash, role: "FOUNDER" },
  });

  console.log(`Founder account ready: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
