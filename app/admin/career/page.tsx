import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteCareerEntry } from "@/features/admin/career-entry-actions";

export default async function AdminCareerPage() {
  const entries = await prisma.careerEntry.findMany({ orderBy: { startDate: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Career Archive</h1>
        <Link href="/admin/career/new">
          <Button>New Entry</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Project</th>
            <th className="py-2 font-medium">Organisation</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-border border-b">
              <td className="py-3">{entry.project}</td>
              <td className="text-muted py-3">{entry.organisation}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/career/${entry.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton id={entry.id} name={entry.project} action={deleteCareerEntry} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {entries.length === 0 ? <p className="text-muted mt-8 text-sm">No entries yet.</p> : null}
    </div>
  );
}
