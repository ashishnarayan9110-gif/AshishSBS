export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 pt-16 pb-10">
      <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
      {description ? (
        <p className="text-muted mt-3 max-w-(--content-max-width) text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
