import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getLabNoteBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LabNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getLabNoteBySlug(slug);

  if (!note) notFound();

  return (
    <>
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/lab", label: "Lab" },
            { href: `/lab/${note.slug}`, label: note.title },
          ]}
        />
      </Container>
      <PageHeader title={note.title} />
      <Container width="content" className="pb-24">
        <p className="text-muted whitespace-pre-wrap">{note.body}</p>
      </Container>
    </>
  );
}
