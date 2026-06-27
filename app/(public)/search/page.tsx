import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function searchContent(query: string) {
  if (!query) {
    return { ventures: [], projects: [], labNotes: [], principles: [], resources: [] };
  }

  const where = { contains: query, mode: "insensitive" as const };

  const [ventures, projects, labNotes, principles, resources] = await Promise.all([
    prisma.venture.findMany({
      where: { contentStatus: "PUBLISHED", OR: [{ name: where }, { summary: where }] },
      take: 10,
    }),
    prisma.project.findMany({
      where: { contentStatus: "PUBLISHED", OR: [{ title: where }, { summary: where }] },
      take: 10,
    }),
    prisma.labNote.findMany({
      where: { contentStatus: "PUBLISHED", title: where },
      take: 10,
    }),
    prisma.principle.findMany({
      where: { contentStatus: "PUBLISHED", OR: [{ title: where }, { statement: where }] },
      take: 10,
    }),
    prisma.resource.findMany({
      where: { contentStatus: "PUBLISHED", title: where },
      take: 10,
    }),
  ]);

  return { ventures, projects, labNotes, principles, resources };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchContent(q.trim());
  const totalResults = Object.values(results).reduce((sum, r) => sum + r.length, 0);

  return (
    <>
      <PageHeader title="Search" description="Search ventures, projects, lab notes, principles and resources." />
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        <form className="mb-10" action="/search">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search the platform…"
            className="border-border w-full rounded-md border px-4 py-3 text-sm"
          />
        </form>

        {!q ? (
          <EmptyState title="Start typing to search." />
        ) : totalResults === 0 ? (
          <EmptyState title={`No results for "${q}".`} description="Try a different term." />
        ) : (
          <div className="space-y-8">
            {results.ventures.length > 0 && (
              <ResultGroup label="Ventures" items={results.ventures.map((v) => ({ href: `/ventures/${v.slug}`, label: v.name }))} />
            )}
            {results.projects.length > 0 && (
              <ResultGroup label="Projects" items={results.projects.map((p) => ({ href: `/projects/${p.slug}`, label: p.title }))} />
            )}
            {results.labNotes.length > 0 && (
              <ResultGroup label="Lab Notes" items={results.labNotes.map((n) => ({ href: `/lab/${n.slug}`, label: n.title }))} />
            )}
            {results.principles.length > 0 && (
              <ResultGroup label="Principles" items={results.principles.map((p) => ({ href: `/principles/${p.slug}`, label: p.title }))} />
            )}
            {results.resources.length > 0 && (
              <ResultGroup label="Resources" items={results.resources.map((r) => ({ href: `/resources/${r.slug}`, label: r.title }))} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

function ResultGroup({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <section>
      <h2 className="text-muted text-xs font-medium tracking-wide uppercase">{label}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="underline">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
