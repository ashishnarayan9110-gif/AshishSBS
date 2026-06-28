import { PrincipleForm } from "@/features/admin/principle-form";
import { createPrinciple } from "@/features/admin/principle-actions";

export default function NewPrinciplePage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Principle</h1>
      <div className="mt-8">
        <PrincipleForm action={createPrinciple} />
      </div>
    </div>
  );
}
