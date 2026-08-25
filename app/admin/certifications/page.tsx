import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteCertification } from "@/features/admin/certification-actions";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Certifications</h1>
        <Link href="/admin/certifications/new">
          <Button>New Certification</Button>
        </Link>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="border-border mt-8 w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2 font-medium">Title</th>
              <th className="py-2 font-medium">Issuer</th>
              <th className="py-2 font-medium">Issued</th>
              <th className="py-2 font-medium">Content</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((certification) => (
              <tr key={certification.id} className="border-border border-b">
                <td className="py-3">{certification.title}</td>
                <td className="text-muted py-3">{certification.issuer}</td>
                <td className="text-muted py-3">
                  {certification.issuedAt
                    ? certification.issuedAt.toISOString().slice(0, 10)
                    : "—"}
                </td>
                <td className="text-muted py-3">{certification.contentStatus}</td>
                <td className="py-3 text-right">
                  <Link
                    href={`/admin/certifications/${certification.id}`}
                    className="underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    id={certification.id}
                    name={certification.title}
                    action={deleteCertification}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {certifications.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No certifications yet.</p>
      ) : null}
    </div>
  );
}
