import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { getPrinciples } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PrinciplesPage() {
  const principles = await getPrinciples();

  return (
    <>
      <PageHeader
        title="Principles"
        description="Long-term beliefs that guide every decision — not opinions, not articles."
      />
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        {principles.length === 0 ? (
          <EmptyState
            title="No principles published yet."
            description="Principles appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.id} className="border-border rounded-lg border p-6">
                <Link href={`/principles/${principle.slug}`} className="font-medium">
                  {principle.title}
                </Link>
                <p className="text-muted mt-2 text-sm">{principle.statement}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
