import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-24 text-center">
      <h1 className="text-2xl font-medium">Page not found</h1>
      <p className="text-muted mt-3">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-6 flex justify-center gap-4 text-sm">
        <Link href="/" className="underline">
          Return home
        </Link>
        <Link href="/search" className="underline">
          Search the platform
        </Link>
      </div>
    </div>
  );
}
