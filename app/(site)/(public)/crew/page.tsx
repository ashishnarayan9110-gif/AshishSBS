import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { getCrew } from "@/lib/content";
import { CrewAvatar, personLinks } from "@/features/crew/crew-card";

export const dynamic = "force-dynamic";

export default async function CrewPage() {
  const crew = await getCrew();

  return (
    <>
      <PageHeader
        title="The Crew"
        description="Nothing here was built alone. These are the people who showed up — the ones who knew the thing I didn't, fixed what I broke, or told me the truth when it would have been easier not to."
      />
      <Container className="pt-14 pb-24">
        {crew.length === 0 ? (
          <EmptyState
            title="No one published yet."
            description="People appear here once their entry is written up and published."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {crew.map((person, index) => {
              const credits = [
                ...person.projects.map((p) => ({
                  key: `p-${p.projectId}`,
                  href: `/projects/${p.project.slug}`,
                  label: p.project.title,
                })),
                ...person.ventures.map((v) => ({
                  key: `v-${v.ventureId}`,
                  href: `/ventures/${v.venture.slug}`,
                  label: v.venture.name,
                })),
              ];

              return (
                <li key={person.id} className="bg-background flex flex-col p-6 sm:p-7">
                  <div className="font-meta text-muted flex items-center justify-between text-[10px] uppercase">
                    <span>{`No. ${String(index + 1).padStart(2, "0")}`}</span>
                    {person.featured ? <span className="text-accent">Inner circle</span> : null}
                  </div>

                  <CrewAvatar name={person.name} slug={person.slug} src={person.photoUrl} />

                  {person.alias ? (
                    <p className="font-display text-accent mt-5 text-[clamp(22px,4vw,30px)] leading-[0.95] break-words">
                      {`“${person.alias}”`}
                    </p>
                  ) : null}

                  <h2 className="font-grotesk mt-2 text-lg font-semibold break-words">
                    <Link href={`/crew/${person.slug}`} className="hover:text-accent transition-colors">
                      {person.name}
                    </Link>
                  </h2>

                  {person.role ? (
                    <p className="font-meta text-muted mt-1 text-[11px] uppercase">{person.role}</p>
                  ) : null}

                  {person.quirk ? (
                    <p className="text-muted mt-4 text-sm leading-relaxed italic">{person.quirk}</p>
                  ) : null}

                  {person.whatTheyDid ? (
                    <p className="mt-4 text-sm leading-relaxed text-[#D9D2CF]">{person.whatTheyDid}</p>
                  ) : null}

                  {credits.length > 0 ? (
                    <div className="border-border mt-5 border-t pt-4">
                      <div className="font-meta text-muted text-[10px] uppercase">On the job</div>
                      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {credits.map((credit) => (
                          <li key={credit.key}>
                            <Link
                              href={credit.href}
                              className="text-muted hover:text-accent text-sm underline underline-offset-4 transition-colors"
                            >
                              {credit.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {personLinks(person.links).length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-3">
                      {personLinks(person.links).map((link) => (
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
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </>
  );
}
