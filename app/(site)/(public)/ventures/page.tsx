import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { VentureStatusBadge } from "@/components/ui/badge";
import { getVentures } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function VenturesPage() {
  const ventures = await getVentures();

  return (
    <>
      <PageHeader
        title="Ventures"
        description="Businesses documented from problem to current status — including the ones that paused or shut down."
      />
      <Container className="pb-24">
        {ventures.length === 0 ? (
          <EmptyState
            title="No ventures published yet."
            description="Ventures appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {ventures.map((venture) => (
              <li key={venture.id}>
                <LinkCard href={`/ventures/${venture.slug}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium">{venture.name}</span>
                    <VentureStatusBadge status={venture.status} />
                  </div>
                  <p className="text-muted mt-2 text-sm">{venture.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
