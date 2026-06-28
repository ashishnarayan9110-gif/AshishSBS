import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteProject } from "@/features/admin/project-actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { venture: true },
  });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Title</th>
            <th className="py-2 font-medium">Venture</th>
            <th className="py-2 font-medium">Content</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-border border-b">
              <td className="py-3">{project.title}</td>
              <td className="text-muted py-3">{project.venture?.name ?? "—"}</td>
              <td className="text-muted py-3">{project.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/projects/${project.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton
                  id={project.id}
                  name={project.title}
                  action={deleteProject}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No projects yet.</p>
      ) : null}
    </div>
  );
}
