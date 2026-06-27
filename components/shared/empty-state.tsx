export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-border rounded-lg border border-dashed px-6 py-16 text-center">
      <p className="font-medium">{title}</p>
      {description ? (
        <p className="text-muted mt-2 text-sm">{description}</p>
      ) : null}
    </div>
  );
}
