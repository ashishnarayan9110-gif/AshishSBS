import type { LabNote } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function LabNoteForm({
  labNote,
  action,
}: {
  labNote?: LabNote;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input name="slug" defaultValue={labNote?.slug} required className="field-input" />
      </Field>
      <Field label="Title">
        <input name="title" defaultValue={labNote?.title} required className="field-input" />
      </Field>
      <Field label="Category (optional)">
        <input name="category" defaultValue={labNote?.category ?? ""} className="field-input" />
      </Field>
      <Field label="Body">
        <textarea
          name="body"
          defaultValue={labNote?.body}
          required
          className="field-input min-h-40"
        />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="pinned" defaultChecked={labNote?.pinned} />
        Pinned
      </label>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={labNote?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">{labNote ? "Save changes" : "Create lab note"}</Button>
    </form>
  );
}
