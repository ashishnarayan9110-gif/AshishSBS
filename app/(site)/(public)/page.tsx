import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { LinkCard } from "@/components/ui/card";
import { VentureStatusBadge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredVentures, featuredProjects, principles, services] = await Promise.all([
    prisma.venture.findMany({
      where: { contentStatus: "PUBLISHED", featured: true },
      take: 4,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.project.findMany({
      where: { contentStatus: "PUBLISHED", featured: true },
      take: 6,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.principle.findMany({
      where: { contentStatus: "PUBLISHED" },
      take: 4,
      orderBy: { createdAt: "asc" },
    }),
    prisma.service.findMany({
      where: { contentStatus: "PUBLISHED" },
      take: 4,
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <Container width="content" className="py-24">
        <p className="text-muted text-sm">Systems Over Chaos</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          I help first-time founders launch properly — with clean systems, real compliance,
          and clear positioning.
        </h1>
        <p className="text-muted mt-6 text-lg">
          I built Savison Life from zero. Now I help founders avoid the operational chaos
          that kills good ideas before they can scale. No hype, no fluff — just systems
          that work.
        </p>
        <div className="mt-8 flex gap-4">
          <LinkButton href="/strategy-call">Book a strategy call</LinkButton>
          <LinkButton href="/about" variant="secondary">
            Read the philosophy
          </LinkButton>
        </div>
      </Container>

      {/* Featured Projects */}
      {featuredProjects.length > 0 ? (
        <Container className="pb-20">
          <h2 className="text-muted text-xs font-medium tracking-wide uppercase">
            Projects
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <LinkCard href={`/projects/${project.slug}`}>
                  <span className="font-medium">{project.title}</span>
                  <p className="text-muted mt-2 text-sm">{project.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Featured Ventures */}
      {featuredVentures.length > 0 ? (
        <Container className="pb-20">
          <h2 className="text-muted text-xs font-medium tracking-wide uppercase">
            Selected Ventures
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featuredVentures.map((venture) => (
              <li key={venture.id}>
                <LinkCard href={`/ventures/${venture.slug}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium">{venture.name}</span>
                    <VentureStatusBadge status={venture.status} />
                  </div>
                  <p className="text-muted mt-2 text-sm">{venture.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Labs CTA — building in public */}
      <Container className="pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border-border rounded-lg border p-8">
            <p className="font-medium">Ashish Labs</p>
            <p className="text-muted mt-2 text-sm">
              Projects I&apos;m currently working on. Some finished, many unfinished. All
              open for collaboration.
            </p>
            <div className="mt-4">
              <LinkButton href="/lab" variant="secondary">
                See what I&apos;m building →
              </LinkButton>
            </div>
          </div>
          <div className="border-border rounded-lg border p-8">
            <p className="font-medium">Insights</p>
            <p className="text-muted mt-2 text-sm">
              Real conversations with people who actually move things. No hype — sharp,
              high-signal discussions with operators, experts, and builders.
            </p>
            <div className="mt-4">
              <LinkButton href="/insights" variant="secondary">
                Watch the conversations →
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>

      {/* Principles Snapshot */}
      {principles.length > 0 ? (
        <Container className="pb-20">
          <h2 className="text-muted text-xs font-medium tracking-wide uppercase">
            Principles
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <li key={principle.id}>
                <LinkCard href={`/principles/${principle.slug}`}>
                  <p className="font-medium">{principle.title}</p>
                  <p className="text-muted mt-2 text-sm">{principle.statement}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Services Preview */}
      {services.length > 0 ? (
        <Container className="pb-20">
          <h2 className="text-muted text-xs font-medium tracking-wide uppercase">
            Services
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id}>
                <LinkCard href={`/services/${service.slug}`}>
                  <p className="font-medium">{service.name}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Bottom CTAs */}
      <Container width="content" className="pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border-border rounded-lg border p-6 text-center">
            <p className="font-medium">Submit your idea</p>
            <p className="text-muted mt-2 text-sm">
              Share your business idea. Selected submissions get a public breakdown video.
            </p>
            <div className="mt-4">
              <LinkButton href="/submit-idea" variant="secondary">
                Submit for breakdown →
              </LinkButton>
            </div>
          </div>
          <div className="border-border rounded-lg border p-6 text-center">
            <p className="font-medium">20-Minute Strategy Call — ₹1,499</p>
            <p className="text-muted mt-2 text-sm">
              A high-signal call for serious founders. Come with a specific question.
            </p>
            <div className="mt-4">
              <LinkButton href="/strategy-call">Book the call →</LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
