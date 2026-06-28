import { VentureForm } from "@/features/admin/venture-form";
import { createVenture } from "@/features/admin/venture-actions";

export default function NewVenturePage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Venture</h1>
      <div className="mt-8">
        <VentureForm action={createVenture} />
      </div>
    </div>
  );
}
