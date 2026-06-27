import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
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
      <PageHeader title={service.name} description={service.problem ?? undefined} />
      <div className="mx-auto max-w-(--content-max-width) space-y-8 px-6 pb-24">
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
        <Link href="/contact" className="underline">
          Start a conversation
        </Link>
      </div>
    </>
  );
}
