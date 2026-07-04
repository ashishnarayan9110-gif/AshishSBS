import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { getLabNotes } from "@/lib/content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LabPage() {
  const notes = await getLabNotes();

  return (
    <>
      <PageHeader
        title="Lab"
        description="Unfinished thinking — experiments, research and open questions."
      />
      <Container className="pb-24">
        {notes.length === 0 ? (
          <EmptyState
            title="No experiments published yet."
            description="Lab notes appear here once documented in the CMS."
          />
        ) : (
          <ul className="divide-border divide-y">
            {notes.map((note) => (
              <li key={note.id} className="py-4">
                <Link href={`/lab/${note.slug}`} className="font-medium hover:underline">
                  {note.title}
                </Link>
                {note.category ? (
                  <span className="text-muted ml-2 text-xs">{note.category}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
