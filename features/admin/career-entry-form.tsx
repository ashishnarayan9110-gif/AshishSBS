import type { CareerEntry } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

function toDateInputValue(date?: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export function CareerEntryForm({
  entry,
  action,
}: {
  entry?: CareerEntry;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Project">
        <input
          name="project"
          defaultValue={entry?.project}
          required
          className="field-input"
        />
      </Field>
      <Field label="Organisation">
        <input
          name="organisation"
          defaultValue={entry?.organisation}
          required
          className="field-input"
        />
      </Field>
      <Field label="Role">
        <input name="role" defaultValue={entry?.role} required className="field-input" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Start date">
          <input
            name="startDate"
            type="date"
            defaultValue={toDateInputValue(entry?.startDate)}
            required
            className="field-input"
          />
        </Field>
        <Field label="End date (optional)">
          <input
            name="endDate"
            type="date"
            defaultValue={toDateInputValue(entry?.endDate)}
            className="field-input"
          />
        </Field>
      </div>
      <Field label="Overview">
        <textarea
          name="overview"
          defaultValue={entry?.overview}
          required
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Public outcome (optional)">
        <textarea
          name="publicOutcome"
          defaultValue={entry?.publicOutcome ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Lessons (optional)">
        <textarea
          name="lessons"
          defaultValue={entry?.lessons ?? ""}
          className="field-input"
        />
      </Field>
      <Button type="submit">{entry ? "Save changes" : "Create entry"}</Button>
    </form>
  );
}
