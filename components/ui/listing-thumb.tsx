// Thumbnail for listing cards. Uses the real image when the CMS has one,
// otherwise draws a placeholder derived from the slug — same slug always gets
// the same mark, so listings stay recognisable between visits.

function hueFromSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

function initials(title: string) {
  const words = title.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/);
  if (!words[0]) return "—";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function ListingThumb({
  title,
  slug,
  src,
  className = "",
}: {
  title: string;
  slug: string;
  src?: string | null;
  className?: string;
}) {
  const base = `relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border ${className}`;

  if (src) {
    return (
      <div className={`${base} bg-muted-background`}>
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
        className="font-display text-[clamp(28px,6vw,44px)] leading-none tracking-tight"
        style={{ color: `hsl(${hue} 55% 72%)` }}
      >
        {initials(title)}
      </span>
    </div>
  );
}
