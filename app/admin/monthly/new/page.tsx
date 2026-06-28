import { MonthlyReviewForm } from "@/features/admin/monthly-review-form";
import { createMonthlyReview } from "@/features/admin/monthly-review-actions";

export default function NewMonthlyReviewPage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Monthly Review</h1>
      <div className="mt-8">
        <MonthlyReviewForm action={createMonthlyReview} />
      </div>
    </div>
  );
}
