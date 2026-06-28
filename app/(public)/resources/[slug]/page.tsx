import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
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
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/resources", label: "Resources" },
            { href: `/resources/${resource.slug}`, label: resource.title },
          ]}
        />
      </Container>
      <PageHeader
        title={resource.title}
        description={resource.description ?? undefined}
      />
      <Container width="content" className="pb-24">
        {resource.downloadUrl ? (
          <LinkButton href={resource.downloadUrl} variant="secondary">
            Download
          </LinkButton>
        ) : null}
      </Container>
    </>
  );
}
