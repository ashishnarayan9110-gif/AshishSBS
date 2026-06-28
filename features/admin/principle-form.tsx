import type { Principle } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function PrincipleForm({
  principle,
  action,
}: {
  principle?: Principle;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={principle?.slug}
          required
          className="field-input"
        />
      </Field>
      <Field label="Title">
        <input
          name="title"
          defaultValue={principle?.title}
          required
          className="field-input"
        />
      </Field>
      <Field label="Statement">
        <textarea
          name="statement"
          defaultValue={principle?.statement}
          required
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Explanation (optional)">
        <textarea
          name="explanation"
          defaultValue={principle?.explanation ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Examples (optional)">
        <textarea
          name="examples"
          defaultValue={principle?.examples ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={principle?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">{principle ? "Save changes" : "Create principle"}</Button>
    </form>
  );
}
