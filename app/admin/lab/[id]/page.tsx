import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LabNoteForm } from "@/features/admin/lab-note-form";
import { updateLabNote } from "@/features/admin/lab-note-actions";

export default async function EditLabNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const labNote = await prisma.labNote.findUnique({ where: { id } });

  if (!labNote) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {labNote.title}</h1>
      <div className="mt-8">
        <LabNoteForm labNote={labNote} action={updateLabNote.bind(null, id)} />
      </div>
    </div>
  );
}
