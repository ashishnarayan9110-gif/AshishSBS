import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteLabNote } from "@/features/admin/lab-note-actions";

export const dynamic = "force-dynamic";

export default async function AdminLabNotesPage() {
  const notes = await prisma.labNote.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Lab Notes</h1>
        <Link href="/admin/lab/new">
          <Button>New Lab Note</Button>
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
          {notes.map((note) => (
            <tr key={note.id} className="border-border border-b">
              <td className="py-3">{note.title}</td>
              <td className="text-muted py-3">{note.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/lab/${note.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton id={note.id} name={note.title} action={deleteLabNote} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {notes.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No lab notes yet.</p>
      ) : null}
    </div>
  );
}
