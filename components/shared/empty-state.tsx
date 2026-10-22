export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="nil" data-rv>
      <b className="up">{title}</b>
      {description ? <p className="up">{description}</p> : null}
    </div>
  );
}
