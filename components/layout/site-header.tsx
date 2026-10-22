"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* One table drives both the desktop bar and the phone sheet, so the two can
   never drift apart. */
export const NAV = [
  { href: "/ventures", label: "Ventures" },
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Sandbox" },
  { href: "/crew", label: "Crew" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const current = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  /* the sheet owns the page scroll while it is up */
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); burgerRef.current?.focus(); }
    };
    /* a resize up to desktop must not leave the sheet latched open */
    const onResize = () => { if (innerWidth > 880) setOpen(false); };
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
    };
  }, [open]);

  /* close on navigation */
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="hd">
        <div className="hd__in">
          <Link href="/" className="hd__mark">
            Ashish&nbsp;Narayan
          </Link>
          <nav className="hd__n" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={current(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="os-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav
        id="os-menu"
        className={"menu" + (open ? " open" : "")}
        aria-label="Sections"
        aria-hidden={!open}
      >
        {[{ href: "/", label: "Index" }, ...NAV].map((n, i) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={current(n.href) ? "page" : undefined}
            tabIndex={open ? 0 : -1}
          >
            <span className="m tn">{pad(i + 1)}</span>
            <b>{n.label}</b>
          </Link>
        ))}
        <div className="menu__f">
          <span className="m">Ashish Narayan</span>
          <span className="m tn">30.7333&deg;N 76.7794&deg;E</span>
        </div>
      </nav>
    </>
  );
}
