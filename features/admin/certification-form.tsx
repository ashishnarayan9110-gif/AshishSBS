import type { Certification } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

function dateValue(date: Date | null | undefined) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export function CertificationForm({
  certification,
  action,
}: {
  certification?: Certification;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={certification?.slug}
          required
          className="field-input"
          placeholder="hubspot-content-marketing"
        />
      </Field>
      <Field label="Title">
        <input
          name="title"
          defaultValue={certification?.title}
          required
          className="field-input"
          placeholder="Content Marketing Certified"
        />
      </Field>
      <Field label="Issuer">
        <input
          name="issuer"
          defaultValue={certification?.issuer}
          required
          className="field-input"
          placeholder="HubSpot Academy"
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Issued (optional)">
          <input
            type="date"
            name="issuedAt"
            defaultValue={dateValue(certification?.issuedAt)}
            className="field-input"
          />
        </Field>
        <Field label="Expires (optional)">
          <input
            type="date"
            name="expiresAt"
            defaultValue={dateValue(certification?.expiresAt)}
            className="field-input"
          />
        </Field>
      </div>
      <Field label="Credential ID (optional)">
        <input
          name="credentialId"
          defaultValue={certification?.credentialId ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Verification URL (optional) — the issuer's own verify page">
        <input
          name="verifyUrl"
          defaultValue={certification?.verifyUrl ?? ""}
          className="field-input"
          placeholder="https://…"
        />
      </Field>
      <Field label="Skills (optional) — comma separated">
        <input
          name="skills"
          defaultValue={certification?.skills ?? ""}
          className="field-input"
          placeholder="Content strategy, Promotion, Analytics"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={certification?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">
        {certification ? "Save changes" : "Create certification"}
      </Button>
    </form>
  );
}
