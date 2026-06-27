import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { getVentureBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function VentureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = await getVentureBySlug(slug);

  if (!venture) notFound();

  return (
    <>
      <PageHeader title={venture.name} description={venture.summary} />
      <div className="mx-auto max-w-(--content-max-width) space-y-8 px-6 pb-24">
        {venture.problem ? (
          <section>
            <h2 className="font-medium">Problem</h2>
            <p className="text-muted mt-2">{venture.problem}</p>
          </section>
        ) : null}
        {venture.solution ? (
          <section>
            <h2 className="font-medium">Solution</h2>
            <p className="text-muted mt-2">{venture.solution}</p>
          </section>
        ) : null}
        {venture.lessons.length > 0 ? (
          <section>
            <h2 className="font-medium">Lessons</h2>
            <ul className="text-muted mt-2 list-disc space-y-1 pl-5">
              {venture.lessons.map((lesson) => (
                <li key={lesson.id}>{lesson.text}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
