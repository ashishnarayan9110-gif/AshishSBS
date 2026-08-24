# Ashish.sbs Platform

A content-first personal operating system — positioned as a living build log,
not a finished portfolio. Ventures, evidence (projects), lab notes, working
theories (principles), a field kit (resources), and services, all CMS-driven.
No production content is hardcoded. The main site also hosts two independent
subdomain products (a real-estate advisory brand and a marketplace teaser) on
the same codebase via hostname-based middleware routing.

Live at **[ashish.sbs](https://ashish.sbs)**.

---

## Stack

- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS v4, CSS custom-property design tokens (no hardcoded colors in components)
- Prisma 6 + PostgreSQL (Supabase)
- Auth.js (next-auth v5 beta) — JWT strategy, edge-safe middleware split, protects `/admin`
- React Hook Form + Zod for all forms
- Resend (email), Razorpay (payments)
- Deployed on Vercel, `pnpm` package manager

---

## Theme & design system

The main site (`ashish.sbs`) runs a scoped **`.os` theme** — a "protocol
documentation" identity, deliberately distinct from the neutral Tailwind
tokens used elsewhere in the repo (realty/smallbiz keep the original light/
dark-toggle theme).

- **Palette**: Black `#000000` / Ebony `#131210` (surfaces) · Warm gray
  `#E9DFDD` (foreground) · Steel `#8A8884` (muted) · Crimson `#FF1627`
  (single accent — used sparingly for links, CTAs, active states)
- **Typography**: four fonts, one job each
  - **Anton** — display headlines (`font-display`, uppercase, tight leading)
  - **Space Grotesk** — subheads, nav, UI labels (`font-grotesk`)
  - **Work Sans** — body copy (default `font-sans`)
  - **IBM Plex Mono** — metadata, eyebrows, status lines, timestamps (`font-meta`)
- **Texture**: a repeating dot-grid background (`.dot-grid` / `.dot-grid-dark`)
  behind most sections; hairline borders (`--border`) as the primary
  structural device instead of shadows or rounded cards
- **Inverted sections**: `.os-light` flips a section to the warm-gray
  surface with dark ink — used once per page maximum, currently only for the
  Lab Notes band on the homepage and the lab note detail page, to keep the
  "documentary" pacing (dark → light → dark) rather than a flat scroll
- **No light/dark toggle on the main site** — the OS theme is fixed dark by
  design. The toggle component (`components/layout/theme-toggle.tsx`) still
  exists in the repo but is unused on `(site)` routes.
- Motion is minimal and functional: `IntersectionObserver` fade-ups where
  used, no autoplay, no parallax, no decorative animation — consistent with
  the "stillness reads as intent" editorial tone.

Full tokens: `app/globals.css` (search `.os` block). Fonts are loaded via
`next/font/google` in `app/layout.tsx` and exposed as CSS variables consumed
by `@theme inline` in globals.css — never hardcode a font-family in a
component.

---

## Creative direction (voice, not visuals)

This section describes a **person**, not a website. Colors, type, spacing,
and layout are the fixed design system above — none of that changes here.
What changes is the language, the hierarchy, and the feeling someone has
after ten minutes on the site.

**The site is not a portfolio, a journal, a founder blog, or a motivational
page.** It is the public record of someone who builds. A visitor should
leave thinking *"this person builds interesting things,"* not *"this person
talks about interesting things."*

**Ordering principle — the one rule everything else follows:**

> Optimize every page for credibility first, curiosity second, philosophy
> third. Never reverse that order.

Concretely, this is why the homepage leads with **Ventures** (`01`, live
proof of execution) and **Evidence** (`02`, what was actually shipped)
*before* **Lab Notes** (`03`, the thinking) and **Working Theories** (`04`,
the beliefs) — credibility is earned before curiosity is invited, and
curiosity is earned before philosophy is offered. Films and other media can
carry the mythology of the story; ashish.sbs is where that story is grounded
in real, checkable work.

**Voice**: calm, precise, curious, observant, competent, quietly ambitious.
Never motivational, preachy, arrogant, self-important, fake-humble, or
corporate. Show decisions instead of claiming intelligence; show work
instead of claiming expertise; show evidence instead of claiming
authenticity.

**The one deliberate exception — `/crew`.** The rest of the site avoids
cinematic language; the crew page leans into it, framing the people behind
the work as a heist crew with aliases and quirks. That is a considered
choice, not drift: the contrast is what makes it land, and warmth about
other people is the one place where understatement would read as coldness.
Aliases carry over to project and venture pages as short credit lines, and
nowhere else. Do not spread the register any further without deciding to.

**Removed on this pass**: the "Rebuilding in the open" hero and the
reconstruction/notebook/investigation framing from the previous content
pass — it read as self-focused ("your transformation") rather than
work-focused ("your work"). Mythology words (*manifesto, reconstruction,
legacy, journey, transformation*) and motivational words (*dream, mission,
vision, passion, empowering, innovating, disrupting*) are avoided sitewide
in favor of active, checkable language: *building, testing, shipping,
documenting, learning*.

**Section/nav naming still in force**: "Projects" → **Evidence**,
"Principles" → **Working Theories** — not portfolio language, but framed as
decisions and tested beliefs rather than a showcase. Project pages are
structured as a decision, not a case study: *why this exists → what
actually happened → where it stands now → what I'd do differently now* —
answering, without ever stating outright, what was built, why, what changed
because of it, and what's next.

**Litmus test before publishing any sentence**: does it sound earned? does
it build trust? does it sound competent without claiming certainty? is it
showing instead of telling? would it still read well in five years? If any
answer is no, rewrite it.

This is a copy/hierarchy layer, not a schema change — there are currently no
per-entry "status / iteration / last updated" database fields; the "Status:
Building" framing is simulated in static copy only (see **Known gaps**
below).

