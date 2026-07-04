"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  smallBizWaitlistSchema,
  type SmallBizWaitlistValues,
} from "@/lib/schemas/smallbiz-waitlist";
import { Button } from "@/components/ui/button";

export function SmallBizWaitlistForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SmallBizWaitlistValues>({
    resolver: zodResolver(smallBizWaitlistSchema),
  });

  async function onSubmit(values: SmallBizWaitlistValues) {
    setStatus("idle");
    const res = await fetch("/api/smallbiz/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p className="text-sm">
        You&apos;re on the list. I&apos;ll reach out when we launch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row" noValidate>
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("fax")} />
      </div>
      <div className="flex-1">
        <input
          className="field-input"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-danger mt-1 text-xs">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Joining…" : "Get notified"}
      </Button>
      {status === "error" && (
        <p className="text-danger text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
