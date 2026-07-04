import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank You — Enquiry Received",
  robots: { index: false },
};

export default function RealtyThankYouPage() {
  return (
    <Container width="content" className="py-24 text-center">
      <p className="text-muted text-sm">Enquiry Received</p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight">
        Thank you for your interest.
      </h1>
      <p className="text-muted mt-6 leading-relaxed">
        I&apos;ll personally review your enquiry and get back to you shortly.
        You can expect a response within one business day.
      </p>
      <p className="text-muted mt-3 text-sm">
        This property is shown by appointment only.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <LinkButton href="/">Back to Realty</LinkButton>
        <LinkButton href="https://ashish.sbs" variant="secondary">
          Visit ashish.sbs
        </LinkButton>
      </div>
    </Container>
  );
}