---

## Sitemap & page-by-page copy

### Main site (`ashish.sbs` / `www.ashish.sbs`)

| Route | Title (as shown) | Description / one-line copy |
|---|---|---|
| `/` | — | Hero: *"I build things that have to work."* — credibility-first framing, live counts of ventures/shipped work/notes pulled from the DB. Section order: 01 Ventures → featured build spotlight → 02 Evidence → 03 Lab Notes → 04 Working Theories → 05 Field Kit / 06 Services split panel. |
| `/lab` | Lab Notes | *"Observations, working theories, and things I got wrong — written down before I understood them, not after. Start anywhere; each one points to the next."* |
| `/lab/[slug]` | (note title) | Detail page: `// Lab note — {date}` eyebrow, body, then "Next note ↗" linking to the next entry in sequence (or "Back to all notes ↗" on the last one). |
| `/ventures` | Ventures | *"Real businesses, logged as they happen — the ones still running, the ones that paused, the ones that quietly died. Status changes; the record doesn't get rewritten."* |
| `/ventures/[slug]` | (venture name) | Sections: *What I noticed / What I tried / Where it stands right now / What I learned the hard way.* |
| `/projects` | Projects | *"Work I've built or helped build — businesses, furniture, teaching, and the personal things in between. What it was for, what it took, and how it turned out, including the ones that didn't."* Lists projects and ventures together, filterable by discipline; each card shows its discipline and, where recorded, its outcome. |
| `/projects/[slug]` | (project title) | *Evidence* eyebrow. Sections: *Why this exists / What actually happened / Where it stands now*, plus *"What I'd do differently now"* (lessons). Ends with a link to the next entry. |
| `/projects/rikencare-lifesciences` | Rikencare Lifesciences | Two-part case study: brand system + website build, for a WHO-GMP pharma manufacturer. Standalone static page (not CMS-driven), see project-specific credits block. |
| `/projects/savison-life` | Savison Life | Founder-perspective case study: problem, brand system, four-portal platform architecture, stack, and an explicit "gaps" section. Standalone static page. |
| `/principles` | — | **Retired as a page.** 307s to `/about#how-i-think`, which renders the CMS principles itself. The individual write-ups below are untouched. |
| `/principles/[slug]` | (theory title) | Statement + explanation + examples, CMS-driven. |
| `/resources` | Field Kit | *"The templates and checklists I actually built for myself along the way — kept here because rebuilding them from scratch each time was the mistake."* |
| `/resources/[slug]` | (resource title) | Description + optional download link. |
| `/services` | Services | *"For when you'd rather borrow the last few years directly than wait for me to write it up."* |
| `/services/[slug]` | (service name) | Problem, ideal client, approach, deliverables, timeline, FAQ — CMS-driven. |
| `/insights` | Insights | *"Real conversations with people who actually move things. No hype, no motivational speeches — sharp, high-signal discussions with operators, experts, and builders."* |
| `/insights/[slug]` | (insight title) | CMS-driven long-form entry. |
| `/monthly` | Monthly Builder Review | *"A public progress log — what was built, what was learned, what failed."* |
| `/monthly/[slug]` | (edition title) | CMS-driven monthly entry. |
| `/career` | Career Archive | *"A factual, chronological record of work — no confidential or client-sensitive information."* |
| `/crew` | The Crew | *"Nothing here was built alone."* Roster of the people behind the work, as numbered dossier cards — alias, role, quirk, what they did, and the projects they are credited on. Deliberately cinematic; see Creative direction. |
| `/crew/[slug]` | (person name) | Individual dossier: alias, role, quirk, how we met, what they did, credits with a per-project contribution line, external links. |
| `/about` | About | *"Systems Over Chaos — how I think, build, and operate."* Founder story, working style, principles inline, dual CTA (submit idea / strategy call). |
| `/contact` | Contact | *"The beginning of a conversation — not a lead form."* |
| `/submit-idea` | Submit Your Idea for Public Breakdown | *"Selected submissions will be featured in public videos. This is not 1-on-1 mentoring — for that, see the strategy call."* Free. |
| `/strategy-call` | 20-Minute Strategy Call — ₹1,499 | *"High-signal calls for serious founders... Come prepared with a specific question."* Paid, Razorpay checkout. |
| `/search` | — | Site-wide content search across all CMS models. |
| `/privacy` | Privacy Policy | Static legal copy. |
| `/terms` | Terms | Static legal copy. |
| `/sitemap.xml`, `/robots.txt` | — | Auto-generated. |

