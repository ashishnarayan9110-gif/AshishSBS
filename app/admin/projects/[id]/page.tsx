import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/features/admin/project-form";
import { updateProject } from "@/features/admin/project-actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, ventures, people] = await Promise.all([
    prisma.project.findUnique({ where: { id }, include: { crew: true } }),
    prisma.venture.findMany({ orderBy: { name: "asc" } }),
    prisma.person.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {project.title}</h1>
      <div className="mt-8">
        <ProjectForm
          project={project}
          ventures={ventures}
          people={people}
          crewIds={project.crew.map((c) => c.personId)}
          action={updateProject.bind(null, id)}
        />
      </div>
    </div>
  );
}
