"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  realtyInquirySchema,
  type RealtyInquiryValues,
} from "@/lib/schemas/realty-inquiry";
import { Button } from "@/components/ui/button";

export function RealtyInquiryForm({ listingSlug }: { listingSlug?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RealtyInquiryValues>({
    resolver: zodResolver(realtyInquirySchema),
    defaultValues: { listingSlug, purpose: "INVESTMENT", confirmed: false },
  });

  async function onSubmit(values: RealtyInquiryValues) {
    setError("");
    const res = await fetch("/api/realty/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      router.push("/thank-you");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("fax")} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name *" error={errors.name?.message}>
          <input className="field-input" placeholder="Your full name" {...register("name")} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input className="field-input" placeholder="Company (optional)" {...register("company")} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone *" error={errors.phone?.message}>
          <input className="field-input" placeholder="+91 98765 00000" {...register("phone")} />
        </Field>
        <Field label="Email *" error={errors.email?.message}>
          <input
            className="field-input"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="City" error={errors.city?.message}>
          <input className="field-input" placeholder="Your city" {...register("city")} />
        </Field>
        <Field label="Budget" error={errors.budget?.message}>
          <input className="field-input" placeholder="e.g. ₹3–4 Crore" {...register("budget")} />
        </Field>
      </div>

      <Field label="Purpose" error={errors.purpose?.message}>
        <select className="field-input" {...register("purpose")}>
          <option value="INVESTMENT">Investment</option>
          <option value="OWN_USE">Own Use</option>
          <option value="LEASING">Leasing</option>
        </select>
      </Field>

      <Field label="Message / Requirements" error={errors.message?.message}>
        <textarea
          className="field-input min-h-24"
          placeholder="Please share your interest or specific requirements..."
          {...register("message")}
        />
      </Field>

      <div className="space-y-1">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-0.5"
            {...register("confirmed")}
          />
          <span className="text-muted leading-snug">
            I understand this property is shown by appointment only.
          </span>
        </label>
        {errors.confirmed && (
          <p className="text-danger text-xs">{errors.confirmed.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Request Callback"}
      </Button>

      {error && <p className="text-danger text-sm">{error}</p>}
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
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-danger mt-1 text-xs">{error}</p>}
    </div>
  );
}
