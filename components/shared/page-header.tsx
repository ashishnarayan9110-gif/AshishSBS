import { type ReactNode } from "react";

/* The page opener used by every inner route. `title` may carry an <em> for the
   display serif or an <i> for the signal red when passed as a node. */
export function PageHeader({
  title,
  description,
  badge,
  index,
}: {
  title: ReactNode;
  description?: string;
  badge?: ReactNode;
  index?: string;
}) {
  return (
    <div className="wrap ph" data-rv>
      {index ? <span className="m ph__k up">{index}</span> : null}
      <h1 className="up">{title}</h1>
      {description ? <p className="ph__p up">{description}</p> : null}
      {badge ? <div className="ph__m up">{badge}</div> : null}
    </div>
  );
}
