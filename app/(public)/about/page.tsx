import { PageHeader } from "@/components/shared/page-header";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" description="How I think, not just what I've built." />
      <div className="mx-auto max-w-(--content-max-width) space-y-8 px-6 pb-24">
        <section>
          <h2 className="font-medium">Mission</h2>
          <p className="text-muted mt-2">
            To design systems that help people and businesses operate with
            greater clarity, trust and efficiency.
          </p>
        </section>
        <section>
          <h2 className="font-medium">Systems Designer</h2>
          <p className="text-muted mt-2">
            A Systems Designer studies complexity and replaces it with
            clarity. The output may be software, a marketplace, a document,
            or a company — the discipline remains the same.
          </p>
        </section>
      </div>
    </>
  );
}
