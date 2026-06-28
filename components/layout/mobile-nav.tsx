"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open ? (
        <div className="bg-background fixed inset-x-0 top-[57px] bottom-0 z-40 overflow-y-auto">
          <nav aria-label="Primary">
            <ul className="flex flex-col px-6 py-4 text-base">
              {items.map((item) => (
                <li key={item.href} className="border-border border-b">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
