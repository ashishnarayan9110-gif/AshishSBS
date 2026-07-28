# Start here

Orientation for a new session on **ashish.sbs**. Read this first, then
`README.md` for the full picture.

## What this is

A Next.js 16 app that serves three sites from one Vercel project, routed by
hostname in `middleware.ts`:

| Host | Route group | What it is |
|---|---|---|
| `www.ashish.sbs` | `app/(site)/` | The main site — personal/professional, dark "OS" theme |
| `realty.ashish.sbs` | `app/realty/` | Property listing microsite, neutral theme |
| `smallbusinessforsale.ashish.sbs` | `app/smallbiz/` | Coming-soon page |

Plus `/admin` — an auth-protected CMS. Nearly all public content is
database-driven, not hardcoded.

## Stack

Next.js 16.2.9 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
· Prisma 6 → Supabase Postgres · Auth.js v5 (credentials) · Resend ·
Razorpay · pnpm 11 · Vitest.

## Run it

```bash
pnpm install && pnpm prisma:generate && pnpm dev
```

Needs `.env` (gitignored — see `.env.example`). Dev runs on
http://localhost:3000. Subdomains are at `/realty` and `/smallbiz` locally;
hostname routing only kicks in on real subdomains in production.

Before committing: `pnpm typecheck` and `pnpm build` both clean.

## The five things worth knowing up front

1. **Push to `main` deploys to production.** There is no staging.
2. **DNS lives at Hostinger, not Vercel.** If the site ever serves the wrong
   content, check for a Hostinger `ALIAS @` record — see README →
   Operational gotchas.
3. **This repo pushes as `ashishnarayan9110-gif`.** A different project on
   this machine uses another GitHub account; the repo is pinned so pushes
   don't 403.
4. **Prisma owns the schema.** Never edit tables in the Supabase dashboard.
5. **Nothing secret is in the repo.** Keys are in local `.env` and the
   Vercel dashboard only.

## Where things are

```
app/(site)/(public)/   main-site pages (projects, ventures, lab→"Sandbox", about…)
app/admin/             CMS
components/ui/         shared UI, incl. listing-thumb.tsx
lib/content.ts         every published-content query
prisma/schema.prisma   source of truth for the database
middleware.ts          hostname routing + admin auth gate
```

## Current state and open items

See **README.md → Current state**. In short: nav and copy were recently
simplified, listing thumbnails added, ventures merged into `/projects`,
admin tables made mobile-safe. Open: projects have no image field, and the
homepage still shows a Principles section.

## Not in scope

`indizilla.com` is a **separate project** in a different folder, on
different GitHub/Vercel/Supabase accounts. Nothing here relates to it.
