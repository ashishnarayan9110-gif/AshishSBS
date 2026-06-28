import type { Resource } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function ResourceForm({
  resource,
  action,
}: {
  resource?: Resource;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={resource?.slug}
          required
          className="field-input"
        />
      </Field>
      <Field label="Title">
        <input
          name="title"
          defaultValue={resource?.title}
          required
          className="field-input"
        />
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Category (optional)">
          <input
            name="category"
            defaultValue={resource?.category ?? ""}
            className="field-input"
          />
        </Field>
        <Field label="Format (optional)">
          <input
            name="format"
            defaultValue={resource?.format ?? ""}
            className="field-input"
          />
        </Field>
        <Field label="Difficulty (optional)">
          <input
            name="difficulty"
            defaultValue={resource?.difficulty ?? ""}
            className="field-input"
          />
        </Field>
      </div>
      <Field label="Description (optional)">
        <textarea
          name="description"
          defaultValue={resource?.description ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Download URL (optional)">
        <input
          name="downloadUrl"
          defaultValue={resource?.downloadUrl ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={resource?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">{resource ? "Save changes" : "Create resource"}</Button>
    </form>
  );
}
