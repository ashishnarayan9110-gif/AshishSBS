import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
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
      <div className="mx-auto max-w-(--layout-max-width) px-6 pb-24">
        {services.length === 0 ? (
          <EmptyState
            title="No services published yet."
            description="Services appear here once documented in the CMS."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.id} className="border-border rounded-lg border p-6">
                <Link href={`/services/${service.slug}`} className="font-medium">
                  {service.name}
                </Link>
                {service.problem ? (
                  <p className="text-muted mt-2 text-sm">{service.problem}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
