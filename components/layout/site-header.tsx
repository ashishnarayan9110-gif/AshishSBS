import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";

const NAV_ITEMS = [
  { href: "/ventures", label: "Ventures" },
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Sandbox" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border sticky top-0 z-50 border-b bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-(--layout-max-width) items-center justify-between px-6 py-4">
        <Link href="/" className="font-grotesk text-[15px] font-bold whitespace-nowrap">
          Ashish <span className="text-accent">Narayan</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="font-meta flex items-center gap-6 text-[11px] uppercase">
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
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="font-meta border-accent text-accent hover:bg-accent hover:text-accent-foreground hidden rounded-[4px] border px-4 py-2 text-[11px] uppercase transition-colors sm:inline-block"
          >
            Say hello ↗
          </Link>
          <MobileNav
            items={[
              ...NAV_ITEMS,
              { href: "/contact", label: "Contact" },
              { href: "/search", label: "Search" },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
