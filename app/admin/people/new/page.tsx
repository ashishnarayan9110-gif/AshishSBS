import { PersonForm } from "@/features/admin/person-form";
import { createPerson } from "@/features/admin/person-actions";

export default function NewPersonPage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Person</h1>
      <div className="mt-8">
        <PersonForm action={createPerson} />
      </div>
    </div>
  );
}
