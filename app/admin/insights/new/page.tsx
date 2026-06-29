import { InsightForm } from "@/features/admin/insight-form";
import { createInsight } from "@/features/admin/insight-actions";

export default function NewInsightPage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Insight</h1>
      <div className="mt-8">
        <InsightForm action={createInsight} />
      </div>
    </div>
  );
}
