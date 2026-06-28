import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ResourceForm } from "@/features/admin/resource-form";
import { updateResource } from "@/features/admin/resource-actions";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await prisma.resource.findUnique({ where: { id } });

  if (!resource) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {resource.title}</h1>
      <div className="mt-8">
        <ResourceForm resource={resource} action={updateResource.bind(null, id)} />
      </div>
    </div>
  );
}
