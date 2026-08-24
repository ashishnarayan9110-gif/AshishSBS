import Link from "next/link";

type Credit = {
  personId: string;
  contribution: string | null;
  person: { slug: string; name: string; alias: string | null; role: string | null };
};

// The small credit line that carries the crew's aliases onto the work itself.
export function CrewCredits({ crew }: { crew: Credit[] }) {
  if (crew.length === 0) return null;

  return (
    <div className="border-border mt-10 border-t pt-8">
      <div className="font-meta text-accent mb-5 text-[11px] uppercase">
        {"// Who was in on it"}
      </div>
      <ul className="space-y-3">
        {crew.map((credit) => (
          <li key={credit.personId} className="leading-relaxed">
            <Link
              href={`/crew/${credit.person.slug}`}
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              {credit.person.name}
            </Link>
            {credit.person.alias ? (
              <span className="text-accent">{` “${credit.person.alias}”`}</span>
            ) : null}
            {credit.contribution || credit.person.role ? (
              <span className="text-muted">
                {` — ${credit.contribution ?? credit.person.role}`}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
