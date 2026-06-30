import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        description="Systems Over Chaos — how I think, build, and operate."
      />
      <Container width="content" className="space-y-12 pb-24">
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
        <section>
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
        </section>

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