### Subdomains (same Vercel project, routed by hostname in `middleware.ts`)

| Subdomain | Rewrites to | Purpose | Status |
|---|---|---|---|
| `realty.ashish.sbs` | `/realty` | Personal real-estate advisory brand ("Performance Realty") — single live listing (HSIIDC SCO, Barwala), inquiry form → email via Resend, DB-backed `RealtyListing`/`RealtyInquiry` models. Independent header/footer, neutral theme (not `.os`). | ✅ Live. |
| `smallbusinessforsale.ashish.sbs` (alias `smallbiz.`) | `/smallbiz` | "Buy Your Next Business" — coming-soon page with email waitlist capture (`SmallBizWaitlist` model). | ✅ Live. |
| `rikencare-demo.ashish.sbs` | — | Separately hosted client demo site (not part of this Next.js project). Referenced from the Rikencare case study page. | Live, external to this repo. |

Locally, since middleware host-matching only fires with a real hostname,
these are reachable directly at `/realty` and `/smallbiz` on
`localhost:PORT`.

### Admin (`/admin`, auth-protected, main domain only)

CMS for every content model below: career entries, contact submissions
(read-only), idea submissions, insights, lab notes, monthly reviews,
**people (crew)**, principles, projects, resources, services, strategy-call
bookings, ventures.
Each has a list + `[id]` edit view + `new` create view, following the same
pattern. Auth via Auth.js credentials login at `/admin/login`;
`requireStaff()` is called in every server action as defense-in-depth beyond
the middleware gate.

---

## Integrations

| Integration | Purpose | Status |
|---|---|---|
| **Supabase Postgres** | Primary database (via Prisma, `pgbouncer=true` transaction pooler) | ✅ Live |
| **Vercel** | Hosting, CI/CD from `main` | ✅ Live |
| **Auth.js (credentials)** | Admin login | ✅ Live |
| **Resend** | Transactional email — realty inquiries, smallbiz waitlist notifications, savison-life case study references it as the stack's email provider | ✅ Live (lazy-initialized so a missing key never breaks the build — see `lib/resend.ts`); **sends from `onboarding@resend.dev` until the `ashish.sbs` domain is verified with Resend** — see Known gaps |
| **Razorpay** | Strategy-call payment checkout (`/api/strategy-call/create-order`, `/verify`) | ✅ Live |
| **Google Fonts (next/font)** | Anton, Space Grotesk, Work Sans, IBM Plex Mono, Geist (fallback) | ✅ Live, self-hosted at build time |

### Integrations not yet connected / pending

- **Resend domain verification for `ashish.sbs`** — once verified, switch
  `RESEND_FROM_EMAIL` from `onboarding@resend.dev` to a real
  `@ashish.sbs` sender.
- **Per-entry status/iteration metadata** — partly delivered (Aug 2026).
  `Project.outcomeStatus` (`SHIPPED`/`RUNNING`/`PAUSED`/`FAILED`) now backs
  the "current state" line on project pages, and `Venture.status` already
  existed. Still missing: anything equivalent for **Lab Notes**, and the
  richer `lastUpdated` / `iteration` / `openQuestions` fields. Any copy
  implying a status that no schema field backs is a bug — see the
  hardcoded-string incident under Operational gotchas.
