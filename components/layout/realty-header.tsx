import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#listings", label: "Listings" },
  { href: "/#enquire", label: "Contact" },
] as const;

export function RealtyHeader() {
  return (
    <header className="border-border border-b">
      <div className="mx-auto flex max-w-(--layout-max-width) items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <span>Ashish</span>
          <span className="text-muted">·</span>
          <span>Realty</span>
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#enquire"
          className="bg-foreground text-background rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Express Interest
        </Link>
      </div>
    </header>
  );
}
