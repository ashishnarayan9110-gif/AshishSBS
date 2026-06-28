import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/features/admin/project-form";
import { createProject } from "@/features/admin/project-actions";

export default async function NewProjectPage() {
  const ventures = await prisma.venture.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Project</h1>
      <div className="mt-8">
        <ProjectForm ventures={ventures} action={createProject} />
      </div>
    </div>
  );
}
