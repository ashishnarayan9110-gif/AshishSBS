import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
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
      <PageHeader title={project.title} description={project.summary} />
      <div className="mx-auto max-w-(--content-max-width) space-y-8 px-6 pb-24">
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
      </div>
    </>
  );
}
