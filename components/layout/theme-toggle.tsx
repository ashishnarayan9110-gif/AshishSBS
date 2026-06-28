"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // One-time client-only read of the persisted theme to avoid an SSR/client
  // hydration mismatch — the inline script in layout.tsx already applied it
  // to the DOM before paint, this just syncs component state to match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme((document.documentElement.dataset.theme as Theme) ?? "light");
  }, []);

  if (!theme) {
    // Avoid a hydration mismatch flash — render nothing until the client
    // theme is known.
    return <span className="w-9" aria-hidden="true" />;
  }

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="text-muted hover:text-foreground text-sm transition-colors"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
