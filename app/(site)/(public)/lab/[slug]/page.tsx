import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabNoteBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LabNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getLabNoteBySlug(slug);

  if (!note) notFound();

  const date = (note.publishedAt ?? note.createdAt)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", ".");

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

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-black/12 pt-7">
          <span className="font-meta text-muted text-[11px] uppercase">
            Logged {date} · Node: Ashish
          </span>
          <Link
            href="/lab"
            className="font-grotesk border-accent border-b pb-1 text-sm font-semibold"
          >
            All lab notes ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
