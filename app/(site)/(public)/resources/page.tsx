import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { getResources } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <PageHeader
        title="Field Kit"
        description="The templates and checklists I actually built for myself along the way — kept here because rebuilding them from scratch each time was the mistake."
      />
      <Container className="pt-14 pb-24">
        {resources.length === 0 ? (
          <EmptyState
            title="No resources available yet."
            description="Resources appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {resources.map((resource) => (
              <li key={resource.id}>
                <LinkCard href={`/resources/${resource.slug}`}>
                  <span className="font-medium">{resource.title}</span>
                  {resource.description ? (
                    <p className="text-muted mt-2 text-sm">{resource.description}</p>
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
