import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MonthlyReviewForm } from "@/features/admin/monthly-review-form";
import { updateMonthlyReview } from "@/features/admin/monthly-review-actions";

export default async function EditMonthlyReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await prisma.monthlyReview.findUnique({ where: { id } });

  if (!review) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">
        Edit {review.month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h1>
      <div className="mt-8">
        <MonthlyReviewForm review={review} action={updateMonthlyReview.bind(null, id)} />
      </div>
    </div>
  );
}
