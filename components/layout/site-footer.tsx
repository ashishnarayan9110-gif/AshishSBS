import Link from "next/link";

const COLS = [
  [
    { href: "/ventures", label: "Ventures" },
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "Sandbox" },
    { href: "/crew", label: "Crew" },
    { href: "/monthly", label: "Monthly review" },
  ],
  [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/resources", label: "Field kit" },
    { href: "/contact", label: "Contact" },
    { href: "/strategy-call", label: "Strategy call" },
  ],
];

export function SiteFooter() {
  return (
    <footer className="wrap ftr">
      <div className="ftr__g">
        <div>
          <span className="m">Ashish Narayan</span>
          <p className="hero__p" style={{ marginTop: 12, fontSize: 15 }}>
            A living record of the ventures, projects and systems I build &mdash;
            what worked, what didn&rsquo;t, and what I&rsquo;m testing next.
          </p>
        </div>
        {COLS.map((col, i) => (
          <nav key={i} className="ftr__c" aria-label={i === 0 ? "Sections" : "More"}>
            {col.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="ftr__n">
        <span className="m">&copy; {new Date().getFullYear()} Ashish Narayan</span>
        <span className="m tn">30.7333&deg;N 76.7794&deg;E</span>
        <span className="m">
          <Link href="/privacy">Privacy</Link> &middot;{" "}
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
