import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "rikencare-lifesciences" },
    update: {},
    create: {
      slug: "rikencare-lifesciences",
      title: "Rikencare Lifesciences",
      summary:
        "Brand identity design and website engineering for a WHO-GMP compliant, ISO 9001:2015 certified third-party pharmaceutical manufacturer in Himachal Pradesh.",
      background:
        "Contract pharmaceutical manufacturer targeting procurement and quality leads at healthcare brands. The brand needed to communicate documented, repeatable compliance — not price.",
      process:
        "Designed the full brand identity (logo, colour system, typography, motion spec, brand voice), then built a hand-coded single-page site with a searchable catalogue of 197 approved compositions parsed from a government Word document, a packaging configurator, B2B enquiry funnel, and a client-side branded PDF generator.",
      outcome:
        "A complete brand system and live front-end prototype. Framework-free, fully responsive, WCAG AAA on primary colour pairings. Enquiry flow live via third-party form service.",
      industry: "Pharmaceutical Manufacturing",
      technology:
        "Vanilla HTML/CSS/JS · CSS Custom Properties · jsPDF · IntersectionObserver · Sifonn Pro · Jost · Spline Sans Mono",
      year: 2025,
      featured: true,
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log("Rikencare project seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
