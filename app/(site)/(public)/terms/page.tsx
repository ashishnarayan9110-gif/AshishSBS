import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms" />
      <Container width="content" className="pb-24">
        <p className="text-muted">
          Content on this platform is published for documentation and educational
          purposes. It is provided as-is without warranty. Reuse with attribution is
          welcome; commercial redistribution requires permission.
        </p>
      </Container>
    </>
  );
}
