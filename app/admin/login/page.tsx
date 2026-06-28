import { LoginForm } from "@/features/auth/login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="text-xl font-medium">Sign in</h1>
      <p className="text-muted mt-2 text-sm">CMS access for the founder and editors.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