- **Per-credit contribution text in the CMS.** `PersonOnProject` and
  `PersonOnVenture` both carry a `contribution` column, and the public pages
  render it, but the admin project form only assigns people — there is no
  input for the per-project line yet, so it falls back to the person's role.
- **GSTIN/GST-style verification, escrow, or any payment flow beyond the
  strategy-call checkout** — out of scope for this project; not planned.
- **Google Maps embed on the realty listing** — currently a graceful
  branded fallback where a live embed would go; no Maps API key configured.

---

## Getting started

```bash
pnpm install
cp .env.example .env        # fill in DATABASE_URL, Supabase, Resend, Razorpay keys
pnpm prisma:generate
pnpm dev
```

Open http://localhost:3000. Realty and smallbiz are reachable at
`/realty` and `/smallbiz` locally (hostname routing only activates with a
real subdomain in production).

## Scripts

| Script                 | Purpose                                  |
| ----------------------- | ----------------------------------------- |
| `pnpm dev`              | Start the dev server                      |
| `pnpm build`            | `prisma generate` + production build      |
| `pnpm lint`             | ESLint                                    |
| `pnpm typecheck`        | `tsc --noEmit`                            |
| `pnpm format`           | Prettier write                            |
| `pnpm prisma:migrate`   | ⚠️ **Do not run** — see Database below    |
| `pnpm prisma:studio`    | Browse the database                       |
| `pnpm prisma:seed`      | Run the main content seed                 |
| `pnpm seed:admin`       | Seed the admin user                       |
| `pnpm seed:realty`      | Seed the realty listing (Barwala HSIIDC)  |
| `pnpm seed:rikencare`   | Seed the Rikencare case-study project     |
| `pnpm seed:savison`     | Seed the Savison Life case-study project  |
| `pnpm seed:indizilla`   | ⚠️ Recreates an `IndiZilla` **venture** stub that was deliberately deleted (Jul 2026). Do not run unless you want it back. |

## Project structure

```
app/(site)/(public)/   main-site public routes — the OS-themed content pages
app/(site)/layout.tsx  applies the .os theme + SiteHeader/SiteFooter
app/realty/            realty.ashish.sbs — independent header/footer, neutral theme
app/smallbiz/          smallbusinessforsale.ashish.sbs — coming-soon page
app/admin/             CMS (founder/editor only, auth-protected)
app/api/                route handlers (contact, idea submission, realty inquiry,
                         smallbiz waitlist, strategy-call payment)
middleware.ts           hostname-based routing (realty/smallbiz rewrites) + admin auth gate
components/              shared UI (ui/, layout/, shared/)
features/                feature-scoped components + logic (forms, booking, etc.)
lib/                     prisma client, resend/razorpay clients, content queries, schemas
prisma/                  schema.prisma (source of truth) + seed scripts
```

## Database

Schema lives in `prisma/schema.prisma`. Every CMS-driven public page renders
one or more content objects from it — no hardcoded content in components,
except the three standalone case-study pages (`rikencare-lifesciences`,
`savison-life`, `indizilla`), which are static by design since their content
is a one-off, richly-formatted narrative rather than a repeatable content
type. Note that a static page at `/projects/<slug>` **shadows** the dynamic
`[slug]` route, so a DB project sharing one of those slugs will never render
through the CMS template.

### Applying a schema change — read this first

> ⚠️ **Do not run `pnpm prisma:migrate` against this project.** It is
> `prisma migrate dev`, and there is **no `prisma/migrations/` directory —
> there never has been.** This database was built with `db push`. Running
> `migrate dev` against a populated database with no migration history makes
> Prisma detect drift and offer to **reset the database**, which would
> destroy live content. There is no staging environment and no automated
> backup.

Until the schema is properly baselined, apply changes one of these ways:

- **`prisma db push`** from a machine that can reach the database — the way
  every earlier change was made.
- **Supabase migration API / SQL editor**, applying SQL generated offline
  with:
  `prisma migrate diff --from-schema-datamodel <old> --to-schema-datamodel prisma/schema.prisma --script`
  Diffing two schema *files* needs no database connection, so you can review
  the exact SQL before anything runs. This is how the crew migration
  (Aug 2026) was applied.

Always read the generated SQL before applying it, and confirm it is additive
(`CREATE` / `ADD`) with no `DROP`.

