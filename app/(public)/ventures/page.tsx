import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
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
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        {ventures.length === 0 ? (
          <EmptyState
            title="No ventures published yet."
            description="Ventures appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {ventures.map((venture) => (
              <li key={venture.id} className="border-border rounded-lg border p-6">
                <Link href={`/ventures/${venture.slug}`} className="font-medium">
                  {venture.name}
                </Link>
                <p className="text-muted mt-2 text-sm">{venture.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
