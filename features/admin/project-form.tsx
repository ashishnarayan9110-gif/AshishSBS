import type { Person, Project, Venture } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function ProjectForm({
  project,
  ventures,
  people = [],
  crewIds = [],
  action,
}: {
  project?: Project;
  ventures: Venture[];
  people?: Person[];
  crewIds?: string[];
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Discipline">
          <select
            name="discipline"
            defaultValue={project?.discipline ?? "DIGITAL"}
            className="field-input"
          >
            <option value="DIGITAL">Digital</option>
            <option value="FURNITURE">Furniture</option>
            <option value="TEACHING">Teaching</option>
            <option value="BUSINESS">Business</option>
            <option value="PERSONAL">Personal</option>
            <option value="OTHER">Other</option>
          </select>
        </Field>
        <Field label="Outcome (optional)">
          <select
            name="outcomeStatus"
            defaultValue={project?.outcomeStatus ?? ""}
            className="field-input"
          >
            <option value="">Not recorded</option>
            <option value="SHIPPED">Shipped</option>
            <option value="RUNNING">Running</option>
            <option value="PAUSED">Paused</option>
            <option value="FAILED">Failed</option>
          </select>
        </Field>
      </div>
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
      <Field label="Image URL (optional)">
        <input
          name="imageUrl"
          defaultValue={project?.imageUrl ?? ""}
          className="field-input"
          placeholder="https://…"
        />
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
      <Field label="Outcome notes (optional)">
        <textarea
          name="outcome"
          defaultValue={project?.outcome ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      {people.length > 0 ? (
        <Field label="Credit (optional) — hold Ctrl/Cmd to select several">
          <select
            name="crewIds"
            multiple
            defaultValue={crewIds}
            className="field-input min-h-32"
          >
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
                {person.alias ? ` — “${person.alias}”` : ""}
              </option>
            ))}
          </select>
        </Field>
      ) : null}
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
