import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        description="Work with a beginning and an end — process, deliverables and lessons."
      />
      <Container className="pb-24">
        {projects.length === 0 ? (
          <EmptyState
            title="No projects published yet."
            description="Projects appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.id}>
                <LinkCard href={`/projects/${project.slug}`}>
                  <span className="font-medium">{project.title}</span>
                  <p className="text-muted mt-2 text-sm">{project.summary}</p>
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
