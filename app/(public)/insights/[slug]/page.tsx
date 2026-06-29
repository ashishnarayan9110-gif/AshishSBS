import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getInsightBySlug } from "@/lib/content";
import { toEmbedUrl } from "@/lib/video";

export const dynamic = "force-dynamic";

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) notFound();

  const embedUrl = insight.videoUrl ? toEmbedUrl(insight.videoUrl) : null;

  return (
    <>
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/insights", label: "Insights" },
            { href: `/insights/${insight.slug}`, label: insight.title },
          ]}
        />
      </Container>
      <PageHeader
        title={insight.title}
        description={insight.guestName ? `With ${insight.guestName}` : undefined}
      />
      <Container width="content" className="space-y-8 pb-24">
        {embedUrl ? (
          <div className="aspect-video overflow-hidden rounded-lg">
            <iframe
              src={embedUrl}
              title={insight.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : insight.videoUrl ? (
          <a href={insight.videoUrl} className="underline">
            Watch the conversation →
          </a>
        ) : null}
        <p className="text-muted">{insight.summary}</p>
        {insight.body ? (
          <p className="text-muted whitespace-pre-wrap">{insight.body}</p>
        ) : null}
      </Container>
    </>
  );
}
