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
  const maxWidth =
    width === "layout" ? "max-w-(--layout-max-width)" : "max-w-(--content-max-width)";
  return (
    <div id={id} className={`mx-auto ${maxWidth} px-6 ${className}`}>
      {children}
    </div>
  );
}
