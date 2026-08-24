# Start here — ashish.sbs handover

Everything a new session needs to work on this project confidently. Read this
top to bottom once; `README.md` is the deeper reference for design system,
full sitemap and page-by-page copy.

**Scope note:** `indizilla.com` is a *different* project in a different
folder, on different GitHub / Vercel / Supabase accounts. Nothing in this
repo relates to it. If a task mentions Indizilla, it belongs in that session.

---

## 1. What this project is

A personal/professional platform for Ashish Narayan — deliberately *not* a
portfolio. The framing is a public build log: ventures, projects and
in-progress work recorded as they happen, including the ones that stalled.
Voice is plain and understated; no hype, no hustle-culture language. Copy
that oversells has been actively removed (see §8).

One Next.js app serves **three sites**, routed by hostname:

| Host | Route group | What it is |
|---|---|---|
| `www.ashish.sbs` | `app/(site)/` | Main site — dark "OS" theme |
| `realty.ashish.sbs` | `app/realty/` | Property listing microsite, neutral theme |
| `smallbusinessforsale.ashish.sbs` | `app/smallbiz/` | Coming-soon page |

Plus `/admin` — an auth-gated CMS on the main domain only.

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16.2.9**, App Router, Turbopack |
| UI | React 19.2.4, TypeScript, **Tailwind v4** (CSS-first, `@theme inline`) |
| Data | **Prisma 6.19** → **Supabase Postgres** (transaction pooler) |
| Auth | **Auth.js v5 beta** (`next-auth@5.0.0-beta.31`), credentials provider + bcrypt |
| Email | Resend (lazy-initialised — a missing key never breaks the build) |
| Payments | Razorpay (strategy-call checkout only) |
| Fonts | Anton, Space Grotesk, Work Sans, IBM Plex Mono, Geist — via `next/font`, self-hosted at build |
| Tooling | pnpm 11.9, ESLint, Prettier, Vitest (6 test files, 43 tests) |

---

## 3. Accounts & infrastructure

**Identifiers only — no secrets in this repo.** See §4.

| Service | Account / identifier |
|---|---|
| **Local checkout** | `D:\AshishSBS-Platform` — the only folder needed |
| **GitHub** | `ashishnarayan9110-gif` → `AshishSBS`, branch `main` |
| **Vercel** | team `ashish-n`, CLI user `ashishnarayan9110-gif`, project `ashish-sbs` |
| **Supabase** | `ashishnarayan9110@gmail.com`, org `kvtqnvdtxkdhwpfusfpc`, project `ashish-sbs-platform` (ref `bwtuvlqvzqbcdqnwlzvi`, ap-south-1) |
| **Registrar / DNS** | **Hostinger** — nameservers `aurora/nebula.dns-parking.com` |
| **Email** | Resend — sending as `onboarding@resend.dev` until the domain is verified |
| **Payments** | Razorpay |

### Live DNS (edited in Hostinger, never in Vercel)

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |
| CNAME | `realty` | `f2889b2437a1896e.vercel-dns-017.com` |
| CNAME | `smallbusinessforsale` | `f2889b2437a1896e.vercel-dns-017.com` |
| A | `rikencare-demo` | `89.117.157.91` |

`ashish.sbs` 307s to `www.ashish.sbs`, which is production.

---

## 4. Secrets — where they live

Nothing secret is committed, and nothing secret should be added to any file
in this repo. Two locations only:

