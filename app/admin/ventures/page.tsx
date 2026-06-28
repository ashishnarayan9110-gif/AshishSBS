import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteVenture } from "@/features/admin/venture-actions";

export default async function AdminVenturesPage() {
  const ventures = await prisma.venture.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Ventures</h1>
        <Link href="/admin/ventures/new">
          <Button>New Venture</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Name</th>
            <th className="py-2 font-medium">Status</th>
            <th className="py-2 font-medium">Content</th>
            <th className="py-2 font-medium">Featured</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {ventures.map((venture) => (
            <tr key={venture.id} className="border-border border-b">
              <td className="py-3">{venture.name}</td>
              <td className="text-muted py-3">{venture.status}</td>
              <td className="text-muted py-3">{venture.contentStatus}</td>
              <td className="text-muted py-3">{venture.featured ? "Yes" : "No"}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/ventures/${venture.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton
                  id={venture.id}
                  name={venture.name}
                  action={deleteVenture}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ventures.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No ventures yet.</p>
      ) : null}
    </div>
  );
}
