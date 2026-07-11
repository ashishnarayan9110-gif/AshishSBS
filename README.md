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
Never motivational, preachy, arrogant, self-important, fake-humble,
corporate, or cinematic. Show decisions instead of claiming intelligence;
show work instead of claiming expertise; show evidence instead of claiming
authenticity.

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
| `/projects` | Evidence | *"What the ventures actually produced — the assumption I started with, what turned out to be true, and what I'd do differently now."* |
| `/projects/[slug]` | (project title) | *Evidence* eyebrow. Sections: *Why this exists / What actually happened / Where it stands now*, plus *"What I'd do differently now"* (lessons). Ends with a link to the next entry. |
| `/projects/rikencare-lifesciences` | Rikencare Lifesciences | Two-part case study: brand system + website build, for a WHO-GMP pharma manufacturer. Standalone static page (not CMS-driven), see project-specific credits block. |
| `/projects/savison-life` | Savison Life | Founder-perspective case study: problem, brand system, four-portal platform architecture, stack, and an explicit "gaps" section. Standalone static page. |
| `/principles` | Working Theories | *"Beliefs I currently hold and keep testing against reality — not settled truths, just the best explanation I have until something breaks it."* |
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
| `realty.ashish.sbs` | `/realty` | Personal real-estate advisory brand ("Performance Realty") — single live listing (HSIIDC SCO, Barwala), inquiry form → email via Resend, DB-backed `RealtyListing`/`RealtyInquiry` models. Independent header/footer, neutral theme (not `.os`). | Code live; **DNS/Vercel domain being connected** — see Known gaps. |
| `smallbusinessforsale.ashish.sbs` (alias `smallbiz.`) | `/smallbiz` | "Buy Your Next Business" — coming-soon page with email waitlist capture (`SmallBizWaitlist` model). | Code live; **DNS/Vercel domain being connected** — see Known gaps. |
| `rikencare-demo.ashish.sbs` | — | Separately hosted client demo site (not part of this Next.js project). Referenced from the Rikencare case study page. | Live, external to this repo. |

Locally, since middleware host-matching only fires with a real hostname,
these are reachable directly at `/realty` and `/smallbiz` on
`localhost:PORT`.

### Admin (`/admin`, auth-protected, main domain only)

CMS for every content model below: career entries, contact submissions
(read-only), idea submissions, insights, lab notes, monthly reviews,
principles, projects, resources, services, strategy-call bookings, ventures.
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

- **`realty.ashish.sbs` DNS + Vercel domain** — CNAME added at the registrar,
  Vercel domain entry created; propagation/validation in progress as of the
  last check (was showing "Invalid Configuration" pending DNS).
- **`smallbusinessforsale.ashish.sbs` DNS + Vercel domain** — same status as
  above.
- **Resend domain verification for `ashish.sbs`** — once verified, switch
  `RESEND_FROM_EMAIL` from `onboarding@resend.dev` to a real
  `@ashish.sbs` sender.
- **Per-entry status/iteration metadata** (Lab Notes / Ventures / Projects)
  — the "living document" framing in copy (*"Still open," "Current
  state"*) is not yet backed by real schema fields (e.g. `status`,
  `lastUpdated`, `iteration`, `openQuestions`). Currently simulated in
  static page copy only; a real implementation needs a `prisma/schema.prisma`
  migration plus admin CMS fields.
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
| `pnpm build`            | Production build                          |
| `pnpm lint`             | ESLint                                    |
| `pnpm typecheck`        | `tsc --noEmit`                            |
| `pnpm format`           | Prettier write                            |
| `pnpm prisma:migrate`   | Create/apply a local migration            |
| `pnpm prisma:studio`    | Browse the database                       |
| `pnpm prisma:seed`      | Run the main content seed                 |
| `pnpm seed:admin`       | Seed the admin user                       |
| `pnpm seed:realty`      | Seed the realty listing (Barwala HSIIDC)  |
| `pnpm seed:rikencare`   | Seed the Rikencare case-study project     |
| `pnpm seed:savison`     | Seed the Savison Life case-study project  |

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
except the two standalone case-study pages (`rikencare-lifesciences`,
`savison-life`), which are static by design since their content is a
one-off, richly-formatted narrative rather than a repeatable content type.
Apply schema changes via `pnpm prisma:migrate` locally (or `prisma db push`
when resolving drift), then commit the generated migration.

## Deployment

Vercel project `ashish-sbs` tracks `main`, deploying automatically on every
push. Production env vars are configured in the Vercel dashboard; never
commit `.env`. Domains currently attached: `ashish.sbs` (redirects to
`www`), `www.ashish.sbs` (production), plus the pending realty/smallbiz
subdomains above.
