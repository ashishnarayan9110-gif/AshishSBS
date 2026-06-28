import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/features/auth/sign-out-button";

const CONTENT_MODELS = [
  { label: "Ventures", count: () => prisma.venture.count() },
  { label: "Projects", count: () => prisma.project.count() },
  { label: "Lab Notes", count: () => prisma.labNote.count() },
  { label: "Principles", count: () => prisma.principle.count() },
  { label: "Resources", count: () => prisma.resource.count() },
  { label: "Services", count: () => prisma.service.count() },
  { label: "Contact submissions", count: () => prisma.contactSubmission.count() },
] as const;

export default async function AdminPage() {
  const session = await auth();
  const counts = await Promise.all(CONTENT_MODELS.map((model) => model.count()));

  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">CMS</h1>
          <p className="text-muted mt-1 text-sm">
            Signed in as {session?.user?.email} ({session?.user?.role})
          </p>
        </div>
        <SignOutButton />
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {CONTENT_MODELS.map((model, index) => (
          <li key={model.label} className="border-border rounded-lg border p-4">
            <p className="text-2xl font-medium">{counts[index]}</p>
            <p className="text-muted mt-1 text-sm">{model.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link href="/admin/ventures" className="underline">
          Manage Ventures →
        </Link>
        <p className="text-muted mt-2 text-sm">
          Other content types are still managed via Prisma Studio
          (<code>pnpm prisma:studio</code>) until their CMS pages are built —
          Ventures establishes the pattern.
        </p>
      </div>
    </div>
  );
}
