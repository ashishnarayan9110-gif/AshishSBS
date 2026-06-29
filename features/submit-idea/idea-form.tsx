"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ideaSubmissionSchema,
  type IdeaSubmissionValues,
} from "@/lib/schemas/idea-submission";
import { Button } from "@/components/ui/button";

export function IdeaForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IdeaSubmissionValues>({ resolver: zodResolver(ideaSubmissionSchema) });

  async function onSubmit(values: IdeaSubmissionValues) {
    setStatus("idle");
    const response = await fetch("/api/idea-submission", {
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
    return (
      <p className="text-sm">
        Got it. If yours is selected for a breakdown, you&apos;ll see it published — no
        promises on timing.
      </p>
    );
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

      <Field label="Your name" error={errors.name?.message}>
        <input className="field-input" {...register("name")} />
      </Field>

      <Field
        label="Core business idea, in one sentence"
        error={errors.businessIdea?.message}
      >
        <textarea className="field-input min-h-20" {...register("businessIdea")} />
      </Field>

      <Field label="Who is your target customer?" error={errors.targetCustomer?.message}>
        <input className="field-input" {...register("targetCustomer")} />
      </Field>

      <Field
        label="What problem are you solving for them?"
        error={errors.problem?.message}
      >
        <textarea className="field-input min-h-20" {...register("problem")} />
      </Field>

      <Field
        label="What's the biggest challenge you're facing right now?"
        error={errors.biggestChallenge?.message}
      >
        <textarea className="field-input min-h-20" {...register("biggestChallenge")} />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit my idea"}
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
