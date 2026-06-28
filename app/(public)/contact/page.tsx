import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/features/contact/contact-form";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="The beginning of a conversation — not a lead form."
      />
      <Container width="content" className="pb-24">
        <ContactForm />
      </Container>
    </>
  );
}
