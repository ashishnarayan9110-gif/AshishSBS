import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { getLabNotes } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LabPage() {
  const notes = await getLabNotes();

  return (
    <>
      <PageHeader
        title="Lab"
        description="Unfinished thinking — experiments, research and open questions."
      />
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        {notes.length === 0 ? (
          <EmptyState
            title="No experiments published yet."
            description="Lab notes appear here once documented in the CMS."
          />
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li key={note.id} className="border-border border-b pb-4">
                <Link href={`/lab/${note.slug}`} className="font-medium">
                  {note.title}
                </Link>
                {note.category ? (
                  <span className="text-muted ml-2 text-xs">{note.category}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
