import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteInsight } from "@/features/admin/insight-actions";

export const dynamic = "force-dynamic";

export default async function AdminInsightsPage() {
  const insights = await prisma.insight.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Insights</h1>
        <Link href="/admin/insights/new">
          <Button>New Insight</Button>
        </Link>
      </div>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Title</th>
            <th className="py-2 font-medium">Guest</th>
            <th className="py-2 font-medium">Content</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight) => (
            <tr key={insight.id} className="border-border border-b">
              <td className="py-3">{insight.title}</td>
              <td className="text-muted py-3">{insight.guestName ?? "—"}</td>
              <td className="text-muted py-3">{insight.contentStatus}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/insights/${insight.id}`} className="underline">
                  Edit
                </Link>
                <DeleteButton
                  id={insight.id}
                  name={insight.title}
                  action={deleteInsight}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {insights.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No insights yet.</p>
      ) : null}
    </div>
  );
}
