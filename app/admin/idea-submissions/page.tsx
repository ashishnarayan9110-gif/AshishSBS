import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteIdeaSubmission } from "@/features/admin/idea-submission-actions";

export const dynamic = "force-dynamic";

export default async function AdminIdeaSubmissionsPage() {
  const submissions = await prisma.ideaSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Idea Submissions</h1>

      <div className="mt-8 space-y-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="border-border rounded-lg border p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{submission.name}</p>
              <DeleteButton
                id={submission.id}
                name={submission.name}
                action={deleteIdeaSubmission}
              />
            </div>
            <p className="text-muted mt-3 text-xs uppercase">Business idea</p>
            <p className="text-sm">{submission.businessIdea}</p>
            <p className="text-muted mt-3 text-xs uppercase">Target customer</p>
            <p className="text-sm">{submission.targetCustomer}</p>
            <p className="text-muted mt-3 text-xs uppercase">Problem</p>
            <p className="text-sm">{submission.problem}</p>
            <p className="text-muted mt-3 text-xs uppercase">Biggest challenge</p>
            <p className="text-sm">{submission.biggestChallenge}</p>
            <p className="text-muted mt-3 text-xs">
              {submission.createdAt.toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>

      {submissions.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No submissions yet.</p>
      ) : null}
    </div>
  );
}
