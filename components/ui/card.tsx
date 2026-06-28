import Link from "next/link";
import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-border rounded-lg border p-6 ${className}`}>{children}</div>
  );
}

export function LinkCard({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`border-border hover:border-foreground/30 block rounded-lg border p-6 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
