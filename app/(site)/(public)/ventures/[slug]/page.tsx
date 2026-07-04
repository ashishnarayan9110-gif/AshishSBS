import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
import { VentureStatusBadge } from "@/components/ui/badge";
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
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/ventures", label: "Ventures" },
            { href: `/ventures/${venture.slug}`, label: venture.name },
          ]}
        />
      </Container>
      <PageHeader
        title={venture.name}
        description={venture.summary}
        badge={<VentureStatusBadge status={venture.status} />}
      />
      <Container width="content" className="space-y-8 pb-24">
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
        {venture.currentStage ? (
          <section>
            <h2 className="font-medium">Current Status</h2>
            <p className="text-muted mt-2">{venture.currentStage}</p>
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
      </Container>
    </>
  );
}
