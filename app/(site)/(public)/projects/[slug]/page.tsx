import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const nextProject = await prisma.project.findFirst({
    where: { contentStatus: "PUBLISHED", slug: { not: project.slug } },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true },
  });

  const facts = [
    { label: "INDUSTRY", value: project.industry ?? "—" },
    { label: "YEAR", value: project.year ? String(project.year) : "—" },
    { label: "STACK", value: project.technology ?? "—" },
    { label: "CURRENT STATE", value: "Live — still watching it" },
  ];

  const body = [
    { label: "Why this exists", text: project.background },
    { label: "What actually happened", text: project.process },
    { label: "Where it stands now", text: project.outcome },
  ].filter((b): b is { label: string; text: string } => Boolean(b.text));

  return (
    <>
      {/* Header */}
      <div className="dot-grid border-border border-b px-6 pt-16 pb-12 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <div className="font-meta text-muted mb-7 flex justify-between text-[11px] uppercase">
            <Link href="/projects" className="hover:text-foreground">
              ← Back to the archive
            </Link>
            <span className="text-accent">● Evidence entry</span>
          </div>
          <h1 className="font-display text-[clamp(44px,8vw,110px)] leading-[0.9]">
            {project.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#D9D2CF]">
            {project.summary}
          </p>

          <div className="bg-border mt-12 grid grid-cols-2 gap-px lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-background px-4 pt-6 pb-4">
                <div className="font-meta text-muted text-[10px] uppercase">{f.label}</div>
                <div className="font-grotesk mt-2 text-base font-semibold break-words sm:text-lg">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="dot-grid border-border border-b px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-(--layout-max-width) gap-10 lg:grid-cols-[220px_1fr]">
          <div className="font-meta text-accent text-[11px] uppercase">
            {"// The record"}
          </div>
          <div className="max-w-2xl space-y-10">
            {body.map((b) => (
              <div key={b.label}>
                <div className="font-meta text-muted mb-2 text-[11px] uppercase">
                  {b.label}
                </div>
                <p className="text-lg leading-relaxed text-[#D9D2CF]">{b.text}</p>
              </div>
            ))}
            {project.lessons.length > 0 ? (
              <div className="border-border mt-10 border-t pt-8">
                <div className="font-meta text-accent mb-5 text-[11px] uppercase">
                  {"// What I'd do differently now"}
                </div>
                <ul className="space-y-4">
                  {project.lessons.map((lesson, i) => (
                    <li key={lesson.id} className="flex gap-4">
                      <span className="font-meta text-muted text-[13px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed text-[#D9D2CF]">{lesson.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Next project */}
      {nextProject ? (
        <div className="dot-grid px-6 py-20 sm:px-10">
          <div className="mx-auto flex max-w-(--layout-max-width) flex-col gap-5">
            <span className="font-meta text-muted text-[11px] uppercase">
              Keep reading
            </span>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="border-border flex items-baseline justify-between gap-6 border-b pb-8"
            >
              <span className="font-display text-[clamp(28px,5vw,60px)] leading-none">
                {nextProject.title}
              </span>
              <span className="text-accent text-2xl">↗</span>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
