import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteResource } from "@/features/admin/resource-actions";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Resources</h1>
        <Link href="/admin/resources/new">
          <Button>New Resource</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Title</th>
            <th className="py-2 font-medium">Content</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id} className="border-border border-b">
              <td className="py-3">{resource.title}</td>
              <td className="text-muted py-3">{resource.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/resources/${resource.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton
                  id={resource.id}
                  name={resource.title}
                  action={deleteResource}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {resources.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No resources yet.</p>
      ) : null}
    </div>
  );
}
