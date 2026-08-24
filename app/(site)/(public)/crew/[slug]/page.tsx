import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersonBySlug } from "@/lib/content";
import { CrewAvatar, personLinks } from "@/features/crew/crew-card";

export const dynamic = "force-dynamic";

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);

  if (!person) notFound();

  const credits = [
    ...person.projects.map((p) => ({
      key: `p-${p.projectId}`,
      href: `/projects/${p.project.slug}`,
      label: p.project.title,
      contribution: p.contribution,
    })),
    ...person.ventures.map((v) => ({
      key: `v-${v.ventureId}`,
      href: `/ventures/${v.venture.slug}`,
      label: v.venture.name,
      contribution: v.contribution,
    })),
  ];

  const body = [
    { label: "How we met", text: person.howWeMet },
    { label: "What they did", text: person.whatTheyDid },
  ].filter((b): b is { label: string; text: string } => Boolean(b.text));

  const links = personLinks(person.links);

  return (
    <>
      <div className="dot-grid border-border border-b px-6 pt-16 pb-12 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <div className="font-meta text-muted mb-7 flex justify-between text-[11px] uppercase">
            <Link href="/crew" className="hover:text-foreground">
              ← Back to the crew
            </Link>
            <span className="text-accent">Crew</span>
          </div>

          <CrewAvatar name={person.name} slug={person.slug} src={person.photoUrl} />

          {person.alias ? (
            <p className="font-display text-accent mt-6 text-[clamp(32px,6vw,64px)] leading-[0.9] break-words">
              {`“${person.alias}”`}
            </p>
          ) : null}

          <h1 className="font-display mt-2 text-[clamp(32px,6vw,72px)] leading-[0.9] break-words">
            {person.name}
          </h1>

          {person.role ? (
            <p className="font-meta text-muted mt-5 text-[11px] uppercase">{person.role}</p>
          ) : null}

          {person.quirk ? (
            <p className="mt-6 max-w-xl text-lg leading-relaxed italic text-[#D9D2CF]">
              {person.quirk}
            </p>
          ) : null}
        </div>
      </div>

      <div className="dot-grid border-border border-b px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-(--layout-max-width) gap-10 lg:grid-cols-[220px_1fr]">
          <div className="font-meta text-accent text-[11px] uppercase">{"// The file"}</div>
          <div className="max-w-2xl space-y-10">
            {body.map((b) => (
              <div key={b.label}>
                <div className="font-meta text-muted mb-2 text-[11px] uppercase">{b.label}</div>
                <p className="text-lg leading-relaxed text-[#D9D2CF]">{b.text}</p>
              </div>
            ))}

            {credits.length > 0 ? (
              <div className="border-border border-t pt-8">
                <div className="font-meta text-accent mb-5 text-[11px] uppercase">
                  {"// On the job"}
                </div>
                <ul className="space-y-4">
                  {credits.map((credit) => (
                    <li key={credit.key}>
                      <Link
                        href={credit.href}
                        className="hover:text-accent text-lg underline underline-offset-4 transition-colors"
                      >
                        {credit.label}
                      </Link>
                      {credit.contribution ? (
                        <p className="text-muted mt-1 text-sm leading-relaxed">
                          {credit.contribution}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {links.length > 0 ? (
              <div className="border-border border-t pt-8">
                <ul className="flex flex-wrap gap-4">
                  {links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-meta text-accent text-[11px] uppercase hover:underline"
                      >
                        {`${link.label} ↗`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
