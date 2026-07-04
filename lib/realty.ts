import { prisma } from "@/lib/prisma";

export type RealtyListingFull = Awaited<ReturnType<typeof getListing>>;

export async function getPublishedListings() {
  return prisma.realtyListing.findMany({
    where: { published: true, status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getListing(slug: string) {
  return prisma.realtyListing.findUnique({ where: { slug, published: true } });
}
