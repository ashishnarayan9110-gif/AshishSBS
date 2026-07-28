import Link from "next/link";

export const metadata = {
  title: "Indizilla — Client Operations Platform · Ashish Narayan",
  description:
    "The order-to-invoice platform behind a marketing agency's client operations — dashboard, à la carte ordering, jobs, billing, credits, and referrals, built on Supabase and Razorpay.",
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

export default function IndizillaProjectPage() {
  return (
    <>
      {/* Header */}
      <div className="dot-grid border-border border-b px-6 pt-16 pb-12 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <div className="font-meta text-muted mb-7 flex justify-between text-[11px] uppercase">
            <Link href="/projects" className="hover:text-foreground">
              ← Back to projects
            </Link>
            <span className="text-accent">Projects</span>
          </div>
          <h1 className="font-display text-[clamp(44px,8vw,110px)] leading-[0.9]">
            Indizilla
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#D9D2CF]">
            The client operations platform behind a marketing agency — orders, jobs,
            billing, credits, and referrals, running on one Postgres database instead of
            spreadsheets and a shared inbox. Live at{" "}
            <a
              href="https://indizilla.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-accent border-b pb-0.5"
            >
              indizilla.com
            </a>
            .
          </p>

          <div className="bg-border mt-12 grid grid-cols-2 gap-px lg:grid-cols-4">
            {[
              { label: "ROLE", value: "Build & architecture" },
              { label: "STACK", value: "Supabase · Razorpay · Vercel" },
              { label: "SURFACE", value: "Client + admin, one codebase" },
              { label: "STATUS", value: "Live" },
            ].map((f) => (
              <div key={f.label} className="bg-background px-4 pt-6 pb-4">
                <div className="font-meta text-muted text-[10px] uppercase">{f.label}</div>
                <div className="font-grotesk mt-2 text-base font-semibold break-words sm:text-lg">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="dot-grid border-border border-b px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width) space-y-14">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// Why this exists"}
            </div>
            <div className="max-w-2xl">
              <H3>An ordering system, not just a website</H3>
              <P>
                A marketing agency doesn&apos;t just need a homepage — it needs a place
                where a client can order work à la carte, a place where that order
                becomes a tracked job with a due date, an invoice that generates itself,
                and a way to reward referrals without a spreadsheet quietly going stale.
                Indizilla is that system: a static client-facing frontend backed by a
                single Postgres database that owns every one of those steps.
              </P>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// What actually happened"}
            </div>
            <div className="max-w-2xl">
              <H3>The data layer does the enforcing, not the frontend</H3>
              <P>
                The client platform covers a dashboard, à la carte ordering, an admin
                console, and tracked jobs, bills, credits, and referrals. One data
                module (<code className="text-sm">js/db.js</code>) exposes a single API
                that runs against either Supabase (when a real key is configured) or
                local storage in demo mode — so the same frontend runs standalone before
                a client&apos;s account even exists.
              </P>
              <P>
                The important decision is where the trust boundary sits. Reads come from
                an in-memory cache filled once at init; writes go through Row-Level
                Security policies and a small set of security-definer Postgres functions
                — <code className="text-sm">place_order</code>,{" "}
                <code className="text-sm">redeem_referral</code>,{" "}
                <code className="text-sm">admin_adjust_credits</code>,{" "}
                <code className="text-sm">my_referral_code</code>. A client&apos;s browser
                can never write a job or an invoice table directly. Placing an order
                triggers server-side creation of both the job (with its due date) and the
                invoice (<code className="text-sm">INV-year-seq</code>), and every coupon
                or credit balance is re-validated in Postgres at order time — the
                client-side math is display only, never the source of truth.
              </P>
              <P>
                Admin rights are enforced the same way: by row-level policy in the
                database, not by a role check in the frontend that a client could work
                around.
              </P>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="font-meta text-accent text-[11px] uppercase">
              {"// Where it stands now"}
            </div>
            <div className="max-w-2xl">
              <H3>Payments are live; verification is the open item</H3>
              <P>
                Checkout runs client-side against Razorpay using a public key ID.
                Payment records in the database are currently unverified references —
                signature verification and webhook confirmation are the deliberate next
                step, planned as a Supabase Edge Function rather than shipped ahead of
                need. Google sign-in is wired through Supabase Auth rather than
                hand-rolled, with the OAuth exchange handled entirely on Supabase&apos;s
                side of the boundary.
              </P>
            </div>
          </div>

          <div className="border-border border-t pt-8">
            <Eyebrow>{"// What I'd do differently now"}</Eyebrow>
            <ul className="max-w-2xl space-y-4">
              {[
                "Ship the Edge Function for Razorpay signature verification before treating any payment record as confirmed — right now that's an honest gap, not an oversight.",
                "The demo-mode fallback (local storage when no Supabase key is set) was the right call for early iteration, but it's a trap if left in production longer than needed — worth an explicit build-time check that fails loudly if it's ever live with real traffic.",
              ].map((text, i) => (
                <li key={text} className="flex gap-4">
                  <span className="font-meta text-muted text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-[#D9D2CF]">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="dot-grid px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-(--layout-max-width)">
          <Eyebrow>Credits & scope</Eyebrow>
          <div className="text-muted max-w-2xl space-y-4 text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">Scope of this entry.</strong> This page
              documents the platform architecture only — database design, payment flow,
              and auth. It intentionally does not describe Indizilla&apos;s marketing
              services or brand positioning, since that content hasn&apos;t been written
              up yet.
            </p>
            <p>
              <strong className="text-foreground">Status.</strong> Live at{" "}
              <a
                href="https://indizilla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                indizilla.com
              </a>
              . Payment signature verification is a known, unshipped gap — see above.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
