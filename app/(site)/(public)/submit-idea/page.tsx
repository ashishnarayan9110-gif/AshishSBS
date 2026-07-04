import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { IdeaForm } from "@/features/submit-idea/idea-form";

export default function SubmitIdeaPage() {
  return (
    <>
      <PageHeader
        title="Submit Your Idea for Public Breakdown"
        description="Selected submissions will be featured in public videos. This is not 1-on-1 mentoring — for that, see the strategy call."
      />
      <Container width="content" className="pb-24">
        <IdeaForm />
      </Container>
    </>
  );
}
