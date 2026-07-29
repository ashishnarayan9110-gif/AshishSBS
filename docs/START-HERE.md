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
| Tooling | pnpm 11.9, ESLint, Prettier, Vitest (4 test files) |

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

**Before committing:** `pnpm typecheck` and `pnpm build` should both pass.
`pnpm lint` and `pnpm test` exist too.

Note for agent sessions: the Browser pane in this environment has been
unreliable (hidden pane → JS evaluation and screenshots time out).
Verification has been done via `curl` against `localhost:3000`, typecheck and
production build. Visual checks at each breakpoint have **not** been done.

---

## 6. Architecture

```
app/(site)/(public)/   main-site pages — projects, ventures, lab, about, services…
app/(site)/layout.tsx  applies .os theme + SiteHeader/SiteFooter
app/realty/            realty subdomain — own header/footer, neutral theme
app/smallbiz/          coming-soon subdomain
app/admin/             CMS, auth-gated, main domain only
app/api/               route handlers (contact, ideas, realty inquiry, waitlist, payments)
middleware.ts          hostname rewrites (before auth) + /admin gate
components/ui/         shared primitives — card, badge, container, listing-thumb
components/layout/     SiteHeader, SiteFooter, MobileNav
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
`Book`, plus `TimelineEvent`, `Lesson`, `ExternalLink`, `Media`, tag join
tables, and submission models (`ContactSubmission`, `IdeaSubmission`,
`RealtyInquiry`, `SmallBizWaitlist`, `StrategyCallBooking`).

Everything public is DB-driven and filtered by `contentStatus: PUBLISHED`
(`DRAFT · SCHEDULED · PUBLISHED · ARCHIVED`). The two exceptions are the
hand-written case studies `/projects/rikencare-lifesciences` and
`/projects/savison-life`, static by design, plus `/projects/indizilla`.

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

**Prisma owns the schema.** Never edit tables in the Supabase dashboard.
Change `prisma/schema.prisma` → `pnpm prisma:migrate` → commit the migration.

**Don't remove the simple-query-mode setting** in `lib/prisma.ts` — the
Supabase transaction pooler doesn't support prepared statements and queries
fail with "prepared statement does not exist" without it.

**Push to `main` = deploy to production.** There is no staging environment.

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

## 9. Open items — nothing is mid-flight

No work is half-finished; the tree is clean and everything is pushed. These
are known gaps, not tasks in progress:

1. **Projects have no image field.** Every project thumbnail is a
   placeholder. Ventures have `logoUrl` but it's null on all of them.
   Real project images need a `prisma/schema.prisma` migration against
   production — not done unilaterally.
2. **Homepage still renders a Principles section** from the CMS. Only the
   standalone page was retired. Open question whether that section stays.
3. **Resend domain not verified** — email sends from `onboarding@resend.dev`.
   Once verified, switch `RESEND_FROM_EMAIL` to an `@ashish.sbs` sender.
4. **Per-entry status metadata** (`status`, `lastUpdated`, `iteration`,
   `openQuestions`) is implied by the copy but not backed by schema fields.
5. **No visual QA at breakpoints** — see §5.
6. **Google Maps embed** on the realty listing is a branded fallback; no API
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
