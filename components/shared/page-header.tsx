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
    <div className="dot-grid border-border border-b">
      <div className="mx-auto max-w-(--layout-max-width) px-6 pt-14 pb-12">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display text-[clamp(40px,7vw,88px)] leading-[0.9]">
            {title}
          </h1>
          {badge}
        </div>
        {description ? (
          <p className="text-muted mt-5 max-w-(--content-max-width) text-lg leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
