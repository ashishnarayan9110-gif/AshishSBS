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
    include: { timelineEvents: true, lessons: true, projects: true, externalLinks: true },
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
    include: { lessons: true, venture: true },
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
