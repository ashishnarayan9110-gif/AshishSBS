import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/features/admin/service-form";
import { updateService } from "@/features/admin/service-actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {service.name}</h1>
      <div className="mt-8">
        <ServiceForm service={service} action={updateService.bind(null, id)} />
      </div>
    </div>
  );
}