- **Local:** `.env` (gitignored). Keys in use: `DATABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
  `NEXT_PUBLIC_SITE_URL`, `AUTH_SECRET`. `.env.example` lists the full set
  including optional Resend/Razorpay keys.
- **Production:** Vercel dashboard → `ashish-sbs` → Settings → Environment
  Variables.

**Admin login is not SSO.** It's an Auth.js credentials provider: email +
bcrypt hash in the `User` table, seeded by `pnpm seed:admin`. Roles:
`FOUNDER · ADMINISTRATOR · EDITOR · CONTRIBUTOR · VIEWER · GUEST`.

---

## 5. Running it

```bash
pnpm install && pnpm prisma:generate && pnpm dev
```

http://localhost:3000. Subdomains are reachable at `/realty` and `/smallbiz`
locally — hostname routing only activates on real subdomains in production.

**Before committing:** `pnpm typecheck`, `pnpm test` and `pnpm build` should
all pass. `pnpm lint` exists too.

**Two Windows traps, both of which have cost real time:**

- `pnpm build` now runs `prisma generate` first, which **fails with `EPERM`
  while `pnpm dev` is running** — the dev server holds a lock on the
  query-engine DLL. Stop the dev server before building.
- After a production build, `next dev` returns **404 on every route** (while
  still rendering HTML, which makes it look like a routing bug). Fix:
  `rm -rf .next`.

**If the app can't reach the database locally**, it is almost certainly the
IPv6/NAT64 problem in §7 — not a credentials or Supabase issue. Production is
unaffected by it.

The Browser pane works; `/projects` and `/crew` were checked at 390px and
desktop in Aug 2026. Note it blocks some assets on the live domain
(`ERR_BLOCKED_BY_CLIENT`), which can make production look unstyled when it is
fine — verify live pages with `curl` rather than screenshots.

---

## 6. Architecture

```
app/(site)/(public)/   main-site pages — projects, ventures, crew, lab, about, services…
app/(site)/layout.tsx  applies .os theme + SiteHeader/SiteFooter
app/realty/            realty subdomain — own header/footer, neutral theme
app/smallbiz/          coming-soon subdomain
app/admin/             CMS, auth-gated, main domain only
app/api/               route handlers (contact, ideas, realty inquiry, waitlist, payments)
middleware.ts          hostname rewrites (before auth) + /admin gate
components/ui/         shared primitives — card, badge, container, listing-thumb
components/layout/     SiteHeader, SiteFooter, MobileNav
features/admin/        server actions + forms, one pair per content model
features/crew/         crew avatar, credit lines, JSON link parsing
lib/content.ts         every published-content query lives here
lib/prisma.ts          Prisma client — forces simple query mode (see §7)
prisma/schema.prisma   source of truth for the database
app/globals.css        theme tokens + global responsive guards
```

**Routing order matters:** `middleware.ts` rewrites subdomains *before* the
auth check, so realty/smallbiz never hit the admin gate.

**Theming:** neutral tokens are the default; the main site scopes a dark
palette under `.os` so the subdomains keep the neutral set.

**Content model** (Prisma): `Venture`, `Project`, `LabNote`, `Principle`,
`Resource`, `Service`, `CareerEntry`, `MonthlyReview`, `Article`, `Insight`,
`Book`, `Person`, plus `TimelineEvent`, `Lesson`, `ExternalLink`, `Media`,
tag join tables, the crew join tables (`PersonOnProject`,
`PersonOnVenture`, each carrying a `contribution` line), and submission
models (`ContactSubmission`, `IdeaSubmission`, `RealtyInquiry`,
`SmallBizWaitlist`, `StrategyCallBooking`).

`Project` carries `discipline` (`DIGITAL`/`FURNITURE`/`TEACHING`/`BUSINESS`/
`PERSONAL`/`OTHER`) and `outcomeStatus` (`SHIPPED`/`RUNNING`/`PAUSED`/
`FAILED`), so non-digital work and failed work are both first-class.

Everything public is DB-driven and filtered by `contentStatus: PUBLISHED`
(`DRAFT · SCHEDULED · PUBLISHED · ARCHIVED`). The exceptions are the
hand-written case studies `/projects/rikencare-lifesciences`,
`/projects/savison-life` and `/projects/indizilla`, static by design.

**A static page at `/projects/<slug>` shadows the dynamic `[slug]` route.**
All three current DB projects use those slugs, so the CMS project template
never renders in production today — worth knowing before debugging why a
change to it appears to do nothing.

---

## 7. Operational gotchas — read before touching infra

**Hostinger can silently hijack the apex.** In Jul 2026 the live site started
serving a 2.4 KB Hostinger placeholder instead of the real 47 KB app. Cause:
an `ALIAS @ → ashish.sbs.cdn.hstgr.net` record Hostinger added. DNS forbids
ALIAS and A on the same name, so the A record couldn't be re-added until the
ALIAS was deleted. **If the site ever "changes on its own", check that
first.** It can return if a hosting plan is attached to the domain.

**Two GitHub accounts on this machine.** This repo is
`ashishnarayan9110-gif`; Indizilla is `ancoryen`. Git Credential Manager will
otherwise reuse whichever was cached last and pushes 403. Already pinned:

```bash
git config credential.https://github.com.username ashishnarayan9110-gif
```

**Prisma owns the schema — but do NOT run `pnpm prisma:migrate`.** Never edit
tables in the Supabase dashboard either. That script is `prisma migrate dev`,
and there is **no `prisma/migrations/` directory — there never has been**.
This database was built with `db push`, so running `migrate dev` against it
makes Prisma detect drift and offer to **reset the database**, destroying
live content. There is no staging and no automated backup. See README →
Database for the safe procedure (offline `migrate diff` → review the SQL →
apply via `db push` or the Supabase migration API).

**Don't remove the simple-query-mode setting** in `lib/prisma.ts` — the
Supabase transaction pooler doesn't support prepared statements and queries
fail with "prepared statement does not exist" without it.

**Push to `main` = deploy to production.** There is no staging environment.

**Vercel restores `node_modules` from build cache, so `postinstall` may never
run.** A build log reading `Installing dependencies... Already up to date`
means pnpm short-circuited and `prisma generate` did *not* run. The build then
type-checks against a stale Prisma client, and any newly added model resolves
to `any` — surfacing as a baffling `implicitly has an 'any' type` error in a
file that is perfectly correct. This bit the project twice (`7f342ee`, then
the crew deploy). `build` is now `prisma generate && next build`; do not move
that back to `postinstall` alone.

**The database is unreachable from an IPv4-only machine.**
`db.<ref>.supabase.co` has no A record, and the session-pooler hostname may
resolve to NAT64 `64:ff9b::…` addresses that Prisma prefers and cannot route.
The symptom is `P1001 Can't reach database server` **even when a TCP test to
the same host succeeds** (the TCP tool picked IPv4). Fix: pin the pooler's
IPv4 address in the local `.env`. The correct session-pooler hostname is
`aws-1-ap-south-1.pooler.supabase.com`, found in the Supabase dashboard behind
the **Connect** button — there is no Database page under Project Settings in
the current UI. Vercel has IPv6 and is unaffected.

