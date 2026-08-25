import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { LinkCard } from "@/components/ui/card";
import { getCertifications, getPrinciples } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // The standalone principles page said the same thing this page already does,
  // so the written-up ones live here now, under how I think.
  const [principles, certifications] = await Promise.all([
    getPrinciples(),
    getCertifications(),
  ]);

  return (
    <>
      <PageHeader
        title="About"
        description="Systems Over Chaos — how I think, build, and operate."
      />
      <Container width="content" className="space-y-12 pt-14 pb-24">
        {/* Core identity */}
        <section>
          <h2 className="font-medium">Who I am</h2>
          <p className="text-muted mt-3 leading-relaxed">
            I&apos;m Ashish — founder, systems designer, and the person behind Savison Life.
            I built a compliance-first pharmaceutical marketplace from scratch, navigated
            regulatory complexity that most people never see, and developed an obsession with
            one question: <em>why do so many businesses fail not from bad ideas, but from
            broken systems?</em>
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            That question is what I work on. I call it systems design — not software
            architecture, not management consulting, but the practice of replacing operational
            chaos with clarity that compounds over time.
          </p>
        </section>

        {/* The Quiet Operator positioning */}
        <section>
          <h2 className="font-medium">How I work</h2>
          <p className="text-muted mt-3 leading-relaxed">
            I don&apos;t do hype. I don&apos;t do startup slang. I don&apos;t celebrate hustle
            culture. What I do is look at your business — the process you inherited, the
            shortcut that became the bottleneck, the thing everyone knows is broken but nobody
            has fixed — and design a system that actually solves it.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            My approach is calm, deliberate, and precise. I ask the uncomfortable question
            before recommending any tool. I map the current process before proposing a
            better one. I treat technology as infrastructure, not strategy.
          </p>
        </section>

        {/* What I help with */}
        <section>
          <h2 className="font-medium">What I help first-time founders with</h2>
          <p className="text-muted mt-3 leading-relaxed">
            I built Savison Life from zero — registration, compliance, drug-license
            verification, manufacturer relationships, billing systems, deal rooms.
            Everything a first-time founder in a regulated industry has to figure out the hard
            way.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            I help founders launch properly: clean systems, real compliance, clear
            go-to-market positioning. No fluff, no generic frameworks — just the hard-earned
            clarity that comes from having done it.
          </p>
          <div className="mt-6 flex gap-4">
            <LinkButton href="/services">See how I can help</LinkButton>
            <LinkButton href="/strategy-call" variant="secondary">
              Book a strategy call
            </LinkButton>
          </div>
        </section>

        {/* Principles */}
        <section id="how-i-think">
          <h2 className="font-medium">How I think</h2>
          <p className="text-muted mt-3 leading-relaxed">
            A few principles that guide everything I build and everything I recommend:
          </p>
          <ul className="text-muted mt-4 space-y-3">
            <li>
              <strong className="text-foreground">Systems before scale.</strong>{" "}
              Never scale a broken process. Design the system first.
            </li>
            <li>
              <strong className="text-foreground">Trust is a product feature.</strong>{" "}
              Not a marketing exercise. Transparency and reliability should always matter
              more than growth.
            </li>
            <li>
              <strong className="text-foreground">Simplicity is earned.</strong>{" "}
              If something can be removed without reducing value, remove it. Complexity
              should justify itself.
            </li>
            <li>
              <strong className="text-foreground">Technology disappears.</strong>{" "}
              Users should remember the experience, not the software.
            </li>
            <li>
              <strong className="text-foreground">Build in public.</strong>{" "}
              Finished products teach. Finished journeys don&apos;t. Documenting progress
              creates accountability, attracts collaborators, and preserves knowledge.
            </li>
          </ul>

          {principles.length > 0 && (
            <>
              <p className="text-muted mt-8 leading-relaxed">
                Some of these I&apos;ve written up at length — usually because I used to think
                the opposite:
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {principles.map((principle) => (
                  <li key={principle.id}>
                    <LinkCard href={`/principles/${principle.slug}`}>
                      <p className="font-medium">{principle.title}</p>
                      <p className="text-muted mt-2 text-sm">{principle.statement}</p>
                    </LinkCard>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Skills — certifications, each linked to the issuer's own check */}
        {certifications.length > 0 ? (
          <section id="skills">
            <h2 className="font-medium">Skills &amp; certifications</h2>
            <p className="text-muted mt-3 leading-relaxed">
              Formal ones, with the issuer&apos;s own verification where there is
              one — so none of this has to be taken on trust.
            </p>
            <ul className="border-border mt-6 border-t">
              {certifications.map((certification) => {
                const skills = (certification.skills ?? "")
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean);
                const issued = certification.issuedAt?.getUTCFullYear();
                const expires = certification.expiresAt?.getUTCFullYear();

                return (
                  <li
                    key={certification.id}
                    className="border-border flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b py-5"
                  >
                    <div className="min-w-0">
                      <p className="font-medium break-words">{certification.title}</p>
                      <p className="text-muted mt-1 text-sm">
                        {certification.issuer}
                        {issued ? ` · ${issued}` : ""}
                        {expires ? ` – ${expires}` : ""}
                      </p>
                      {skills.length > 0 ? (
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <li
                              key={skill}
                              className="font-meta text-muted border-muted rounded-full border px-2.5 py-1 text-[10px] uppercase"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    {certification.verifyUrl ? (
                      <a
                        href={certification.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-meta text-accent shrink-0 text-[11px] uppercase hover:underline"
                      >
                        Verify ↗
                      </a>
                    ) : certification.credentialId ? (
                      <span className="font-meta text-muted shrink-0 text-[11px] break-all">
                        {certification.credentialId}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {/* This platform */}
        <section>
          <h2 className="font-medium">This platform</h2>
          <p className="text-muted mt-3 leading-relaxed">
            Ashish.sbs is not a portfolio. It&apos;s a living operating system — a public
            record of ventures, projects, experiments, and thinking as they happen. The
            Insights section captures conversations with experts who move things. The Lab
            documents work in progress. Monthly reviews hold me accountable.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            You can submit an idea for a public breakdown, book a strategy call, or simply
            read through the thinking. Everything here is open by design.
          </p>
          <div className="mt-6 flex gap-4">
            <LinkButton href="/ventures">See the ventures</LinkButton>
            <LinkButton href="/lab" variant="secondary">
              See what I&apos;m building
            </LinkButton>
          </div>
        </section>
      </Container>
    </>
  );
}
