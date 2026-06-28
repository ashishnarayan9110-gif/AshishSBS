import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VentureForm } from "@/features/admin/venture-form";
import { updateVenture } from "@/features/admin/venture-actions";

export default async function EditVenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venture = await prisma.venture.findUnique({ where: { id } });

  if (!venture) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {venture.name}</h1>
      <div className="mt-8">
        <VentureForm venture={venture} action={updateVenture.bind(null, id)} />
      </div>
    </div>
  );
}