**Never hardcode a value the schema should carry.** `/projects/[slug]` once
printed a literal `"Live — still watching it"` as CURRENT STATE for every
project, including failed ones. It read as copy but was an unbacked factual
claim. If a page states a status, a field must supply it.

**RLS is on for every table, with no policies, by design.** Nothing uses the
Supabase JS client — all access is Prisma over a direct Postgres role, which
bypasses RLS. Three tables were exposed to the public anon key until Aug 2026.
**Any new table must have RLS enabled to match.**

**`pnpm seed:indizilla` is destructive-by-resurrection** — it recreates an
`IndiZilla` venture stub that was deliberately deleted (§8).

---

## 8. What changed recently (Jul 2026)

Three commits, all deployed and verified live:

`72344a3` — **Naming and information architecture**
- Nav "Evidence" → **Projects**; "What I'm Testing" → **Sandbox**.
- Copy on both rewritten plainly (the previous framing was overclaiming).
- `/principles` retired — it duplicated About. Now 307s to
  `/about#how-i-think`; About renders the CMS principles itself. Individual
  write-ups at `/principles/[slug]` still work and are linked from About.
- Homepage sections, footer, search result labels updated to match.

`9a39a25` — **Listings and responsive**
- `components/ui/listing-thumb.tsx` — 16:9 thumbnail using the CMS image
  when present, otherwise a placeholder derived deterministically from the
  slug (same slug → same mark).
- `/projects` now lists **ventures alongside projects**, newest first, each
  tagged `Venture` or `Project`. `/ventures` remains its own filtered view.
- All ten `/admin` tables were overflowing on phones — each is now inside a
  horizontally scrollable wrapper with a minimum width.
