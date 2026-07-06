import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Savison Life — Founder Case Study · Ashish Narayan",
  description:
    "Building India's compliance-gated marketplace for third-party pharmaceutical manufacturing — the problem, the brand system, the four-portal platform, and the honest gaps. Told from the founder's seat.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-meta text-accent mb-4 text-[11px] uppercase">{children}</div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-grotesk text-xl font-semibold sm:text-2xl">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-[#D9D2CF]">{children}</p>;
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-accent my-10 border-l-2 pl-6">
      <p className="font-grotesk text-xl leading-relaxed font-medium sm:text-2xl">
        {children}
      </p>
    </blockquote>
  );
}

const SAVISON_PALETTE = [
  { hex: "#002233", name: "Midnight Dreams", role: "60% · Foundation", light: false },
  { hex: "#11425D", name: "Neptune's Wrath", role: "24% · Panels", light: false },
  { hex: "#C0D6EA", name: "Pacific Panorama", role: "11% · Tints", light: true },
  { hex: "#DDFF55", name: "Isotonic Water", role: "5% · The signal", light: true },
  { hex: "#F6F2E8", name: "Cheviot", role: "Paper surfaces", light: true },
] as const;

export default function SavisonCaseStudyPage() {
  return (
    <>
      {/* Header */}
      <div className="dot-grid border-border border-b px-6 pt-16 pb-12 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <div className="font-meta text-muted mb-7 flex justify-between text-[11px] uppercase">
            <Link href="/projects" className="hover:text-foreground">
              ← Back to index
            </Link>
            <span className="text-accent">● Founder case study</span>
          </div>
          <h1 className="font-display text-[clamp(44px,8vw,110px)] leading-[0.9]">
            Savison Life
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#D9D2CF]">
            India&apos;s compliance-gated B2B marketplace for third-party pharmaceutical
            manufacturing — built from zero as founder, brand designer, and systems
            engineer. Live at{" "}
            <a
              href="https://savisonlife.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-accent border-b pb-0.5"
            >
              savisonlife.com
            </a>
            .
          </p>

          <div className="bg-border mt-12 grid grid-cols-2 gap-px lg:grid-cols-4">
            {[
              { label: "ROLE", value: "Founder · Design · Build" },
              { label: "SURFACE", value: "4 portals, 1 codebase" },
              { label: "CATALOG", value: "214 NLEM products" },
              { label: "STATUS", value: "Live · Pre-launch ops" },
            ].map((f) => (
              <div key={f.label} className="bg-background px-4 pt-6 pb-4">
                <div className="font-meta text-muted text-[10px] uppercase">{f.label}</div>
                <div className="font-grotesk mt-2 text-base font-semibold sm:text-lg">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wordmark band */}
      <div className="border-border flex items-center justify-center border-b bg-[#002233] px-6 py-16">
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/projects/savison/wordmark-white.png"
            alt="savison life. wordmark"
            width={520}
            height={90}
            className="h-auto w-[min(520px,80vw)]"
          />
          <span className="font-meta text-[11px] tracking-[0.3em] text-[#7E93A8] uppercase">
            The verified pharma marketplace
          </span>
        </div>
      </div>

      {/* ============ THE PROBLEM ============ */}
      <div className="dot-grid border-border border-b px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-(--layout-max-width) gap-10 lg:grid-cols-[220px_1fr]">
          <div className="font-meta text-accent text-[11px] uppercase">{"// The problem"}</div>
          <div className="max-w-2xl">
            <H3>A gap almost embarrassing in how obvious it is</H3>
            <P>
              A small or mid-size pharmaceutical brand in India that wants to manufacture
              its own branded medicines — paracetamol under their own label, a cough
              syrup, an ORS sachet line — has no clean way to find a verified,
              drug-licence-checked third-party manufacturer. They either know someone: a
              broker, a relative in the trade, a contact from a trade show. Or they
              don&apos;t, in which case they&apos;re cold-calling factories off a generic
              B2B directory listing with zero way to confirm the factory is even legally
              allowed to manufacture what it claims.
            </P>
            <P>
              Everything that exists today is either a generic directory — no
              pharma-specific compliance layer, no transaction handling, everything after
              the phone number happens off-platform with no recourse — or a relationship.
              A person, not a platform. I spent enough time inside this trade to see the
              wedge clearly:
            </P>
            <PullQuote>
              India has no compliance-gated, transactional marketplace for third-party
              pharmaceutical manufacturing. So I built one.
            </PullQuote>
            <P>
              Three fears keep a buyer from sourcing: unverified factories (a licence
              claimed in a PDF is not a licence proven), opaque commercial terms (hidden
              MOQs, moving prices, unclear stock), and regulatory and payment exposure
              (no escrow, no audit trail — every transaction a leap of faith). Savison
              Life is positioned as the gate between that risk and a settled deal.
            </P>
          </div>
        </div>
      </div>

      {/* ============ PART ONE — BRAND ============ */}
      <div className="dot-grid border-border border-b px-6 pt-16 pb-4 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <Eyebrow>Part one</Eyebrow>
          <h2 className="font-display text-[clamp(32px,5vw,64px)]">The brand system</h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            Before a single component was coded, I wrote the brand — a full guideline
            volume covering foundation, identity, visual system, and application. In a
            trust-scarce trade, the identity is not decoration. It is the first
            compliance document a buyer reads.
          </p>
        </div>
      </div>

      <div className="dot-grid border-border border-b px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width) space-y-14">
          {/* Positioning */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// Positioning"}
            </div>
            <div className="max-w-2xl">
              <H3>Nothing trades until it clears the gate</H3>
              <P>
                The positioning is &ldquo;operational infrastructure — not a
                directory.&rdquo; We verify, gate and settle. Verification is the product:
                licences, GMP status and batch records are checked before listing, not
                claimed in a profile. Three brand pillars carry that idea — sovereign
                validation, precise alignment, transparent flow — and every visual
                decision downstream had to serve one of them.
              </P>
              <P>
                The architecture is a branded house: one identity across four permissioned
                portals (www, manufacturer, admin, apply), distinguished only by a mono
                portal tag next to the wordmark. Subdomains are descriptive, never
                sub-brands.
              </P>
            </div>
          </div>

          {/* Wordmark */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// The mark"}
            </div>
            <div className="max-w-2xl">
              <H3>Lowercase, tight, and finished with a full stop</H3>
              <div className="mt-6 flex items-center justify-center bg-[#F6F2E8] px-8 py-14">
                <Image
                  src="/projects/savison/wordmark-black.png"
                  alt="savison life. wordmark on Cheviot"
                  width={420}
                  height={74}
                  className="h-auto w-[min(420px,70vw)]"
                />
              </div>
              <P>
                The wordmark is League Spartan set lowercase at −94 tracking, closed with
                a deliberate full stop — part of the mark, never omitted. It reads as a
                finished statement: verified, settled, done. The compact symbol distils
                it to the S and its full stop in a rounded tile that recolours with the
                theme, legible down to a 16px favicon.
              </P>
              <div className="mt-6 flex gap-4">
                {["symbol-midnight", "symbol-cheviot", "symbol-lime"].map((s) => (
                  <div
                    key={s}
                    className="flex h-24 w-24 items-center justify-center border border-[#292723]"
                    style={{
                      background: s === "symbol-cheviot" ? "#11425D" : "#F6F2E8",
                    }}
                  >
                    <Image
                      src={`/projects/savison/${s}.png`}
                      alt={`Savison ${s.replace("symbol-", "")} tile`}
                      width={56}
                      height={56}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colour */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">{"// Colour"}</div>
            <div className="max-w-2xl">
              <H3>One accent, held to five percent</H3>
              <div className="mt-6 grid grid-cols-5 gap-px bg-[#292723] text-xs">
                {SAVISON_PALETTE.map((c) => (
                  <div key={c.hex} className="bg-background">
                    <div className="h-16 w-full" style={{ backgroundColor: c.hex }} />
                    <p className="font-grotesk mt-2 px-1 leading-tight font-semibold">
                      {c.name}
                    </p>
                    <p className="font-meta text-muted px-1">{c.hex}</p>
                    <p className="text-muted px-1 pb-2">{c.role}</p>
                  </div>
                ))}
              </div>
              <P>
                Proportion is the discipline: 60% Midnight, 24% Neptune, 11% Pacific
                tints, and Isotonic lime capped under 5% of any screen. Lime is never
                decorative — it marks exactly three things: a verified status, an active
                step, and the single primary action. Dense compliance data sits calmly on
                deep, even fields; documents flip to Cheviot paper with Midnight ink.
              </P>
              <P>
                Type follows the same three-voice logic as the palette: League Spartan for
                display, DM Sans for UI and prose, DM Mono for the things that must read
                as records — batch IDs, licence numbers, MOQs, escrow figures.
              </P>
            </div>
          </div>

          {/* Voice */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">{"// Voice"}</div>
            <div className="max-w-2xl">
              <H3>Crisp, institutional, exact</H3>
              <P>
                &ldquo;Batch SVN-2284-A cleared GMP verification on 14 Jun.&rdquo; Not
                &ldquo;Great news — your awesome batch is all good to go!&rdquo; The voice
                rule falls straight out of the positioning: a platform selling certainty
                cannot sound uncertain, and a platform selling verification cannot
                overpromise. Say it plainly, lead with the check, quantify everything.
              </P>
            </div>
          </div>
        </div>
      </div>

      {/* ============ PART TWO — PLATFORM ============ */}
      <div className="dot-grid border-border border-b px-6 pt-16 pb-4 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <Eyebrow>Part two</Eyebrow>
          <h2 className="font-display text-[clamp(32px,5vw,64px)]">The platform</h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            Four portals, one Next.js codebase, one database, routed by subdomain — the
            place where the inquiry, packaging spec, negotiation, compliance checklist,
            payment, and production tracking all actually happen.
          </p>
        </div>
      </div>

      <div className="dot-grid border-border border-b px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width) space-y-14">
          {/* Four doors */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// Architecture"}
            </div>
            <div>
              <H3>One brand, four doors</H3>
              <div className="bg-border mt-6 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    tag: "www.",
                    name: "Marketplace",
                    desc: "The buyer storefront — browse verified inventory, compare listings, open deals.",
                  },
                  {
                    tag: "manufacturer.",
                    name: "Supply",
                    desc: "The factory console — list against the curated catalog, manage MOQs, licences, payouts.",
                  },
                  {
                    tag: "admin.",
                    name: "Control",
                    desc: "The ops core — verification, disputes, invoice review, a single Command Center dashboard.",
                  },
                  {
                    tag: "apply.",
                    name: "Onboarding",
                    desc: "The gate itself — where a factory submits for licence and GSTIN verification.",
                  },
                ].map((p) => (
                  <div key={p.tag} className="bg-muted-background p-6">
                    <div className="font-meta text-accent text-[12px]">{p.tag}</div>
                    <div className="font-grotesk mt-2 text-lg font-semibold">{p.name}</div>
                    <div className="text-muted mt-2 text-sm leading-relaxed">{p.desc}</div>
                  </div>
                ))}
              </div>
              <P>
                The compliance gate is enforced in the system, not the pitch deck. A
                manufacturer cannot list — and a buyer cannot see them — until their drug
                licence and GSTIN clear admin review, and until their Approved Product
                List has been checked to establish exactly which formulations they are
                legally cleared to produce. That check is then enforced against every new
                listing and product proposal.
              </P>
            </div>
          </div>

          {/* Systems design */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// Systems design"}
            </div>
            <div className="max-w-2xl">
              <H3>Owning the transaction, not the introduction</H3>
              <P>
                As a systems designer, the core decision was that the platform must own
                the full transaction lifecycle inside one audit trail. A buyer verifies
                their GSTIN live against the government registry, uploads a drug licence,
                searches a 214-product generic catalog built from the official CDSCO
                National List of Essential Medicines — by INN, not brand — and compares
                manufacturers side by side on price, MOQ, lead time, and rating.
              </P>
              <P>
                Packaging is specified through a four-step illustrated wizard — bottle,
                cap, label material, carton, shrink wrap — that also walks the buyer
                through the CDSCO mandatory-label compliance checklist. Negotiation
                happens in a structured Deal Room scoped to one inquiry: chat, file
                sharing, and live price revision where an agreed change recalculates the
                platform fee, order total, and proforma invoice automatically, audit-logged
                in the thread. Payment clears via Razorpay or admin-confirmed bank
                transfer; orders then move through a fixed nine-stage pipeline from Under
                Review to Completed, ending in bidirectional ratings.
              </P>
              <P>
                The manufacturer side attacks the trade&apos;s single worst pain point
                directly: payouts within 24 business hours of payment confirmation,
                instead of the 30/60/90-day terms distributors impose today. Listings are
                free; revenue is a transparent platform fee on the transaction itself.
              </P>
            </div>
          </div>

          {/* Stack */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">{"// Stack"}</div>
            <div>
              <div className="bg-border grid grid-cols-2 gap-px lg:grid-cols-4">
                {[
                  { label: "FRAMEWORK", value: "Next.js 14 App Router · TypeScript strict" },
                  { label: "DATA", value: "Prisma 6 · Supabase Postgres" },
                  { label: "PAYMENTS", value: "Razorpay + manual UPI/bank flow" },
                  { label: "VERIFICATION", value: "Live GSTIN API (Sandbox.co.in)" },
                  { label: "AUTH", value: "NextAuth — Google + phone OTP (MSG91)" },
                  { label: "EMAIL", value: "SendGrid transactional" },
                  { label: "HOSTING", value: "Vercel · GitHub CI" },
                  { label: "ENCRYPTION", value: "Field-level encryption for KYC data" },
                ].map((f) => (
                  <div key={f.label} className="bg-background px-4 pt-5 pb-4">
                    <div className="font-meta text-muted text-[10px] uppercase">
                      {f.label}
                    </div>
                    <div className="font-grotesk mt-2 text-sm font-semibold">{f.value}</div>
                  </div>
                ))}
              </div>
              <P>
                Everything renders from the brand&apos;s design tokens — the
                Midnight/Neptune/Isotonic system, League Spartan and DM Mono, a real
                site-wide light/dark toggle where dark is the product default and light is
                paper: invoices, certificates, print.
              </P>
            </div>
          </div>

          {/* The gaps */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// The gaps"}
            </div>
            <div className="max-w-2xl">
              <H3>What I refuse to pretend is solved</H3>
              <P>
                Disintermediation is the existential marketplace question, and nothing
                technically prevents a buyer and manufacturer from going direct after deal
                one. The honest strategy isn&apos;t to make leaving impossible — it&apos;s
                to make staying cheaper than leaving: the platform does the paperwork
                (GST-referenced invoices, compliance checklists, packaging specs, order
                history) that a small brand owner would otherwise recreate by hand,
                dispute mediation matters most precisely when something goes wrong, and a
                manufacturer&apos;s reputation capital — ratings, review history — lives
                on-platform.
              </P>
              <P>
                The moat is thin and I say so: operational discipline — verification
                turnaround, payout speed, dispute fairness — more than unreplicable
                technology. The admin layer is real operating cost, not a footnote. GST
                is itemized as a reference breakdown but not yet collected through the
                platform — a deliberate, conservative scope decision until volumes justify
                the compliance overhead. And the whole thing currently runs on free-tier
                infrastructure with documented, already-hit constraints — including a
                Vercel cron limit that once silently blocked an entire production deploy.
                Every one of these is written down in the project&apos;s founder bible,
                because a compliance business that lies to itself about its own gaps has
                no business selling certainty.
              </P>
              <PullQuote>
                The differentiation is the stack, not any single feature — and the moat
                is discipline, not code.
              </PullQuote>
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="dot-grid border-border border-b px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <Eyebrow>Credits & scope</Eyebrow>
          <div className="text-muted max-w-2xl space-y-4 text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">Roles.</strong> Founder, brand strategy
              and identity (wordmark, symbol, guideline volume, colour and type system,
              voice), product design, and full-stack engineering: Ashish Narayan. Built
              with the assistance of AI tooling throughout — direction, decisions, and
              final approval are my own.
            </p>
            <p>
              <strong className="text-foreground">Status.</strong> Live at savisonlife.com
              across all four portals. Pre-launch operationally: manufacturer onboarding
              and catalog depth are actively being built out; demo inventory is present
              for testing and is labelled as such internally.
            </p>
            <p>
              <strong className="text-foreground">Honest metrics.</strong> No GMV, client
              counts, or performance figures are claimed — the platform is pre-revenue at
              the time of writing. Numbers on this page (214 catalog products, fee
              structure, payout windows) describe how the system is built, not traction.
            </p>
            <p>
              <strong className="text-foreground">Sector note.</strong> B2B, for licensed
              pharmaceutical buyers and manufacturers in India. Nothing here is medical
              advice or a claim about any drug product.
            </p>
          </div>
        </div>
      </div>

      {/* Next */}
      <div className="dot-grid px-6 py-20 sm:px-10">
        <div className="mx-auto flex max-w-(--layout-max-width) flex-col gap-5">
          <span className="font-meta text-muted text-[11px] uppercase">Next entry</span>
          <Link
            href="/projects/rikencare-lifesciences"
            className="border-border flex items-baseline justify-between gap-6 border-b pb-8"
          >
            <span className="font-display text-[clamp(28px,5vw,60px)] leading-none">
              Rikencare Lifesciences
            </span>
            <span className="text-accent text-2xl">↗</span>
          </Link>
        </div>
      </div>
    </>
  );
}
