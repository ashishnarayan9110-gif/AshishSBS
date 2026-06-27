import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { getMonthlyReviewBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function MonthlyReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getMonthlyReviewBySlug(slug);

  if (!review) notFound();

  const title = review.month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader title={title} />
      <div className="mx-auto max-w-(--content-max-width) space-y-8 px-6 pb-24">
        {review.whatIBuilt ? (
          <section>
            <h2 className="font-medium">What I Built</h2>
            <p className="text-muted mt-2">{review.whatIBuilt}</p>
          </section>
        ) : null}
        {review.whatILearned ? (
          <section>
            <h2 className="font-medium">What I Learned</h2>
            <p className="text-muted mt-2">{review.whatILearned}</p>
          </section>
        ) : null}
        {review.failures ? (
          <section>
            <h2 className="font-medium">Failures</h2>
            <p className="text-muted mt-2">{review.failures}</p>
          </section>
        ) : null}
        {review.nextMonth ? (
          <section>
            <h2 className="font-medium">Next Month</h2>
            <p className="text-muted mt-2">{review.nextMonth}</p>
          </section>
        ) : null}
      </div>
    </>
  );
}
