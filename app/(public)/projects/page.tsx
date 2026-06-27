import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
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
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        {projects.length === 0 ? (
          <EmptyState
            title="No projects published yet."
            description="Projects appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.id} className="border-border rounded-lg border p-6">
                <Link href={`/projects/${project.slug}`} className="font-medium">
                  {project.title}
                </Link>
                <p className="text-muted mt-2 text-sm">{project.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
