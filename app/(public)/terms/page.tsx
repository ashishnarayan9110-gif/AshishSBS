import { PageHeader } from "@/components/shared/page-header";

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms" />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        <p className="text-muted">
          Content on this platform is published for documentation and
          educational purposes. It is provided as-is without warranty.
          Reuse with attribution is welcome; commercial redistribution
          requires permission.
        </p>
      </div>
    </>
  );
}
