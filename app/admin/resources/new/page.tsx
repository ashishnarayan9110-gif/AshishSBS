import { ResourceForm } from "@/features/admin/resource-form";
import { createResource } from "@/features/admin/resource-actions";

export default function NewResourcePage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Resource</h1>
      <div className="mt-8">
        <ResourceForm action={createResource} />
      </div>
    </div>
  );
}
