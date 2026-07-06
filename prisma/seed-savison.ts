import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "savison-life" },
    update: {
      title: "Savison Life",
      summary:
        "India's compliance-gated B2B marketplace for third-party pharmaceutical manufacturing — founded, branded, and built from zero. Live at savisonlife.com.",
      featured: true,
      contentStatus: "PUBLISHED",
    },
    create: {
      slug: "savison-life",
      title: "Savison Life",
      summary:
        "India's compliance-gated B2B marketplace for third-party pharmaceutical manufacturing — founded, branded, and built from zero. Live at savisonlife.com.",
      background:
        "Small and mid-size pharma brands in India have no clean way to find a verified, drug-licence-checked third-party manufacturer. Everything is either a generic directory with no compliance layer, or a personal relationship.",
      process:
        "Wrote the full brand system (League Spartan wordmark, Midnight/Neptune/Isotonic palette, guideline volume), then built a four-portal platform — buyer marketplace, manufacturer console, admin ops, onboarding gate — on one Next.js codebase: 214-product CDSCO catalog, live GSTIN verification, packaging wizard with compliance checklist, Deal Room negotiation, Razorpay payments, nine-stage order pipeline.",
      outcome:
        "Live across all four portals at savisonlife.com. Pre-launch operationally; every gap — disintermediation, thin moat, GST scope — documented honestly in the founder bible.",
      industry: "Pharmaceutical Marketplace",
      technology:
        "Next.js 14 · TypeScript · Prisma 6 · Supabase Postgres · NextAuth · Razorpay · SendGrid · Vercel",
      year: 2026,
      featured: true,
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log("Savison project seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
