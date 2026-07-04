import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getPublishedListings } from "@/lib/realty";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Performance Realty for Serious Buyers",
  description:
    "I source, research and negotiate exclusive industrial and commercial opportunities before the market does. Not a broker — an acquisition strategist.",
};

export default async function RealtyHomePage() {
  const listings = await getPublishedListings();

  return (
    <>
      {/* Hero */}
      <Container width="content" className="py-24">
        <p className="text-muted text-sm">Performance Realty</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Finding Opportunities<br />Before the Market Does.
        </h1>
        <p className="text-muted mt-6 text-lg leading-relaxed">
          I don't list hundreds of properties. I curate a small number of high-upside
          opportunities — industrial, commercial, and strategic acquisitions — then
          research, validate, and negotiate them properly.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton href="#listings">View Exclusive Listing</LinkButton>
          <LinkButton href="#about" variant="secondary">
            What is Performance Realty?
          </LinkButton>
        </div>
      </Container>

      {/* About */}
      <Container id="about" className="border-border border-t py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-widest">
              What is Performance Realty?
            </p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight">
              Research. Negotiation. Execution.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-muted">
              Traditional brokers move volume. I move value. Performance Realty is
              a different model — I identify opportunities with structural upside,
              conduct rigorous due diligence, and represent buyers through to
              acquisition.
            </p>
            <p className="text-muted">
              My background is in building businesses — not selling them. I
              understand what makes an asset actually worth owning: cash-flow
              potential, location thesis, title integrity, tenant mix, and
              operational flexibility. I apply that lens to every opportunity I work
              with.
            </p>
            <p className="text-muted">
              If you're looking for a serious industrial or commercial acquisition,
              not a quick transaction — you're in the right place.
            </p>
          </div>
        </div>
      </Container>

      {/* Approach pillars */}
      <Container className="pb-20">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Research",
              body: "Every listing starts with a location thesis, demand analysis, and title verification before I present it to anyone.",
            },
            {
              label: "Negotiation",
              body: "I represent buyers. My job is to secure the best price and terms — not to split a commission with the seller's agent.",
            },
            {
              label: "Due Diligence",
              body: "Clean title, legal review, infrastructure check, tenancy analysis — done before you commit, not after.",
            },
          ].map((p) => (
            <li
              key={p.label}
              className="border-border rounded-lg border p-6"
            >
              <p className="font-medium">{p.label}</p>
              <p className="text-muted mt-2 text-sm leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Listings */}
      <Container
        id="listings"
        className="border-border border-t py-20"
      >
        <p className="text-muted text-xs font-medium uppercase tracking-widest">
          Exclusive Listings
        </p>
        <h2 className="mt-4 text-2xl font-medium tracking-tight">
          Current Opportunities
        </h2>
        <p className="text-muted mt-2 text-sm">
          I work with a small number of listings at any time. Quality over volume.
        </p>

        {listings.length === 0 ? (
          <div className="border-border mt-8 rounded-lg border p-8 text-center">
            <p className="text-muted text-sm">
              No active listings at this time. Enquire to be notified of new
              opportunities.
            </p>
            <div className="mt-4">
              <LinkButton href="#enquire" variant="secondary">
                Express Interest
              </LinkButton>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {listings.map((listing) => (
              <li key={listing.id}>
                <Link
                  href={`/listing/${listing.slug}`}
                  className="border-border hover:border-foreground/30 block rounded-lg border p-6 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-muted text-xs font-medium uppercase tracking-widest">
                        Exclusive Opportunity
                      </p>
                      <p className="mt-2 font-medium">{listing.title}</p>
                      <p className="text-muted mt-1 text-sm">{listing.location}</p>
                    </div>
                    <span className="bg-muted-background text-muted shrink-0 rounded px-2 py-1 text-xs">
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-muted mt-4 text-sm leading-relaxed line-clamp-2">
                    {listing.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">{listing.priceLabel}</p>
                      {listing.negotiable && (
                        <p className="text-muted text-xs">Negotiable</p>
                      )}
                    </div>
                    <span className="text-muted text-sm">View Details →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>

      {/* CTA */}
      <Container id="enquire" width="content" className="border-border border-t py-24 text-center">
        <p className="text-lg font-medium">Serious about acquiring something?</p>
        <p className="text-muted mt-2 text-sm">
          Share what you're looking for. I'll come back to you directly.
        </p>
        <div className="mt-6">
          <LinkButton href="/listing/barwala-hsiidc-sco#enquire">
            Express Interest in Current Listing
          </LinkButton>
        </div>
      </Container>
    </>
  );
}
