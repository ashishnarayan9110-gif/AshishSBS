import { prisma } from "@/lib/prisma";

const PUBLISHED = "PUBLISHED" as const;

export function getVentures() {
  return prisma.venture.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { publishedAt: "desc" },
  });
}

export function getVentureBySlug(slug: string) {
  return prisma.venture.findFirst({
    where: { slug, contentStatus: PUBLISHED },
    include: {
      timelineEvents: true,
      lessons: true,
      projects: true,
      externalLinks: true,
      crew: { where: { person: { contentStatus: PUBLISHED } }, include: { person: true } },
    },
  });
}

export function getProjects() {
  return prisma.project.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { publishedAt: "desc" },
  });
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, contentStatus: PUBLISHED },
    include: {
      lessons: true,
      venture: true,
      crew: { where: { person: { contentStatus: PUBLISHED } }, include: { person: true } },
    },
  });
}

export function getLabNotes() {
  return prisma.labNote.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: [{ pinned: "desc" }, { publishedAt: "desc" }],
  });
}

export function getLabNoteBySlug(slug: string) {
  return prisma.labNote.findFirst({ where: { slug, contentStatus: PUBLISHED } });
}

export function getPrinciples() {
  return prisma.principle.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { createdAt: "asc" },
  });
}

export function getPrincipleBySlug(slug: string) {
  return prisma.principle.findFirst({ where: { slug, contentStatus: PUBLISHED } });
}

export function getResources() {
  return prisma.resource.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { publishedAt: "desc" },
  });
}

export function getResourceBySlug(slug: string) {
  return prisma.resource.findFirst({ where: { slug, contentStatus: PUBLISHED } });
}

export function getServices() {
  return prisma.service.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { createdAt: "asc" },
  });
}

export function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({ where: { slug, contentStatus: PUBLISHED } });
}

export function getCareerEntries() {
  return prisma.careerEntry.findMany({ orderBy: { startDate: "desc" } });
}

export function getMonthlyReviews() {
  return prisma.monthlyReview.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { month: "desc" },
  });
}

export function getMonthlyReviewBySlug(slug: string) {
  return prisma.monthlyReview.findFirst({ where: { slug, contentStatus: PUBLISHED } });
}

export function getInsights() {
  return prisma.insight.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: { publishedAt: "desc" },
  });
}

export function getInsightBySlug(slug: string) {
  return prisma.insight.findFirst({ where: { slug, contentStatus: PUBLISHED } });
}

// --- Crew -----------------------------------------------------------------
// The people behind the work. Featured first, then alphabetical — the order is
// stable so the roster doesn't reshuffle between visits.

export function getCrew() {
  return prisma.person.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    include: {
      projects: {
        where: { project: { contentStatus: PUBLISHED } },
        include: { project: { select: { slug: true, title: true } } },
      },
      ventures: {
        where: { venture: { contentStatus: PUBLISHED } },
        include: { venture: { select: { slug: true, name: true } } },
      },
    },
  });
}

export function getPersonBySlug(slug: string) {
  return prisma.person.findFirst({
    where: { slug, contentStatus: PUBLISHED },
    include: {
      projects: {
        where: { project: { contentStatus: PUBLISHED } },
        include: { project: { select: { slug: true, title: true } } },
      },
      ventures: {
        where: { venture: { contentStatus: PUBLISHED } },
        include: { venture: { select: { slug: true, name: true } } },
      },
    },
  });
}

// --- Certifications -------------------------------------------------------
// Newest first, undated last — an entry without a date is still worth showing.

export function getCertifications() {
  return prisma.certification.findMany({
    where: { contentStatus: PUBLISHED },
    orderBy: [{ issuedAt: "desc" }, { title: "asc" }],
  });
}
