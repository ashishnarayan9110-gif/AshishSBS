import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Avoid querying the database during the build (Vercel's build environment
// cannot reach Supabase's direct connection host); generate at request time.
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashish.sbs";

const STATIC_ROUTES = [
  "",
  "/about",
  "/ventures",
  "/projects",
  "/lab",
  "/principles",
  "/resources",
  "/services",
  "/career",
  "/monthly",
  "/search",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ventures, projects, labNotes, principles, resources, services, reviews] =
    await Promise.all([
      prisma.venture.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.project.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.labNote.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.principle.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.resource.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.monthlyReview.findMany({
        where: { contentStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
    ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const dynamicEntries = [
    ...ventures.map((v) => ({
      url: `${SITE_URL}/ventures/${v.slug}`,
      lastModified: v.updatedAt,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.updatedAt,
    })),
    ...labNotes.map((n) => ({
      url: `${SITE_URL}/lab/${n.slug}`,
      lastModified: n.updatedAt,
    })),
    ...principles.map((p) => ({
      url: `${SITE_URL}/principles/${p.slug}`,
      lastModified: p.updatedAt,
    })),
    ...resources.map((r) => ({
      url: `${SITE_URL}/resources/${r.slug}`,
      lastModified: r.updatedAt,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: s.updatedAt,
    })),
    ...reviews.map((r) => ({
      url: `${SITE_URL}/monthly/${r.slug}`,
      lastModified: r.updatedAt,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
