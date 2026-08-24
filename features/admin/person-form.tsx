import type { Person } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

function linksToText(links: Person["links"]) {
  if (!Array.isArray(links)) return "";
  return links
    .map((link) =>
      link && typeof link === "object" && "label" in link && "url" in link
        ? `${String(link.label)} | ${String(link.url)}`
        : "",
    )
    .filter(Boolean)
    .join("\n");
}

export function PersonForm({
  person,
  action,
}: {
  person?: Person;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={person?.slug}
          required
          className="field-input"
          placeholder="ramesh-carpenter"
        />
      </Field>
      <Field label="Name">
        <input
          name="name"
          defaultValue={person?.name}
          required
          className="field-input"
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Alias (optional)">
          <input
            name="alias"
            defaultValue={person?.alias ?? ""}
            className="field-input"
            placeholder="The Millimetre"
          />
        </Field>
        <Field label="Role (optional)">
          <input
            name="role"
            defaultValue={person?.role ?? ""}
            className="field-input"
            placeholder="Master carpenter"
          />
        </Field>
      </div>
      <Field label="Quirk (optional)">
        <input
          name="quirk"
          defaultValue={person?.quirk ?? ""}
          className="field-input"
          placeholder="Measures twice, then measures again to prove you wrong."
        />
      </Field>
      <Field label="How we met (optional)">
        <textarea
          name="howWeMet"
          defaultValue={person?.howWeMet ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="What they did (optional)">
        <textarea
          name="whatTheyDid"
          defaultValue={person?.whatTheyDid ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Photo URL (optional)">
        <input
          name="photoUrl"
          defaultValue={person?.photoUrl ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Links (optional) — one per line, as: Label | https://url">
        <textarea
          name="links"
          defaultValue={linksToText(person?.links ?? null)}
          className="field-input min-h-20"
          placeholder="Instagram | https://instagram.com/..."
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={person?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <p className="text-muted text-sm">
        People stay in Draft until you publish them. Nothing about a real person
        goes public by accident.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={person?.featured} />
        Feature near the top of the crew page
      </label>
      <Button type="submit">{person ? "Save changes" : "Create person"}</Button>
    </form>
  );
}
