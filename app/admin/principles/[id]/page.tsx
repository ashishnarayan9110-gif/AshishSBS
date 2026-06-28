import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PrincipleForm } from "@/features/admin/principle-form";
import { updatePrinciple } from "@/features/admin/principle-actions";

export default async function EditPrinciplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const principle = await prisma.principle.findUnique({ where: { id } });

  if (!principle) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {principle.title}</h1>
      <div className="mt-8">
        <PrincipleForm principle={principle} action={updatePrinciple.bind(null, id)} />
      </div>
    </div>
  );
}
