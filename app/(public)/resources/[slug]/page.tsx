import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { getResourceBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) notFound();

  return (
    <>
      <PageHeader title={resource.title} description={resource.description ?? undefined} />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        {resource.downloadUrl ? (
          <a href={resource.downloadUrl} className="underline">
            Download
          </a>
        ) : null}
      </div>
    </>
  );
}
