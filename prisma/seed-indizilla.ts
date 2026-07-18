import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "indizilla" },
    update: {
      title: "Indizilla",
      summary:
        "The client operations platform behind a marketing agency — orders, jobs, billing, credits, and referrals, running on one Postgres database. Live at indizilla.com.",
      featured: true,
      contentStatus: "PUBLISHED",
    },
    create: {
      slug: "indizilla",
      title: "Indizilla",
      summary:
        "The client operations platform behind a marketing agency — orders, jobs, billing, credits, and referrals, running on one Postgres database. Live at indizilla.com.",
      background:
        "A marketing agency needed more than a homepage: a place for clients to order work à la carte, have it become a tracked job with a due date, get an invoice automatically, and earn referral credit — without a spreadsheet quietly going stale.",
      process:
        "Built a static client-facing frontend against a single Supabase Postgres database. Writes go through RLS policies and security-definer functions (place_order, redeem_referral, admin_adjust_credits) — a client's browser never writes a job or invoice table directly. Ordering triggers server-side job and invoice creation; coupons and credits are re-validated in Postgres, never trusted from the client. Payments via Razorpay; auth via Supabase's Google OAuth.",
      outcome:
        "Live at indizilla.com. Razorpay signature verification via a Supabase Edge Function is a known, unshipped gap — payment records are currently unverified references, documented rather than hidden.",
      industry: "Marketing Agency — Client Operations",
      technology: "Supabase (Postgres, Auth, RLS) · Razorpay · Vercel",
      year: 2026,
      featured: true,
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log("Indizilla project seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
