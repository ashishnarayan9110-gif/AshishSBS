import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { getInsights } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <PageHeader
        title="Insights"
        description="Real conversations with people who actually move things. No hype, no motivational speeches — sharp, high-signal discussions with operators, experts, and builders."
      />
      <Container className="pb-24">
        {insights.length === 0 ? (
          <EmptyState
            title="No insights published yet."
            description="Interviews and conversations appear here once published in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {insights.map((insight) => (
              <li key={insight.id}>
                <LinkCard href={`/insights/${insight.slug}`}>
                  <span className="font-medium">{insight.title}</span>
                  {insight.guestName ? (
                    <p className="text-muted mt-1 text-xs">with {insight.guestName}</p>
                  ) : null}
                  <p className="text-muted mt-2 text-sm">{insight.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
