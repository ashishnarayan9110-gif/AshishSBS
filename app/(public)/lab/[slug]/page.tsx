import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
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

  return (
    <>
      <PageHeader title={note.title} />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        <p className="text-muted whitespace-pre-wrap">{note.body}</p>
      </div>
    </>
  );
}
