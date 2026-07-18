import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

function SectionHead({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
      <h2 className="font-display text-[clamp(30px,4.5vw,54px)]">
        {index} / {title}
      </h2>
      <span className="font-meta text-muted text-[11px] uppercase">{aside}</span>
    </div>
  );
}

export default async function HomePage() {
  const [ventures, projects, labNotes, principles, resources, services] =
    await Promise.all([
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
      prisma.labNote.findMany({
        where: { contentStatus: "PUBLISHED" },
        take: 3,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.principle.findMany({
        where: { contentStatus: "PUBLISHED" },
        take: 4,
        orderBy: { createdAt: "asc" },
      }),
      prisma.resource.findMany({
        where: { contentStatus: "PUBLISHED" },
        take: 3,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.service.findMany({
        where: { contentStatus: "PUBLISHED" },
        take: 3,
        orderBy: { createdAt: "asc" },
      }),
    ]);

  const featured = projects[0];
  const restProjects = projects.length > 1 ? projects.slice(1) : projects;
  const today = new Date().toISOString().slice(0, 10).replaceAll("-", ".");
  const latestNote = labNotes[0];

  return (
    <>
      {/* Hero */}
      <section className="dot-grid border-border flex min-h-[82vh] flex-col justify-between border-b px-6 py-10 sm:px-10">
        <div className="font-meta text-muted flex justify-between text-[11px] uppercase">
          <span>Status: Building</span>
          <span className="hidden sm:inline">Last updated · {today}</span>
        </div>

        <div className="mx-auto w-full max-w-(--layout-max-width)">
          <span className="font-meta text-accent text-xs tracking-[0.15em] uppercase">
            {"// Currently building"}
          </span>
          <h1 className="font-display mt-4 text-[clamp(52px,10vw,140px)] leading-[0.88]">
            I build things
            <br />
            that have to <span className="text-accent">work.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#D9D2CF]">
            Savison Life — a compliance-gated pharma marketplace — is live below, along
            with what shipped alongside it. This is where I keep the record of what
            worked, what didn&apos;t, and what I&apos;m testing next.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ventures"
              className="font-grotesk bg-accent text-accent-foreground rounded-[4px] px-6 py-3.5 text-sm font-semibold"
            >
              See what I&apos;ve built
            </Link>
            <Link
              href="/strategy-call"
              className="font-grotesk border-muted rounded-[4px] border px-6 py-3.5 text-sm font-semibold"
            >
              Talk to me directly
            </Link>
          </div>
        </div>

        <div className="font-meta text-muted flex justify-between text-[11px] uppercase">
          <span>Keep scrolling ↓</span>
          <span>
            {ventures.length} ventures live · {projects.length} shipped ·{" "}
            {labNotes.length} notes
          </span>
        </div>
      </section>

      {/* 01 Ventures — credibility first */}
      {ventures.length > 0 ? (
        <section className="dot-grid border-border border-b px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-(--layout-max-width)">
            <SectionHead index="01" title="Ventures" aside="Live, running now" />
            <ul className="border-border border-t">
              {ventures.map((v, i) => (
                <li key={v.id}>
                  <Link
                    href={`/ventures/${v.slug}`}
                    className="border-border grid grid-cols-[40px_1fr_24px] items-center gap-4 border-b py-7 sm:grid-cols-[60px_1fr_140px_24px] sm:gap-6"
                  >
                    <span className="font-meta text-muted text-[13px]">{pad(i)}</span>
                    <span>
                      <span className="font-grotesk block text-xl font-semibold sm:text-2xl">
                        {v.name}
                      </span>
                      <span className="text-muted mt-1 block text-sm">{v.summary}</span>
                    </span>
                    <span className="font-meta text-accent hidden text-right text-[11px] uppercase sm:block">
                      {v.status.replaceAll("_", " ")}
                    </span>
                    <span className="text-muted text-lg">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Featured build spotlight */}
      {featured ? (
        <section className="border-border grid border-b lg:grid-cols-2">
          <div className="placeholder-stripes border-border flex aspect-square items-center justify-center lg:border-r">
            <span className="font-meta text-muted text-xs uppercase">
              [ {featured.title} ]
            </span>
          </div>
          <div className="dot-grid flex flex-col justify-center gap-5 px-6 py-16 sm:px-14">
            <span className="font-meta text-accent text-[11px] uppercase">
              {"// Latest build"} {featured.industry ? `— ${featured.industry}` : ""}
            </span>
            <h3 className="font-display text-[clamp(30px,4vw,52px)] leading-[0.95]">
              {featured.title}
            </h3>
            <p className="max-w-md leading-relaxed text-[#D9D2CF]">{featured.summary}</p>
            <Link
              href={`/projects/${featured.slug}`}
              className="font-grotesk border-accent w-fit border-b pb-1 text-sm font-semibold"
            >
              What actually happened ↗
            </Link>
          </div>
        </section>
      ) : null}

      {/* 02 Evidence (projects) */}
      {restProjects.length > 0 ? (
        <section className="dot-grid border-border border-b px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-(--layout-max-width)">
            <SectionHead index="02" title="Evidence" aside="What the ventures produced" />
            <ul className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {restProjects.map((p, i) => (
                <li key={p.id} className="flex">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="bg-muted-background flex min-h-[240px] w-full flex-col justify-between gap-12 p-8"
                  >
                    <span className="flex items-start justify-between">
                      <span className="font-meta text-muted text-[11px]">{pad(i)}</span>
                      <span className="font-meta text-muted border-muted rounded-full border px-2.5 py-1 text-[10px] uppercase">
                        {p.year ?? "—"}
                      </span>
                    </span>
                    <span>
                      <span className="font-grotesk block text-xl font-semibold">
                        {p.title}
                      </span>
                      <span className="text-muted mt-2 block text-sm leading-relaxed">
                        {p.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 03 Lab Notes — curiosity, after credibility is established */}
      {labNotes.length > 0 ? (
        <section className="os-light dot-grid-dark border-border border-b px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-(--layout-max-width)">
            <SectionHead index="03" title="What I'm Testing" aside="Working notes" />
            <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-[#2A2A2A]">
              Short, working notes — what I noticed, what I got wrong, what I&apos;m
              still checking.
            </p>
            <ul className="grid grid-cols-1 gap-px bg-black/15 sm:grid-cols-3">
              {labNotes.map((n) => (
                <li key={n.id} className="flex">
                  <Link
                    href={`/lab/${n.slug}`}
                    className="flex min-h-[200px] w-full flex-col justify-between gap-8 bg-[#E9DFDD] p-8"
                  >
                    <span className="font-meta text-accent text-[10px] uppercase">
                      {(n.publishedAt ?? n.createdAt).toISOString().slice(0, 10).replaceAll("-", ".")}
                    </span>
                    <span>
                      <span className="font-grotesk block text-lg leading-snug font-semibold">
                        {n.title}
                      </span>
                      {n.category ? (
                        <span className="text-muted mt-2 block text-sm">#{n.category}</span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {latestNote ? (
              <div className="mt-8">
                <Link
                  href={`/lab/${latestNote.slug}`}
                  className="font-grotesk border-b border-black/40 pb-1 text-sm font-semibold"
                >
                  Read the latest note ↗
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 04 What Changed My Mind — philosophy, last */}
      {principles.length > 0 ? (
        <section className="dot-grid border-border border-b px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-(--layout-max-width)">
            <SectionHead
              index="04"
              title="What Changed My Mind"
              aside="Held loosely, tested constantly"
            />
            <ul className="border-border border-t">
              {principles.map((pr, i) => (
                <li
                  key={pr.id}
                  className="border-border grid grid-cols-[60px_1fr] gap-6 border-b py-8 sm:grid-cols-[100px_1fr]"
                >
                  <span className="font-display text-accent text-3xl">{pad(i)}</span>
                  <div>
                    <Link
                      href={`/principles/${pr.slug}`}
                      className="font-grotesk text-xl font-semibold hover:underline"
                    >
                      {pr.title}
                    </Link>
                    <p className="text-muted mt-2 max-w-2xl leading-relaxed">
                      {pr.statement}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 05 Field Kit / 06 Services */}
      <section className="bg-border border-border grid grid-cols-1 gap-px border-b lg:grid-cols-2">
        <div className="dot-grid bg-background px-6 py-16 sm:px-10">
          <span className="font-meta text-accent text-[11px] uppercase">
            05 / Field Kit
          </span>
          <h3 className="font-display mt-4 mb-6 text-[clamp(24px,3vw,36px)]">
            Things I built along the way
          </h3>
          <div className="flex flex-col gap-4">
            {(resources.length > 0
              ? resources.map((r) => ({ href: `/resources/${r.slug}`, name: r.title }))
              : [{ href: "/resources", name: "See what's usable so far" }]
            ).map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="border-border font-grotesk flex justify-between border-b pb-3.5"
              >
                <span>{r.name}</span>
                <span className="text-muted">↗</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="dot-grid bg-accent px-6 py-16 sm:px-10">
          <span className="font-meta text-[11px] text-[#E9DFDD]/80 uppercase">
            06 / Services
          </span>
          <h3 className="font-display mt-4 mb-6 text-[clamp(24px,3vw,36px)] text-[#E9DFDD]">
            If you want help directly
          </h3>
          <div className="flex flex-col gap-4">
            {(services.length > 0
              ? services.map((s) => ({ href: `/services/${s.slug}`, name: s.name }))
              : [{ href: "/services", name: "See how I can help" }]
            ).map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="font-grotesk flex justify-between border-b border-[#E9DFDD]/25 pb-3.5 text-[#E9DFDD]"
              >
                <span>{s.name}</span>
                <span>↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
