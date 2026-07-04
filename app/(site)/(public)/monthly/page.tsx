import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { getMonthlyReviews } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function MonthlyReviewsPage() {
  const reviews = await getMonthlyReviews();

  return (
    <>
      <PageHeader
        title="Monthly Builder Review"
        description="A public progress log — what was built, what was learned, what failed."
      />
      <Container className="pb-24">
        {reviews.length === 0 ? (
          <EmptyState
            title="No reviews published yet."
            description="The first review appears here once published in the CMS."
          />
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border-border border-b pb-4">
                <Link
                  href={`/monthly/${review.slug}`}
                  className="font-medium hover:underline"
                >
                  {review.month.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
