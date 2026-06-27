import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { getResources } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <PageHeader
        title="Resources"
        description="Templates, frameworks, checklists and guides — built once, reused often."
      />
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        {resources.length === 0 ? (
          <EmptyState
            title="No resources available yet."
            description="Resources appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {resources.map((resource) => (
              <li key={resource.id} className="border-border rounded-lg border p-6">
                <Link href={`/resources/${resource.slug}`} className="font-medium">
                  {resource.title}
                </Link>
                {resource.description ? (
                  <p className="text-muted mt-2 text-sm">{resource.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
