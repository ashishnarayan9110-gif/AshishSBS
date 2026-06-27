import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { getCareerEntries } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CareerPage() {
  const entries = await getCareerEntries();

  return (
    <>
      <PageHeader
        title="Career Archive"
        description="A factual, chronological record of work — no confidential or client-sensitive information."
      />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        {entries.length === 0 ? (
          <EmptyState
            title="No entries published yet."
            description="The archive populates as entries are added in the CMS."
          />
        ) : (
          <ol className="border-border space-y-8 border-l pl-6">
            {entries.map((entry) => (
              <li key={entry.id}>
                <p className="font-medium">
                  {entry.project} · {entry.organisation}
                </p>
                <p className="text-muted text-sm">{entry.role}</p>
                <p className="text-muted mt-2 text-sm">{entry.overview}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
