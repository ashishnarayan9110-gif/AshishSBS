import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { getPrincipleBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PrincipleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const principle = await getPrincipleBySlug(slug);

  if (!principle) notFound();

  return (
    <>
      <PageHeader title={principle.title} description={principle.statement} />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        {principle.explanation ? (
          <p className="text-muted">{principle.explanation}</p>
        ) : null}
      </div>
    </>
  );
}
