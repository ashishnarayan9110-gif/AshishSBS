import { type ReactNode } from "react";

export function PageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 pt-8 pb-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
        {badge}
      </div>
      {description ? (
        <p className="text-muted mt-3 max-w-(--content-max-width) text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
