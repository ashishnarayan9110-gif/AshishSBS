import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteMonthlyReview } from "@/features/admin/monthly-review-actions";

export const dynamic = "force-dynamic";

export default async function AdminMonthlyReviewsPage() {
  const reviews = await prisma.monthlyReview.findMany({ orderBy: { month: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Monthly Builder Review</h1>
        <Link href="/admin/monthly/new">
          <Button>New Review</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Month</th>
            <th className="py-2 font-medium">Content</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="border-border border-b">
              <td className="py-3">
                {review.month.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="text-muted py-3">{review.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/monthly/${review.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton
                  id={review.id}
                  name={review.month.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                  action={deleteMonthlyReview}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviews.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No reviews yet.</p>
      ) : null}
    </div>
  );
}
