import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteContactSubmission } from "@/features/admin/contact-submission-actions";

export default async function AdminContactSubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Contact Submissions</h1>

      <div className="mt-8 space-y-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="border-border rounded-lg border p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {submission.name} · <span className="text-muted">{submission.email}</span>
                </p>
                <p className="text-muted text-xs">
                  {submission.reason} · {submission.createdAt.toLocaleString("en-US")}
                </p>
              </div>
              <DeleteButton
                id={submission.id}
                name={submission.name}
                action={deleteContactSubmission}
              />
            </div>
            <p className="mt-3 text-sm">{submission.message}</p>
            {submission.company || submission.website || submission.phone ? (
              <p className="text-muted mt-3 text-xs">
                {[submission.company, submission.website, submission.phone]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {submissions.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No submissions yet.</p>
      ) : null}
    </div>
  );
}
