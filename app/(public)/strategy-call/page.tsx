import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { BookingForm } from "@/features/strategy-call/booking-form";

export default function StrategyCallPage() {
  return (
    <>
      <PageHeader
        title="20-Minute Strategy Call — ₹1,499"
        description="High-signal calls for serious founders. Best suited for registration, compliance, branding, go-to-market, or systems-related challenges. Come prepared with a specific question."
      />
      <Container width="content" className="pb-24">
        <BookingForm />
      </Container>
    </>
  );
}
