import type { Prisma } from "@prisma/client";

export type PersonLink = { label: string; url: string };

// Person.links is free-form JSON, so narrow it before rendering rather than
// trusting its shape.
export function personLinks(links: Prisma.JsonValue | null): PersonLink[] {
  if (!Array.isArray(links)) return [];
  return links.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
    const record = entry as Record<string, unknown>;
    const label = record.label;
    const url = record.url;
    if (typeof label !== "string" || typeof url !== "string") return [];
    if (!/^https?:\/\/\S+$/.test(url)) return [];
    return [{ label, url }];
  });
}

function hueFromSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

function initials(name: string) {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/);
  if (!words[0]) return "—";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Square portrait, mirroring ListingThumb's deterministic placeholder so a
// person without a photo still gets a stable, recognisable mark.
export function CrewAvatar({
  name,
  slug,
  src,
}: {
  name: string;
  slug: string;
  src?: string | null;
}) {
  const base =
    "relative mt-5 aspect-square w-20 shrink-0 overflow-hidden rounded-full border border-border";

  if (src) {
    return (
      <div className={base}>
        {/* Arbitrary CMS URLs, so a plain img avoids per-domain loader config. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  const hue = hueFromSlug(slug);

  return (
    <div
      className={`${base} flex items-center justify-center`}
      style={{
        background: `linear-gradient(135deg,
          hsl(${hue} 30% 16%) 0%,
          hsl(${(hue + 40) % 360} 26% 11%) 100%)`,
      }}
      aria-hidden="true"
    >
      <span
        className="font-display text-[22px] leading-none"
        style={{ color: `hsl(${hue} 55% 72%)` }}
      >
        {initials(name)}
      </span>
    </div>
  );
}
