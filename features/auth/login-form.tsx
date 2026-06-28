"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <div className="mt-1.5">
          <input id="email" name="email" type="email" required className="field-input" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <div className="mt-1.5">
          <input
            id="password"
            name="password"
            type="password"
            required
            className="field-input"
          />
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
      {state?.error ? <p className="text-danger text-sm">{state.error}</p> : null}
    </form>
  );
}
