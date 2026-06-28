import { ServiceForm } from "@/features/admin/service-form";
import { createService } from "@/features/admin/service-actions";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Service</h1>
      <div className="mt-8">
        <ServiceForm action={createService} />
      </div>
    </div>
  );
}
