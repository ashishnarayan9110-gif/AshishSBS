import type { Project, Venture } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function ProjectForm({
  project,
  ventures,
  action,
}: {
  project?: Project;
  ventures: Venture[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={project?.slug}
          required
          className="field-input"
        />
      </Field>
      <Field label="Title">
        <input
          name="title"
          defaultValue={project?.title}
          required
          className="field-input"
        />
      </Field>
      <Field label="Summary">
        <textarea
          name="summary"
          defaultValue={project?.summary}
          required
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Venture (optional)">
        <select
          name="ventureId"
          defaultValue={project?.ventureId ?? ""}
          className="field-input"
        >
          <option value="">None</option>
          {ventures.map((venture) => (
            <option key={venture.id} value={venture.id}>
              {venture.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Background (optional)">
        <textarea
          name="background"
          defaultValue={project?.background ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Process (optional)">
        <textarea
          name="process"
          defaultValue={project?.process ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Outcome (optional)">
        <textarea
          name="outcome"
          defaultValue={project?.outcome ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={project?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={project?.featured} />
        Featured on homepage
      </label>
      <Button type="submit">{project ? "Save changes" : "Create project"}</Button>
    </form>
  );
}
