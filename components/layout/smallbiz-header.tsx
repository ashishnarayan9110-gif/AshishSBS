import Link from "next/link";

export function SmallBizHeader() {
  return (
    <header className="border-border border-b">
      <div className="mx-auto flex max-w-(--layout-max-width) items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <span>Ashish</span>
          <span className="text-muted">·</span>
          <span>Small Business For Sale</span>
        </Link>
        <Link href="https://ashish.sbs" className="text-muted hover:text-foreground text-sm transition-colors">
          ashish.sbs ↗
        </Link>
      </div>
    </header>
  );
}
