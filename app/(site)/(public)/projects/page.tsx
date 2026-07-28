import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { ListingThumb } from "@/components/ui/listing-thumb";
import { getProjects, getVentures } from "@/lib/content";

export const dynamic = "force-dynamic";

type Listing = {
  id: string;
  href: string;
  title: string;
  slug: string;
  summary: string;
  image?: string | null;
  kind: "Venture" | "Project";
  sortAt: number;
};

export default async function ProjectsPage() {
  // Ventures are projects too — the difference is that one is a business and the
  // other is a piece of work — so both are listed here and tagged.
  const [projects, ventures] = await Promise.all([getProjects(), getVentures()]);

  const at = (d: Date | null, fallback: Date) => (d ?? fallback).getTime();

  const listings: Listing[] = [
    ...ventures.map((v) => ({
      id: `venture-${v.id}`,
      href: `/ventures/${v.slug}`,
      title: v.name,
      slug: v.slug,
      summary: v.summary,
      image: v.logoUrl,
      kind: "Venture" as const,
      sortAt: at(v.publishedAt, v.createdAt),
    })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      href: `/projects/${p.slug}`,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      image: null,
      kind: "Project" as const,
      sortAt: at(p.publishedAt, p.createdAt),
    })),
  ].sort((a, b) => b.sortAt - a.sortAt);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Work I've built or helped build — the businesses and the pieces of work inside them. What it was for, what it took, and how it turned out."
      />
      <Container className="pt-14 pb-24">
        {listings.length === 0 ? (
          <EmptyState
            title="No projects published yet."
            description="Projects appear here once they're written up."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => (
              <li key={item.id} className="flex">
                <LinkCard href={item.href} className="flex w-full flex-col p-4 sm:p-5">
                  <ListingThumb title={item.title} slug={item.slug} src={item.image} />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <span className="font-medium break-words">{item.title}</span>
                    <span className="font-meta text-muted border-muted shrink-0 rounded-full border px-2.5 py-1 text-[10px] uppercase">
                      {item.kind}
                    </span>
                  </div>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{item.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
