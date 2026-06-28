import type { Service } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function ServiceForm({
  service,
  action,
}: {
  service?: Service;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={service?.slug}
          required
          className="field-input"
        />
      </Field>
      <Field label="Name">
        <input
          name="name"
          defaultValue={service?.name}
          required
          className="field-input"
        />
      </Field>
      <Field label="Problem (optional)">
        <textarea
          name="problem"
          defaultValue={service?.problem ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Ideal client (optional)">
        <textarea
          name="idealClient"
          defaultValue={service?.idealClient ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Approach (optional)">
        <textarea
          name="approach"
          defaultValue={service?.approach ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Deliverables (optional)">
        <textarea
          name="deliverables"
          defaultValue={service?.deliverables ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Timeline (optional)">
        <input
          name="timeline"
          defaultValue={service?.timeline ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={service?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">{service ? "Save changes" : "Create service"}</Button>
    </form>
  );
}
