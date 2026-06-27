import { PageHeader } from "@/components/shared/page-header";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <div className="mx-auto max-w-(--content-max-width) px-6 pb-24">
        <p className="text-muted">
          This platform collects only the information necessary to respond to
          contact form submissions: name, email, reason and message. No
          account is required to browse. Analytics, where enabled, prioritizes
          aggregate, privacy-respecting measurement over individual tracking.
          Submitted information is never sold.
        </p>
      </div>
    </>
  );
}
