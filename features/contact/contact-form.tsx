"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  contactReasons,
  type ContactFormValues,
} from "@/lib/schemas/contact";
import { Button } from "@/components/ui/button";

const REASON_LABELS: Record<(typeof contactReasons)[number], string> = {
  COLLABORATION: "Collaboration",
  CONSULTING: "Consulting",
  SPEAKING: "Speaking",
  PARTNERSHIP: "Partnership",
  GENERAL_INQUIRY: "General Inquiry",
  MEDIA: "Media",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { reason: "GENERAL_INQUIRY" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm">Message received. Expect a reply within a few days.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="fax">Fax</label>
        <input
          id="fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("fax")}
        />
      </div>

      <Field label="Name" error={errors.name?.message}>
        <input className="field-input" {...register("name")} />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input className="field-input" type="email" {...register("email")} />
      </Field>

      <Field label="Reason" error={errors.reason?.message}>
        <select className="field-input" {...register("reason")}>
          {contactReasons.map((reason) => (
            <option key={reason} value={reason}>
              {REASON_LABELS[reason]}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea className="field-input min-h-32" {...register("message")} />
      </Field>

      <Field label="Company (optional)">
        <input className="field-input" {...register("company")} />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>

      {status === "error" ? (
        <p className="text-danger text-sm">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="text-danger mt-1 text-xs">{error}</p> : null}
    </div>
  );
}
