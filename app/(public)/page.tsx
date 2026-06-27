import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-(--content-max-width) px-6 py-24">
      <p className="text-muted text-sm">Systems Designer</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">
        I design systems that help businesses operate with greater clarity,
        trust and efficiency.
      </h1>
      <p className="text-muted mt-6 text-lg">
        This platform documents ventures, projects and research as they
        happen — not a portfolio, a living operating system.
      </p>
      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/about" className="underline">
          Read the philosophy
        </Link>
        <Link href="/ventures" className="underline">
          See current ventures
        </Link>
      </div>
    </div>
  );
}
