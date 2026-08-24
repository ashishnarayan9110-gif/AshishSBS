import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { ListingThumb } from "@/components/ui/listing-thumb";
import { ProjectOutcomeBadge, disciplineLabel } from "@/components/ui/badge";
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
  discipline: string;
  outcomeStatus: string | null;
  sortAt: number;
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "DIGITAL", label: "Digital" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "TEACHING", label: "Teaching" },
  { value: "BUSINESS", label: "Business" },
  { value: "PERSONAL", label: "Personal" },
  { value: "OTHER", label: "Other" },
] as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ discipline?: string }>;
}) {
  // Ventures are projects too — the difference is that one is a business and the
  // other is a piece of work — so both are listed here and tagged.
  const [{ discipline }, projects, ventures] = await Promise.all([
    searchParams,
    getProjects(),
    getVentures(),
  ]);

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
      // A venture is a business, so it answers the Business filter.
      discipline: "BUSINESS",
      outcomeStatus: null,
      sortAt: at(v.publishedAt, v.createdAt),
    })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      href: `/projects/${p.slug}`,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      image: p.imageUrl,
      kind: "Project" as const,
      discipline: p.discipline,
      outcomeStatus: p.outcomeStatus,
      sortAt: at(p.publishedAt, p.createdAt),
    })),
  ].sort((a, b) => b.sortAt - a.sortAt);

  const active =
    discipline && FILTERS.some((f) => f.value === discipline) ? discipline : "all";

  const visible =
    active === "all" ? listings : listings.filter((l) => l.discipline === active);

  // Only offer a filter that would actually return something.
  const available = FILTERS.filter(
    (f) => f.value === "all" || listings.some((l) => l.discipline === f.value),
  );

  return (
    <>
      <PageHeader
        title="Projects"
        description="Work I've built or helped build — businesses, furniture, teaching, and the personal things in between. What it was for, what it took, and how it turned out, including the ones that didn't."
      />
      <Container className="pt-14 pb-24">
        {available.length > 2 ? (
          <nav aria-label="Filter by discipline" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {available.map((filter) => {
                const isActive = filter.value === active;
                return (
                  <li key={filter.value}>
                    <Link
                      href={
                        filter.value === "all" ? "/projects" : `/projects?discipline=${filter.value}`
                      }
                      aria-current={isActive ? "page" : undefined}
                      className={`font-meta inline-block rounded-full border px-3.5 py-1.5 text-[11px] uppercase transition-colors ${
                        isActive
                          ? "border-accent text-accent"
                          : "border-border text-muted hover:text-foreground"
                      }`}
                    >
                      {filter.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        {visible.length === 0 ? (
          <EmptyState
            title="Nothing here yet."
            description="Projects appear here once they're written up."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <li key={item.id} className="flex">
                <LinkCard href={item.href} className="flex w-full flex-col p-4 sm:p-5">
                  <ListingThumb title={item.title} slug={item.slug} src={item.image} />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <span className="font-medium break-words">{item.title}</span>
                    <span className="font-meta text-muted border-muted shrink-0 rounded-full border px-2.5 py-1 text-[10px] uppercase">
                      {item.kind === "Venture" ? "Venture" : disciplineLabel(item.discipline)}
                    </span>
                  </div>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{item.summary}</p>
                  {item.outcomeStatus ? (
                    <div className="mt-4">
                      <ProjectOutcomeBadge outcome={item.outcomeStatus} />
                    </div>
                  ) : null}
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
