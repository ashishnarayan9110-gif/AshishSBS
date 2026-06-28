import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Lab" },
  { href: "/resources", label: "Resources" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <div className="mx-auto flex max-w-(--layout-max-width) items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-medium">
          Ashish
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
            <li>
              <Link
                href="/search"
                aria-label="Search"
                className="text-muted hover:text-foreground transition-colors"
              >
                Search
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          <Link href="/search" aria-label="Search" className="text-muted">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="7" strokeWidth={1.5} />
              <path d="m20 20-3.5-3.5" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </Link>
          <ThemeToggle />
          <MobileNav items={[...NAV_ITEMS]} />
        </div>
      </div>
    </header>
  );
}
