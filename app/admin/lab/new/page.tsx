import { LabNoteForm } from "@/features/admin/lab-note-form";
import { createLabNote } from "@/features/admin/lab-note-actions";

export default function NewLabNotePage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Lab Note</h1>
      <div className="mt-8">
        <LabNoteForm action={createLabNote} />
      </div>
    </div>
  );
}
