import type { Venture } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function VentureForm({
  venture,
  action,
}: {
  venture?: Venture;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={venture?.slug}
          required
          className="field-input"
          placeholder="savison-life"
        />
      </Field>
      <Field label="Name">
        <input
          name="name"
          defaultValue={venture?.name}
          required
          className="field-input"
        />
      </Field>
      <Field label="Summary">
        <textarea
          name="summary"
          defaultValue={venture?.summary}
          required
          className="field-input min-h-20"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Status">
          <select
            name="status"
            defaultValue={venture?.status ?? "RESEARCH"}
            className="field-input"
          >
            <option value="RESEARCH">Research</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="SUNSET">Sunset</option>
          </select>
        </Field>
        <Field label="Content status">
          <select
            name="contentStatus"
            defaultValue={venture?.contentStatus ?? "DRAFT"}
            className="field-input"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
      </div>
      <Field label="Industry (optional)">
        <input
          name="industry"
          defaultValue={venture?.industry ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Problem (optional)">
        <textarea
          name="problem"
          defaultValue={venture?.problem ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Solution (optional)">
        <textarea
          name="solution"
          defaultValue={venture?.solution ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Current stage (optional)">
        <textarea
          name="currentStage"
          defaultValue={venture?.currentStage ?? ""}
          className="field-input"
        />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={venture?.featured} />
        Featured on homepage
      </label>
      <Button type="submit">{venture ? "Save changes" : "Create venture"}</Button>
    </form>
  );
}
