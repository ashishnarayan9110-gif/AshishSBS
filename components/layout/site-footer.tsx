import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Platform",
    links: [
      { href: "/about", label: "About" },
      { href: "/principles", label: "Principles" },
      { href: "/career", label: "Career Archive" },
      { href: "/monthly", label: "Monthly Builder Review" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { href: "/lab", label: "Lab" },
      { href: "/resources", label: "Resources" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    title: "Ventures",
    links: [{ href: "/ventures", label: "All Ventures" }],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-border mt-auto border-t">
      <div className="mx-auto grid max-w-(--layout-max-width) grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        {FOOTER_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-muted text-xs font-medium tracking-wide uppercase">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-border text-muted mx-auto max-w-(--layout-max-width) border-t px-6 py-6 text-xs">
        © {new Date().getFullYear()} Ashish. Designing better systems.
      </div>
    </footer>
  );
}
