import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PersonForm } from "@/features/admin/person-form";
import { updatePerson } from "@/features/admin/person-actions";

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = await prisma.person.findUnique({ where: { id } });

  if (!person) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {person.name}</h1>
      <div className="mt-8">
        <PersonForm person={person} action={updatePerson.bind(null, id)} />
      </div>
    </div>
  );
}
