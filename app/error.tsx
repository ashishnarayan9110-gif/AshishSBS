"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-24 text-center">
      <h1 className="text-2xl font-medium">Something went wrong</h1>
      <p className="text-muted mt-3">
        An unexpected error occurred. You can try again or return home.
      </p>
      <div className="mt-6 flex justify-center gap-4 text-sm">
        <button onClick={reset} className="underline">
          Try again
        </button>
        <Link href="/" className="underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
