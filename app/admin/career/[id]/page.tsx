import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CareerEntryForm } from "@/features/admin/career-entry-form";
import { updateCareerEntry } from "@/features/admin/career-entry-actions";

export default async function EditCareerEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await prisma.careerEntry.findUnique({ where: { id } });

  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {entry.project}</h1>
      <div className="mt-8">
        <CareerEntryForm entry={entry} action={updateCareerEntry.bind(null, id)} />
      </div>
    </div>
  );
}
