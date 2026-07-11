import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabNoteBySlug, getLabNotes } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LabNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [note, allNotes] = await Promise.all([getLabNoteBySlug(slug), getLabNotes()]);

  if (!note) notFound();

  const date = (note.publishedAt ?? note.createdAt)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", ".");

  const currentIndex = allNotes.findIndex((n) => n.slug === note.slug);
  const nextNote = currentIndex >= 0 ? allNotes[currentIndex + 1] : undefined;

  return (
    <div className="os-light dot-grid-dark">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-12">
        <div className="font-meta text-accent mb-6 text-[11px] uppercase">
          {"// Lab note"} — {date}
        </div>
        <h1 className="font-display text-[clamp(34px,6vw,68px)] leading-[0.98]">
          {note.title}
        </h1>
        {note.category ? (
          <div className="font-meta text-muted mt-7 text-[11px] uppercase">
            #{note.category}
          </div>
        ) : null}
      </div>

      <div className="mx-auto h-px max-w-3xl bg-black/12" />

      <div className="mx-auto max-w-3xl px-6 pt-14 pb-24">
        <div className="text-lg leading-[1.8] whitespace-pre-wrap text-[#2A2A2A]">
          {note.body}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/12 pt-7">
          <span className="font-meta text-muted text-[11px] uppercase">
            Logged {date} · Ashish
          </span>
          {nextNote ? (
            <Link
              href={`/lab/${nextNote.slug}`}
              className="font-grotesk border-accent border-b pb-1 text-sm font-semibold"
            >
              Next note ↗
            </Link>
          ) : (
            <Link
              href="/lab"
              className="font-grotesk border-accent border-b pb-1 text-sm font-semibold"
            >
              Back to all notes ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
