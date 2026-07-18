import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { getPrinciples } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PrinciplesPage() {
  const principles = await getPrinciples();

  return (
    <>
      <PageHeader
        title="What Changed My Mind"
        description="Beliefs I currently hold and keep testing against reality — not settled truths, just the best explanation I have until something breaks it."
      />
      <Container className="pt-14 pb-24">
        {principles.length === 0 ? (
          <EmptyState
            title="No principles published yet."
            description="Principles appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.id}>
                <LinkCard href={`/principles/${principle.slug}`}>
                  <p className="font-medium">{principle.title}</p>
                  <p className="text-muted mt-2 text-sm">{principle.statement}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
