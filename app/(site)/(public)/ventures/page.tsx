import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { VentureStatusBadge } from "@/components/ui/badge";
import { ListingThumb } from "@/components/ui/listing-thumb";
import { getVentures } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function VenturesPage() {
  const ventures = await getVentures();

  return (
    <>
      <PageHeader
        title="Ventures"
        description="Real businesses, logged as they happen — the ones still running, the ones that paused, the ones that quietly died. Status changes; the record doesn't get rewritten."
      />
      <Container className="pt-14 pb-24">
        {ventures.length === 0 ? (
          <EmptyState
            title="No ventures published yet."
            description="Ventures appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ventures.map((venture) => (
              <li key={venture.id} className="flex">
                <LinkCard href={`/ventures/${venture.slug}`} className="flex w-full flex-col p-4 sm:p-5">
                  <ListingThumb
                    title={venture.name}
                    slug={venture.slug}
                    src={venture.logoUrl}
                  />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <span className="font-medium break-words">{venture.name}</span>
                    <VentureStatusBadge status={venture.status} />
                  </div>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{venture.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
