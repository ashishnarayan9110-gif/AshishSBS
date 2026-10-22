import Link from "next/link";
import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`cell pane ${className}`}>{children}</div>;
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
    <Link href={href} className={`cell pane ${className}`}>
      {children}
    </Link>
  );
}
