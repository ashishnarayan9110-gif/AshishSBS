import { CertificationForm } from "@/features/admin/certification-form";
import { createCertification } from "@/features/admin/certification-actions";

export default function NewCertificationPage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">New Certification</h1>
      <div className="mt-8">
        <CertificationForm action={createCertification} />
      </div>
    </div>
  );
}