## Deployment

Vercel project `ashish-sbs` tracks `main`, deploying automatically on every
push. Production env vars are configured in the Vercel dashboard; never
commit `.env`. Domains attached: `ashish.sbs` (307s to `www`),
`www.ashish.sbs` (production), `realty.ashish.sbs`,
`smallbusinessforsale.ashish.sbs`.

---

## Accounts & infrastructure

Everything this project runs on, and who owns it. **Identifiers only — no
secrets live in this file.** See "Where the secrets are" below.

| Service | Account / identifier | Notes |
|---|---|---|
| **Local checkout** | `D:\AshishSBS-Platform` | The only folder this project needs |
| **GitHub** | `ashishnarayan9110-gif` → [`AshishSBS`](https://github.com/ashishnarayan9110-gif/AshishSBS) | Branch `main`; push = deploy |
| **Vercel** | team slug `ashish-n`, CLI user `ashishnarayan9110-gif`, project `ashish-sbs` | Auto-deploys `main` |
| **Supabase** | account `ashishnarayan9110@gmail.com`, org `kvtqnvdtxkdhwpfusfpc`, project **`ashish-sbs-platform`** (ref `bwtuvlqvzqbcdqnwlzvi`, `ap-south-1`) | Postgres only — Prisma owns the schema, not Supabase migrations |
| **Domain + DNS** | `ashish.sbs` registered at **Hostinger**; nameservers `aurora/nebula.dns-parking.com` | DNS is edited in the Hostinger panel, **not** Vercel |
| **Email** | Resend | Sending from `onboarding@resend.dev` until the domain is verified |
| **Payments** | Razorpay | Strategy-call checkout only |

### Live DNS records (Hostinger → ashish.sbs)

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |
| CNAME | `realty` | `f2889b2437a1896e.vercel-dns-017.com` |
| CNAME | `smallbusinessforsale` | `f2889b2437a1896e.vercel-dns-017.com` |
| A | `rikencare-demo` | `89.117.157.91` |

### Where the secrets are

Nothing secret is committed. Keys live in exactly two places:

- **Local:** `.env` (gitignored). Keys expected: `DATABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
  `NEXT_PUBLIC_SITE_URL`, `AUTH_SECRET`. See `.env.example` for the full
  list including the optional Resend/Razorpay keys.
- **Production:** the Vercel dashboard → project `ashish-sbs` → Settings →
  Environment Variables.

Admin login for `/admin` is an Auth.js **credentials** provider — an email +
bcrypt hash stored in the `User` table, seeded by `pnpm seed:admin`. It is
not Google or GitHub SSO.

---

## Operational gotchas

Things that have actually bitten this project. Read before touching infra.

**Hostinger re-points the apex if a hosting plan is attached.** In Jul 2026
the site silently started serving a 2.4 KB Hostinger placeholder instead of
the real 47 KB app. Cause: an `ALIAS @ → ashish.sbs.cdn.hstgr.net` record
that Hostinger added. DNS forbids ALIAS and A on the same name, so the A
record could not be added until the ALIAS was deleted. **If the site ever
"changes" on its own, check for that ALIAS record first.**

**Two GitHub accounts are in play on this machine.** This repo belongs to
`ashishnarayan9110-gif`; a separate project (Indizilla) belongs to
`ancoryen`. Git Credential Manager will otherwise use whichever was cached
last and push will 403. Each repo is pinned:

```bash
git config credential.https://github.com.username ashishnarayan9110-gif
```

**Prisma owns the schema, Supabase is just Postgres.** Do not edit tables in
the Supabase dashboard. Change `prisma/schema.prisma`, then apply it the safe
way — **not** with `pnpm prisma:migrate`, which can offer to reset the
production database. See the Database section above.

**The transaction pooler breaks prepared statements.** `lib/prisma.ts`
forces simple query mode for this reason — don't remove it.

**Vercel restores `node_modules` from build cache, so `postinstall` may
never run.** A build log reading `Installing dependencies... Already up to
date` means pnpm short-circuited and `prisma generate` did **not** run. The
build then type-checks against a stale Prisma client, and any model added
since the cached client was generated resolves to `any` — surfacing as a
confusing `implicitly has an 'any' type` error in a file that is actually
correct. This bit the project twice (`7f342ee`, then the crew deploy). The
fix that holds is `"build": "prisma generate && next build"` — do not move
it back to `postinstall` alone.

**The direct database host is IPv6-only, and some networks synthesize
NAT64 records for the pooler.** `db.<ref>.supabase.co` has no A record, so
an IPv4-only machine cannot reach it at all; Vercel can, which is why this
only ever breaks local development. Worse, the session-pooler hostname may
resolve to `64:ff9b::…` NAT64 addresses, which Prisma prefers and cannot
route — producing `P1001 Can't reach database server` **even though a TCP
test to the same host succeeds**, because the TCP tool picked IPv4. If that
happens, pin the pooler's IPv4 address in the local `.env`. The correct
session-pooler hostname is in the Supabase dashboard behind the **Connect**
button (there is no Database page under Project Settings in the current UI).

**Never hardcode a value the schema should carry.** `/projects/[slug]` once
printed a literal `"Live — still watching it"` as CURRENT STATE for every
project, including ones that had failed. It looked like copy, but it was a
factual claim the database could not back. Fixed in Aug 2026 by adding
`Project.outcomeStatus`. If a page states a status, a field must supply it.

**Windows: `pnpm build` and `pnpm dev` conflict.** The dev server holds a
lock on `query_engine-windows.dll.node`, so `prisma generate` — now part of
`build` — fails with `EPERM`. Stop the dev server first. Separately, running
a production build and then `next dev` without `rm -rf .next` makes every
route return 404 while still rendering HTML; clearing `.next` fixes it.

**RLS is on for every table, with no policies, by design.** Nothing in the
codebase uses the Supabase JS client — all access is Prisma over a direct
Postgres role, which bypasses RLS. Three tables (`realty_listings`,
`realty_inquiries`, `smallbiz_waitlist`) were left exposed to the public
anon key until Aug 2026. Any new table must have RLS enabled to match.

---

## Current state (last updated Aug 2026)

Recently shipped:

- **Crew.** `Person` plus `PersonOnProject` / `PersonOnVenture` join tables
  carrying a per-credit `contribution` line. Public roster at `/crew`,
  dossiers at `/crew/[slug]`, credit lines on project and venture detail
  pages, admin CRUD at `/admin/people`. People are **DRAFT by default** and
  every crew query filters on `PUBLISHED` — these are real, named people and
  nothing about them should go public by accident.
- **Projects are no longer digital-only.** `Project.discipline`
  (`DIGITAL`/`FURNITURE`/`TEACHING`/`BUSINESS`/`PERSONAL`/`OTHER`) with
  filtering on `/projects`; a venture answers the Business filter, since a
  venture is a business. Filter pills only render for disciplines that would
  actually return something.
- **Failure is a first-class outcome.** `Project.outcomeStatus`
  (`SHIPPED`/`RUNNING`/`PAUSED`/`FAILED`) replaces the hardcoded
  "Live — still watching it" string that used to render on every project.
- **`Project.imageUrl`** added, closing the gap where every project
  thumbnail was a slug-derived placeholder.
- **RLS enabled on the last three unprotected tables** (`realty_listings`,
  `realty_inquiries`, `smallbiz_waitlist`), which were readable and writable
  with the public anon key. All 32 tables now have it on.
- **Build regenerates the Prisma client** (`prisma generate && next build`)
  after a cached `node_modules` skipped `postinstall` and failed a deploy.
- **Tests: 25 → 43**, covering admin authorization, draft-by-default
  publishing, enum rejection, credit replacement on update, and link parsing.

Verified in Aug 2026:

- All four hosts serve 200 with real content; `realty` and `smallbiz` are
  fully live (the README previously called them pending).
- `/projects` filtering, `/crew`, and the nav were checked at 390px and
  desktop on local dev; production was verified by request (routes,
  stylesheet, and rendered markup).

Known gaps:

- **No `prisma/migrations/` directory.** The database still has no Prisma
  migration history — see Database. Baselining it is the highest-value
  infrastructure task outstanding.
- **The crew UI has never been seen with real people in it.** `/crew` and
  `/crew/[slug]` have only been verified in their empty state, and the
  dynamic `/projects/[slug]` template is shadowed by static pages for all
  three current projects, so its outcome line and credit block are unverified
  against real data.
- **No per-project contribution input** in the admin project form; the
  column exists and renders, but falls back to the person's role.
- **Homepage still renders a "Principles" section** from the CMS. Only the
  standalone page was retired; say so if that section should go too.
- **Aliases and quirks describe real people.** Nothing publishes itself, but
  consent for a photo, an alias, or a personal story is a human question the
  schema cannot answer.
