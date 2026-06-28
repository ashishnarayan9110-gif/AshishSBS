import { CareerEntryForm } from "@/features/admin/career-entry-form";
import { createCareerEntry } from "@/features/admin/career-entry-actions";

export default function NewCareerEntryPage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Career Entry</h1>
      <div className="mt-8">
        <CareerEntryForm action={createCareerEntry} />
      </div>
    </div>
  );
}
