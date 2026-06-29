import type { Insight } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function InsightForm({
  insight,
  action,
}: {
  insight?: Insight;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={insight?.slug}
          required
          className="field-input"
        />
      </Field>
      <Field label="Title">
        <input
          name="title"
          defaultValue={insight?.title}
          required
          className="field-input"
        />
      </Field>
      <Field label="Guest name (optional)">
        <input
          name="guestName"
          defaultValue={insight?.guestName ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Video URL (optional — YouTube)">
        <input
          name="videoUrl"
          defaultValue={insight?.videoUrl ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Summary">
        <textarea
          name="summary"
          defaultValue={insight?.summary}
          required
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Body (optional)">
        <textarea
          name="body"
          defaultValue={insight?.body ?? ""}
          className="field-input min-h-40"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={insight?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">{insight ? "Save changes" : "Create insight"}</Button>
    </form>
  );
}
