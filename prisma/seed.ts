/**
 * Seeds the platform with real content sourced from the Personal Operating
 * System manifesto and Volume I PRD — not placeholder/lorem content.
 * Re-run is safe: every model uses upsert keyed on its unique slug.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------------------------------------------------------------------
  // Ventures (Personal OS Part III — Layer 4 — Companies)
  // ---------------------------------------------------------------------

  await prisma.venture.upsert({
    where: { slug: "savison-life" },
    update: {},
    create: {
      slug: "savison-life",
      name: "Savison Life",
      status: "ACTIVE",
      industry: "Pharmaceutical Marketplace",
      summary:
        "A compliance-first pharmaceutical marketplace connecting manufacturers and buyers.",
      problem:
        "Traditional pharmaceutical brokerage depended heavily on a limited number of manufacturers. Regulatory changes reduced supplier availability and exposed weaknesses in the existing relationship-based model.",
      solution:
        "Transform Savison Life into a technology-enabled marketplace connecting compliant manufacturers and buyers, with NLEM drug catalog enforcement, deal-room price negotiation, SLA automation, and transparent payouts.",
      currentStage:
        "Active — billing, deal rooms, and approved-product enforcement operational.",
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
      featured: true,
      lessons: {
        create: [
          { text: "Never build a business dependent on a small number of suppliers." },
        ],
      },
    },
  });

  await prisma.venture.upsert({
    where: { slug: "getpharm" },
    update: {},
    create: {
      slug: "getpharm",
      name: "GetPharm",
      status: "ACTIVE",
      industry: "Pharmaceutical Marketplace",
      summary: "Public-facing marketplace brand built on Savison Life's infrastructure.",
      currentStage: "Active.",
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  await prisma.venture.upsert({
    where: { slug: "betta-beaut" },
    update: { featured: true },
    create: {
      slug: "betta-beaut",
      name: "Betta Beaut",
      status: "ACTIVE",
      industry: "Salon Technology",
      summary: "Technology infrastructure for salons.",
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
      featured: true,
    },
  });

  await prisma.venture.upsert({
    where: { slug: "nirmal-kaya" },
    update: { featured: true },
    create: {
      slug: "nirmal-kaya",
      name: "Nirmal Kaya",
      status: "ACTIVE",
      industry: "Wellness",
      summary: "A standalone wellness management venture.",
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
      featured: true,
    },
  });

  await prisma.venture.upsert({
    where: { slug: "indizilla" },
    update: {},
    create: {
      slug: "indizilla",
      name: "IndiZilla",
      status: "RESEARCH",
      industry: "Consumer Platform",
      summary: "Future consumer platform — currently in research.",
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  // ---------------------------------------------------------------------
  // Projects (Volume I Module 04) — Savison Life is the flagship project
  // ---------------------------------------------------------------------

  const savisonLifeVenture = await prisma.venture.findUnique({
    where: { slug: "savison-life" },
  });

  await prisma.project.upsert({
    where: { slug: "savison-life" },
    update: { featured: true, ventureId: savisonLifeVenture?.id ?? null },
    create: {
      slug: "savison-life",
      title: "Savison Life",
      summary:
        "India's verified B2B pharmaceutical manufacturing marketplace connecting buyers with drug-license verified manufacturers.",
      background:
        "Pharmaceutical brokerage traditionally runs on relationships and trust built over years, with no systematic way to verify a manufacturer's licensing or compliance status before a deal.",
      process:
        "Built a marketplace enforcing drug-license verification, an NLEM-aligned product catalog, deal-room price negotiation, SLA automation, and transparent manufacturer payouts.",
      outcome:
        "Operational marketplace with billing, deal rooms, and approved-product enforcement live — verified manufacturers and buyers transacting without relying on informal trust networks.",
      industry: "Pharmaceutical Marketplace",
      featured: true,
      contentStatus: "PUBLISHED",
      publishedAt: new Date(),
      ventureId: savisonLifeVenture?.id ?? null,
    },
  });

  // ---------------------------------------------------------------------
  // Principles (Personal OS Part I §5 + Part II "Values")
  // ---------------------------------------------------------------------

  const principles: {
    slug: string;
    title: string;
    statement: string;
    explanation: string;
  }[] = [
    {
      slug: "simplicity",
      title: "Simplicity",
      statement: "If something can be removed without reducing value, remove it.",
      explanation: "Complexity should be earned, not defaulted to.",
    },
    {
      slug: "trust",
      title: "Trust",
      statement: "Trust is not a marketing exercise. It is a product feature.",
      explanation:
        "Transparency, honesty and reliability should always be more important than growth.",
    },
    {
      slug: "systems-before-scale",
      title: "Systems Before Scale",
      statement: "Never scale a broken process. Design the system first.",
      explanation: "Growth comes later, after the underlying system is sound.",
    },
    {
      slug: "technology-is-a-tool",
      title: "Technology Is a Tool",
      statement: "Technology should disappear into the background.",
      explanation: "Users should remember the experience, not the software.",
    },
    {
      slug: "human-centred",
      title: "Human-Centred",
      statement: "People are not interruptions. They are the reason the system exists.",
      explanation:
        "Whenever automation reduces empathy, the automation should be reconsidered.",
    },
    {
      slug: "build-in-public",
      title: "Build in Public",
      statement: "Finished products teach. Finished journeys don't.",
      explanation:
        "Documenting progress creates accountability, attracts collaborators and preserves institutional memory.",
    },
    {
      slug: "continuous-learning",
      title: "Continuous Learning",
      statement: "Every project leaves behind reusable knowledge.",
      explanation: "No project should fail without teaching something valuable.",
    },
    {
      slug: "long-term-thinking",
      title: "Long-Term Thinking",
      statement:
        "Every decision should optimize for the next decade rather than the next quarter.",
      explanation: "Quick wins are welcome. Short-term thinking is not.",
    },
  ];

  for (const principle of principles) {
    await prisma.principle.upsert({
      where: { slug: principle.slug },
      update: {},
      create: { ...principle, contentStatus: "PUBLISHED", publishedAt: new Date() },
    });
  }

  // ---------------------------------------------------------------------
  // Services (Personal OS Part VIII — Layer 1 — Time)
  // ---------------------------------------------------------------------

  const services: {
    slug: string;
    name: string;
    problem: string;
    idealClient: string;
    approach: string;
  }[] = [
    {
      slug: "systems-design",
      name: "Systems Design",
      problem: "Operations have grown organically and no longer scale cleanly.",
      idealClient: "Founders and operators who need clarity before more software.",
      approach:
        "Map the current process, find the friction, design the system before recommending any tooling.",
    },
    {
      slug: "business-audit",
      name: "Business Audit",
      problem: "Unclear where time, trust, or money is leaking in the business.",
      idealClient: "SME owners considering digital transformation.",
      approach:
        "A structured review of operations, technology, and trust gaps with a prioritized action plan.",
    },
    {
      slug: "ai-readiness",
      name: "AI Readiness",
      problem: "Uncertainty about where AI creates real value versus novelty.",
      idealClient: "Teams evaluating AI adoption without a clear use case yet.",
      approach:
        "Identify measurable use cases, avoid AI-for-its-own-sake, and treat AI as infrastructure.",
    },
    {
      slug: "marketplace-strategy",
      name: "Marketplace Strategy",
      problem:
        "Building trust between strangers in a two-sided market is hard to get right.",
      idealClient: "Founders building or pivoting toward a marketplace model.",
      approach:
        "Design incentives and trust mechanisms first; reduce transactional friction second.",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, contentStatus: "PUBLISHED", publishedAt: new Date() },
    });
  }

  // ---------------------------------------------------------------------
  // Career Archive (Personal OS Appendix C)
  // ---------------------------------------------------------------------

  const careerEntries: {
    project: string;
    organisation: string;
    role: string;
    overview: string;
  }[] = [
    {
      project: "Savison Life",
      organisation: "Savison Life",
      role: "Founder",
      overview:
        "Built and operate a compliance-first pharmaceutical marketplace from brokerage origins.",
    },
    {
      project: "GetPharm",
      organisation: "Savison Life",
      role: "Founder",
      overview: "Public-facing marketplace brand built on Savison Life infrastructure.",
    },
    {
      project: "Betta Beaut",
      organisation: "Betta Beaut",
      role: "Founder",
      overview: "Designed technology infrastructure for salon operations.",
    },
    {
      project: "Nirmal Kaya",
      organisation: "Nirmal Kaya",
      role: "Founder",
      overview: "Built a standalone wellness management venture.",
    },
    {
      project: "Academy of Retail Excellence",
      organisation: "Academy of Retail Excellence",
      role: "Contributor",
      overview: "Public career archive entry — details to be expanded.",
    },
    {
      project: "YC Submission",
      organisation: "Y Combinator",
      role: "Applicant",
      overview: "Submitted an application documenting venture thinking at the time.",
    },
    {
      project: "Maha Kumbh Logo Competition",
      organisation: "Maha Kumbh",
      role: "Participant",
      overview: "Entered a public design competition.",
    },
  ];

  for (const entry of careerEntries) {
    const existing = await prisma.careerEntry.findFirst({
      where: { project: entry.project, organisation: entry.organisation },
    });
    if (!existing) {
      await prisma.careerEntry.create({
        data: { ...entry, startDate: new Date("2020-01-01") },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
