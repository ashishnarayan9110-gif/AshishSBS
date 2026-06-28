import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
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
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/principles", label: "Principles" },
            { href: `/principles/${principle.slug}`, label: principle.title },
          ]}
        />
      </Container>
      <PageHeader title={principle.title} description={principle.statement} />
      <Container width="content" className="pb-24">
        {principle.explanation ? <p className="text-muted">{principle.explanation}</p> : null}
      </Container>
    </>
  );
}
