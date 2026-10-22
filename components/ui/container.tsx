import { type ReactNode } from "react";

export function Container({
  children,
  width = "layout",
  className = "",
  id,
}: {
  children: ReactNode;
  width?: "layout" | "content";
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`wrap sec ${className}`}
      style={width === "content" ? { maxWidth: "min(var(--max), 74ch)" } : undefined}
    >
      {children}
    </div>
  );
}
