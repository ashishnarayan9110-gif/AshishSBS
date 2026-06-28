import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getProjectBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/projects", label: "Projects" },
            { href: `/projects/${project.slug}`, label: project.title },
          ]}
        />
      </Container>
      <PageHeader title={project.title} description={project.summary} />
      <Container width="content" className="space-y-8 pb-24">
        {project.background ? (
          <section>
            <h2 className="font-medium">Background</h2>
            <p className="text-muted mt-2">{project.background}</p>
          </section>
        ) : null}
        {project.process ? (
          <section>
            <h2 className="font-medium">Process</h2>
            <p className="text-muted mt-2">{project.process}</p>
          </section>
        ) : null}
        {project.outcome ? (
          <section>
            <h2 className="font-medium">Outcome</h2>
            <p className="text-muted mt-2">{project.outcome}</p>
          </section>
        ) : null}
        {project.lessons.length > 0 ? (
          <section>
            <h2 className="font-medium">Lessons</h2>
            <ul className="text-muted mt-2 list-disc space-y-1 pl-5">
              {project.lessons.map((lesson) => (
                <li key={lesson.id}>{lesson.text}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
}
