import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deletePrinciple } from "@/features/admin/principle-actions";

export const dynamic = "force-dynamic";

export default async function AdminPrinciplesPage() {
  const principles = await prisma.principle.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Principles</h1>
        <Link href="/admin/principles/new">
          <Button>New Principle</Button>
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
          {principles.map((principle) => (
            <tr key={principle.id} className="border-border border-b">
              <td className="py-3">{principle.title}</td>
              <td className="text-muted py-3">{principle.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/principles/${principle.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton
                  id={principle.id}
                  name={principle.title}
                  action={deletePrinciple}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {principles.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No principles yet.</p>
      ) : null}
    </div>
  );
}
