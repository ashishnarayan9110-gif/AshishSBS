import { type ReactNode } from "react";

export function Container({
  children,
  width = "layout",
  className = "",
}: {
  children: ReactNode;
  width?: "layout" | "content";
  className?: string;
}) {
  const maxWidth =
    width === "layout" ? "max-w-(--layout-max-width)" : "max-w-(--content-max-width)";
  return <div className={`mx-auto ${maxWidth} px-6 ${className}`}>{children}</div>;
}
