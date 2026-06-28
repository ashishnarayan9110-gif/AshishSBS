import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteService } from "@/features/admin/service-actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Services</h1>
        <Link href="/admin/services/new">
          <Button>New Service</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Name</th>
            <th className="py-2 font-medium">Content</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-border border-b">
              <td className="py-3">{service.name}</td>
              <td className="text-muted py-3">{service.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/services/${service.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton id={service.id} name={service.name} action={deleteService} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {services.length === 0 ? <p className="text-muted mt-8 text-sm">No services yet.</p> : null}
    </div>
  );
}
