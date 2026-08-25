import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CertificationForm } from "@/features/admin/certification-form";
import { updateCertification } from "@/features/admin/certification-actions";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certification = await prisma.certification.findUnique({ where: { id } });

  if (!certification) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {certification.title}</h1>
      <div className="mt-8">
        <CertificationForm
          certification={certification}
          action={updateCertification.bind(null, id)}
        />
      </div>
    </div>
  );
}
