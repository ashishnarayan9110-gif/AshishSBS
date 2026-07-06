import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Contact",
    links: [
      { href: "/contact", label: "Get in touch" },
      { href: "/submit-idea", label: "Submit your idea" },
      { href: "/strategy-call", label: "Strategy call" },
    ],
  },
  {
    title: "Index",
    links: [
      { href: "/ventures", label: "Ventures" },
      { href: "/projects", label: "Projects" },
      { href: "/lab", label: "Lab Notes" },
      { href: "/principles", label: "Principles" },
      { href: "/resources", label: "Resources" },
      { href: "/services", label: "Services" },
    ],
  },
  {
    title: "System",
    links: [
      { href: "/about", label: "About" },
      { href: "/career", label: "Career archive" },
      { href: "/monthly", label: "Monthly review" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-border dot-grid mt-auto border-t">
      <div className="mx-auto max-w-(--layout-max-width) px-6 pt-20 pb-12">
        <h2 className="font-display text-[clamp(48px,9vw,120px)] leading-[0.9]">
          Let&apos;s
          <br />
          build. <span className="text-accent">↗</span>
        </h2>

        <div className="border-border font-meta text-muted mt-10 grid grid-cols-1 gap-10 border-t pt-10 text-xs sm:grid-cols-3">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-2.5">
              <span className="text-foreground uppercase">{group.title}</span>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground w-fit transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="font-meta text-muted mt-14 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase">
          <span>© {new Date().getFullYear()} ashish.sbs — CMS-driven</span>
          <span>Node: Ashish · Building in public</span>
        </div>
      </div>
    </footer>
  );
}
