import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/services", label: "Services" },
            { href: `/services/${service.slug}`, label: service.name },
          ]}
        />
      </Container>
      <PageHeader title={service.name} description={service.problem ?? undefined} />
      <Container width="content" className="space-y-8 pb-24">
        {service.idealClient ? (
          <section>
            <h2 className="font-medium">Ideal Client</h2>
            <p className="text-muted mt-2">{service.idealClient}</p>
          </section>
        ) : null}
        {service.approach ? (
          <section>
            <h2 className="font-medium">Approach</h2>
            <p className="text-muted mt-2">{service.approach}</p>
          </section>
        ) : null}
        {service.deliverables ? (
          <section>
            <h2 className="font-medium">Deliverables</h2>
            <p className="text-muted mt-2">{service.deliverables}</p>
          </section>
        ) : null}
        <LinkButton href="/contact">Start a conversation</LinkButton>
      </Container>
    </>
  );
}
