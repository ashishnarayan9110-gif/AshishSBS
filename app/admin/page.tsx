export default function AdminPage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-24">
      <h1 className="text-2xl font-medium">CMS</h1>
      <p className="text-muted mt-3">
        Authentication and content management UI land here once Volume II
        auth/RBAC implementation begins. Until then, manage content directly
        via Prisma Studio (`pnpm prisma:studio`).
      </p>
    </div>
  );
}
