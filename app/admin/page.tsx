import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/features/auth/sign-out-button";

const CONTENT_MODELS = [
  { label: "Ventures", href: "/admin/ventures", count: () => prisma.venture.count() },
  { label: "Projects", href: "/admin/projects", count: () => prisma.project.count() },
  { label: "Lab Notes", href: "/admin/lab", count: () => prisma.labNote.count() },
  {
    label: "Principles",
    href: "/admin/principles",
    count: () => prisma.principle.count(),
  },
  { label: "Resources", href: "/admin/resources", count: () => prisma.resource.count() },
  { label: "Services", href: "/admin/services", count: () => prisma.service.count() },
  {
    label: "Career Archive",
    href: "/admin/career",
    count: () => prisma.careerEntry.count(),
  },
  {
    label: "Monthly Reviews",
    href: "/admin/monthly",
    count: () => prisma.monthlyReview.count(),
  },
  {
    label: "Contact submissions",
    href: "/admin/contact",
    count: () => prisma.contactSubmission.count(),
  },
] as const;

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  const counts = await Promise.all(CONTENT_MODELS.map((model) => model.count()));

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
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
          <li key={model.label}>
            <Link
              href={model.href}
              className="border-border hover:border-foreground/30 block rounded-lg border p-4 transition-colors"
            >
              <p className="text-2xl font-medium">{counts[index]}</p>
              <p className="text-muted mt-1 text-sm">{model.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