- Global guards in `app/globals.css`: word-break, media `max-width:100%`,
  `scroll-margin-top` for anchors under the sticky header, and 16px inputs
  under 640px so iOS stops zooming on focus.

`228e14d` — **Documentation** (this file and the README sections).

**Database change, already live and independent of any deploy:** the
`IndiZilla` **venture** record was deleted (an empty stub — no timeline,
lessons, links, media or tags). The separate Indizilla **project** and its
page at `/projects/indizilla` were deliberately kept. The deleted record, if
it's ever wanted back:

```json
{ "slug": "indizilla", "name": "IndiZilla", "status": "RESEARCH",
  "industry": "Consumer Platform",
  "summary": "Future consumer platform — currently in research.",
  "contentStatus": "PUBLISHED", "publishedAt": "2026-06-28T00:27:52.885Z" }
```

---

## 8b. What changed recently (Aug 2026)

`97a457d` — **Crew, and projects beyond digital work**
- `Person` + `PersonOnProject` / `PersonOnVenture` join tables, each credit
  carrying a `contribution` line. Public roster at `/crew`, dossiers at
  `/crew/[slug]`, credit lines on project and venture pages, admin CRUD at
  `/admin/people`. People are **DRAFT by default** and all crew queries filter
  on `PUBLISHED` — these are real, named people.
- `Project.discipline` and `Project.outcomeStatus`, with discipline filtering
  on `/projects`. A venture answers the Business filter.
- `Project.imageUrl`, closing the placeholder-thumbnail gap.
- Removed the hardcoded `"Live — still watching it"` string (see §7).
- Tests 25 → 43.

`1e2dc4c` — **`build` regenerates the Prisma client**, after a cached
`node_modules` skipped `postinstall` and failed the deploy above (see §7).

**Database changes, applied directly and independent of any deploy:** the crew
migration (additive only — 2 enums, 3 tables, 3 columns, RLS on the new
tables), and RLS enabled on `realty_listings`, `realty_inquiries` and
`smallbiz_waitlist`. All 32 tables now have RLS on.

The **creative direction changed deliberately**: the site's "never cinematic"
rule now has one carve-out, `/crew`, with aliases carrying over as short
credit lines elsewhere. See README → Creative direction.

---

## 9. Open items — nothing is mid-flight

No work is half-finished; the tree is clean and everything is pushed. These
are known gaps, not tasks in progress:

1. **No `prisma/migrations/` directory.** The database has no Prisma
   migration history, which is why `pnpm prisma:migrate` is dangerous (§7).
   Baselining it is the highest-value infrastructure task outstanding.
2. **The crew UI has never been seen with real people in it.** `/crew` and
   `/crew/[slug]` were only ever verified empty, and the dynamic
   `/projects/[slug]` template is shadowed by static pages for all three
   current projects — so its outcome line and credit block are unverified
   against real data.
3. **No per-project contribution input** in the admin project form. The
   column exists and renders publicly, but the form only assigns people; the
   line falls back to the person's role.
4. **Homepage still renders a Principles section** from the CMS. Only the
   standalone page was retired. Open question whether that section stays.
5. **Aliases and quirks describe real people.** Nothing publishes itself, but
   consent for a photo, an alias or a personal story is a human question the
   schema cannot answer.
6. **Resend domain not verified** — email sends from `onboarding@resend.dev`.
   Once verified, switch `RESEND_FROM_EMAIL` to an `@ashish.sbs` sender.
7. **Per-entry status metadata for Lab Notes.** Projects and ventures now have
   real status fields; lab notes still imply one in copy only. The richer
   `lastUpdated` / `iteration` / `openQuestions` idea remains unbuilt.
8. **Google Maps embed** on the realty listing is a branded fallback; no API
   key configured.

---

## 10. House style

- Plain, understated copy. No hype, no startup slang. If a line oversells,
  it gets cut — that's the whole point of the recent rename work.
- Content belongs in the CMS, not hardcoded in components (bar the noted
  static case studies).
- Comments explain *why*, not *what*, and only where the reason isn't obvious.
- Match surrounding code — this codebase is consistent; follow it rather
  than introducing new patterns.
- Confirm before anything irreversible: production DB writes, DNS changes,
  domain moves, force pushes.
