import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/features/contact/contact-form";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="The beginning of a conversation — not a lead form."
      />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        <ContactForm />
      </div>
    </>
  );
}
