import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/ui/container";
import { LinkCard } from "@/components/ui/card";
import { getServices } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        title="Services"
        description="Professional offerings for problems that cannot yet be automated."
      />
      <Container className="pb-24">
        {services.length === 0 ? (
          <EmptyState
            title="No services published yet."
            description="Services appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.id}>
                <LinkCard href={`/services/${service.slug}`}>
                  <span className="font-medium">{service.name}</span>
                  {service.problem ? (
                    <p className="text-muted mt-2 text-sm">{service.problem}</p>
                  ) : null}
                </LinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
