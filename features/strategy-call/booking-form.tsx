"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  strategyCallSchema,
  founderStages,
  type StrategyCallValues,
} from "@/lib/schemas/strategy-call";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const STAGE_LABELS: Record<(typeof founderStages)[number], string> = {
  IDEA_ONLY: "Just an idea",
  PRE_LAUNCH: "Pre-launch",
  REGISTERED: "Already registered",
  GENERATING_REVENUE: "Generating revenue",
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StrategyCallValues>({
    resolver: zodResolver(strategyCallSchema),
    defaultValues: { stage: "PRE_LAUNCH" },
  });

  async function onSubmit(values: StrategyCallValues) {
    setStatus("idle");
    setErrorMessage("");

    const orderResponse = await fetch("/api/strategy-call/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!orderResponse.ok) {
      const data = await orderResponse.json().catch(() => ({}));
      setErrorMessage(data.error ?? "Could not start payment. Please try again.");
      setStatus("error");
      return;
    }

    const { bookingId, orderId, amount, keyId } = await orderResponse.json();

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !keyId) {
      setErrorMessage("Payment is not available right now. Please try again shortly.");
      setStatus("error");
      return;
    }

    const razorpay = new window.Razorpay({
      key: keyId,
      amount,
      currency: "INR",
      name: "Ashish — 20-Minute Strategy Call",
      description: "₹1,499 — high-signal strategy call",
      order_id: orderId,
      prefill: { name: values.name, email: values.email, contact: values.phone },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        const verifyResponse = await fetch("/api/strategy-call/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId, ...response }),
        });

        if (verifyResponse.ok) {
          setStatus("success");
        } else {
          setErrorMessage(
            "Payment received but verification failed. We'll follow up by email.",
          );
          setStatus("error");
        }
      },
      modal: {
        ondismiss: () => {
          setErrorMessage("Payment was cancelled.");
          setStatus("error");
        },
      },
    });

    razorpay.open();
  }

  if (status === "success") {
    return (
      <p className="text-sm">
        Payment received. You&apos;ll get a calendar link by email within 24 hours.
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

      <Field label="Name" error={errors.name?.message}>
        <input className="field-input" {...register("name")} />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input className="field-input" type="email" {...register("email")} />
      </Field>

      <Field label="Phone (optional)">
        <input className="field-input" {...register("phone")} />
      </Field>

      <Field
        label="What is the exact question or problem you want to solve in these 20 minutes?"
        error={errors.question?.message}
      >
        <textarea className="field-input min-h-20" {...register("question")} />
      </Field>

      <Field
        label="What have you already tried so far?"
        error={errors.triedSoFar?.message}
      >
        <textarea className="field-input min-h-20" {...register("triedSoFar")} />
      </Field>

      <Field label="What is your current stage?" error={errors.stage?.message}>
        <select className="field-input" {...register("stage")}>
          {founderStages.map((stage) => (
            <option key={stage} value={stage}>
              {STAGE_LABELS[stage]}
            </option>
          ))}
        </select>
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Starting payment…" : "Pay ₹1,499 & book"}
      </Button>

      {status === "error" ? <p className="text-danger text-sm">{errorMessage}</p> : null}
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
