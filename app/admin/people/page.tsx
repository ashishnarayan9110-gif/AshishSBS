import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deletePerson } from "@/features/admin/person-actions";

export const dynamic = "force-dynamic";

export default async function AdminPeoplePage() {
  const people = await prisma.person.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">People</h1>
        <Link href="/admin/people/new">
          <Button>New Person</Button>
        </Link>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="border-border mt-8 w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2 font-medium">Name</th>
              <th className="py-2 font-medium">Alias</th>
              <th className="py-2 font-medium">Role</th>
              <th className="py-2 font-medium">Content</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} className="border-border border-b">
                <td className="py-3">{person.name}</td>
                <td className="text-muted py-3">{person.alias ?? "—"}</td>
                <td className="text-muted py-3">{person.role ?? "—"}</td>
                <td className="text-muted py-3">{person.contentStatus}</td>
                <td className="py-3 text-right">
                  <Link href={`/admin/people/${person.id}`} className="underline">
                    Edit
                  </Link>
                  <DeleteButton
                    id={person.id}
                    name={person.name}
                    action={deletePerson}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {people.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No people yet.</p>
      ) : null}
    </div>
  );
}
