import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { LinkCard } from "@/components/ui/card";
import { VentureStatusBadge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredVentures, principles, services] = await Promise.all([
    prisma.venture.findMany({
      where: { contentStatus: "PUBLISHED", featured: true },
      take: 4,
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
        <p className="text-muted text-sm">Systems Designer</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          I design systems that help businesses operate with greater clarity,
          trust and efficiency.
        </h1>
        <p className="text-muted mt-6 text-lg">
          This platform documents ventures, projects and research as they
          happen — not a portfolio, a living operating system.
        </p>
        <div className="mt-8 flex gap-4">
          <LinkButton href="/about">Read the philosophy</LinkButton>
          <LinkButton href="/ventures" variant="secondary">
            See current ventures
          </LinkButton>
        </div>
      </Container>

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

      {/* Contact CTA */}
      <Container width="content" className="pb-24 text-center">
        <p className="text-lg font-medium">Have a problem worth discussing?</p>
        <div className="mt-6">
          <LinkButton href="/contact">Start a conversation</LinkButton>
        </div>
      </Container>
    </>
  );
}
