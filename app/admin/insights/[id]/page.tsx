import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { InsightForm } from "@/features/admin/insight-form";
import { updateInsight } from "@/features/admin/insight-actions";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const insight = await prisma.insight.findUnique({ where: { id } });

  if (!insight) notFound();

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Edit {insight.title}</h1>
      <div className="mt-8">
        <InsightForm insight={insight} action={updateInsight.bind(null, id)} />
      </div>
    </div>
  );
}
