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
        title="Sandbox"
        description="Projects that caught my interest. Some are running, some stalled halfway, some I dropped on purpose. Kept here as they are — no tidying up after the fact."
      />
      <Container className="py-14 pb-24">
        {notes.length === 0 ? (
          <EmptyState
            title="Nothing here yet."
            description="The first project shows up as soon as one is worth putting down."
          />
        ) : (
          <ul className="border-border border-t">
            {notes.map((note, i) => (
              <li key={note.id}>
                <Link
                  href={`/lab/${note.slug}`}
                  className="border-border grid grid-cols-[40px_1fr_24px] items-center gap-4 border-b py-6 sm:grid-cols-[60px_1fr_140px_24px] sm:gap-6"
                >
                  <span className="font-meta text-muted text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-grotesk text-lg font-semibold sm:text-xl">
                    {note.title}
                  </span>
                  <span className="font-meta text-accent hidden text-right text-[10px] uppercase sm:block">
                    {note.category ? `#${note.category}` : ""}
                  </span>
                  <span className="text-muted text-lg">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
