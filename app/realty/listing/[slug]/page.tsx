import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getListing } from "@/lib/realty";
import { RealtyInquiryForm } from "@/features/realty/inquiry-form";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};
  return {
    title: `${listing.title} — ${listing.location}`,
    description: listing.summary,
    openGraph: {
      title: `${listing.title} — Ashish Realty`,
      description: listing.summary,
      type: "website",
    },
  };
}

type Spec = { label: string; value: string; valueSmall?: string; highlight?: boolean; description: string };
type UseItem = { title: string; description: string };
type LocationPoint = { title: string; description: string };
type WhyNowItem = { eyebrow: string; title: string; description: string };
type Stat = { value: string; label: string };
type Pillar = { roman: string; title: string; description: string };

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();

  const specs = listing.specifications as Spec[];
  const uses = listing.permittedUses as UseItem[];
  const locationPoints = listing.locationPoints as LocationPoint[];
  const whyNow = listing.whyNow as WhyNowItem[];
  const stats = listing.stats as Stat[];
  const pillars = listing.pillars as Pillar[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barwala",
      addressRegion: "Panchkula, Haryana",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: listing.priceLabel,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="border-border border-b">
        <Container width="content" className="py-16">
          <p className="text-muted text-xs font-medium uppercase tracking-widest">
            Exclusive Listing · {listing.status}
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">{listing.title}</h1>
          {listing.subtitle && (
            <p className="text-muted mt-1 text-lg">{listing.subtitle}</p>
          )}
          <p className="text-muted mt-6 leading-relaxed">{listing.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div>
              <p className="text-2xl font-medium">{listing.priceLabel}</p>
              {listing.negotiable && (
                <p className="text-muted text-sm">Negotiable</p>
              )}
            </div>
            <a
              href="#enquire"
              className="bg-foreground text-background rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            >
              Express Interest
            </a>
            <a
              href="#enquire"
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              Schedule Visit →
            </a>
          </div>
        </Container>
      </div>

      {/* Specifications */}
      <Container className="py-16">
        <p className="text-muted text-xs font-medium uppercase tracking-widest">
          Property Specifications
        </p>
        <h2 className="mt-3 text-2xl font-medium">The Asset at a Glance</h2>
        <div className="border-border mt-8 divide-y divide-[var(--border)] overflow-hidden rounded-lg border">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className={`grid grid-cols-1 gap-4 p-6 sm:grid-cols-3 ${spec.highlight ? "bg-muted-background" : ""}`}
            >
              <div>
                <p className="text-muted text-xs font-medium uppercase tracking-widest">
                  {spec.label}
                </p>
                <p className="mt-2 text-2xl font-medium">{spec.value}</p>
                {spec.valueSmall && (
                  <p className="text-muted text-sm">{spec.valueSmall}</p>
                )}
                {spec.highlight && (
                  <span className="mt-2 inline-block rounded border border-[var(--warning)] px-2 py-0.5 text-xs text-[var(--warning)]">
                    Rare at this location
                  </span>
                )}
              </div>
              <p className="text-muted col-span-2 self-center text-sm leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Stats bar */}
      <div className="border-border border-y">
        <div className="mx-auto grid max-w-(--layout-max-width) grid-cols-2 sm:grid-cols-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-border p-6 text-center ${i > 0 ? "border-l" : ""}`}
            >
              <p className="text-2xl font-medium">{stat.value}</p>
              <p className="text-muted mt-1 text-xs font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Highlights */}
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-widest">
              The Opportunity
            </p>
            <h2 className="mt-3 text-2xl font-medium leading-snug">
              A Commercial Asset Rarely Released at This Address
            </h2>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              HSIIDC SCO plots in established industrial estates seldom come to
              the resale market with clean titles. This is one of those uncommon
              occasions where institutional-grade location combines with private
              resale flexibility — allowing a discerning buyer to move quickly and
              decisively.
            </p>
            <blockquote className="border-border mt-6 border-l-2 pl-4">
              <p className="text-muted italic text-sm leading-relaxed">
                &ldquo;Parking of this scale, at this location, in this estate — it
                simply does not come again.&rdquo;
              </p>
            </blockquote>
          </div>
          <div className="divide-border divide-y">
            {pillars.map((pillar) => (
              <div key={pillar.roman} className="py-6 first:pt-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <span className="text-muted font-mono text-sm">{pillar.roman}</span>
                  <div>
                    <p className="font-medium">{pillar.title}</p>
                    <p className="text-muted mt-2 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Permitted Uses */}
      <Container className="border-border border-t py-16">
        <p className="text-muted text-xs font-medium uppercase tracking-widest">
          Permitted Commercial Uses
        </p>
        <h2 className="mt-3 text-2xl font-medium">Who This Works For</h2>
        <p className="text-muted mt-2 text-sm">
          As an HSIIDC-approved SCO, this plot is sanctioned for a wide range of
          high-demand commercial and industrial activities.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uses.map((use) => (
            <li key={use.title} className="border-border rounded-lg border p-5">
              <p className="font-medium">{use.title}</p>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {use.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Location */}
      <Container className="border-border border-t py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-widest">
              Location &amp; Connectivity
            </p>
            <h2 className="mt-3 text-2xl font-medium">
              At the Centre of What Panchkula Becomes Next
            </h2>
            <div className="mt-8 divide-y divide-[var(--border)]">
              {locationPoints.map((point) => (
                <div key={point.title} className="py-5 first:pt-0 last:pb-0">
                  <p className="font-medium text-sm">{point.title}</p>
                  <p className="text-muted mt-1 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="border-border overflow-hidden rounded-lg border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.6!2d76.951859!3d30.602243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDM2JzA4LjEiTiA3NsKwNTcnMDYuNyJF!5e0!3m2!1sen!2sin!4v1717200000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HSIIDC Industrial Area Phase-1, Barwala, Panchkula"
              />
            </div>
            <p className="text-muted mt-3 text-xs">
              HSIIDC Industrial Estate · Phase-1 · Barwala (Alipur) · Panchkula
            </p>
          </div>
        </div>
      </Container>

      {/* Why Now */}
      <Container className="border-border border-t py-16">
        <p className="text-muted text-xs font-medium uppercase tracking-widest">
          Why Now
        </p>
        <h2 className="mt-3 text-2xl font-medium">The Optimal Entry Moment</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {whyNow.map((item) => (
            <li key={item.title} className="border-border rounded-lg border p-6">
              <p className="text-muted text-xs font-medium uppercase tracking-widest">
                {item.eyebrow}
              </p>
              <p className="mt-3 font-medium leading-snug">{item.title}</p>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Gallery placeholder */}
      <Container className="border-border border-t py-16">
        <div className="bg-muted-background rounded-lg p-12 text-center">
          <p className="text-muted text-xs font-medium uppercase tracking-widest">
            The Property in Images
          </p>
          <h2 className="mt-3 text-2xl font-medium">
            Site photographs shared upon private request.
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-md text-sm leading-relaxed">
            We believe a premium asset deserves more than stock imagery. Submit
            an enquiry to receive a dedicated property briefing — including site
            photographs, plot plan, and HSIIDC documentation.
          </p>
          <div className="mt-6">
            <a
              href="#enquire"
              className="bg-foreground text-background rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            >
              Request Private Briefing
            </a>
          </div>
        </div>
      </Container>

      {/* Pricing */}
      <Container width="content" className="border-border border-t py-16 text-center">
        <p className="text-muted text-xs font-medium uppercase tracking-widest">Pricing</p>
        <p className="mt-4 text-5xl font-medium">{listing.priceLabel}</p>
        {listing.negotiable && (
          <p className="text-muted mt-2">Negotiable · Serious enquiries welcome</p>
        )}
        <p className="text-muted mt-4 text-sm">
          Complete documentation available for independent legal due diligence.
          This transaction can move at the buyer&apos;s pace.
        </p>
      </Container>

      {/* Enquiry Form */}
      <Container id="enquire" className="border-border border-t py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-widest">
              Private Enquiry
            </p>
            <h2 className="mt-3 text-2xl font-medium">
              Express Interest or Request Details
            </h2>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              All enquiries are handled with complete confidentiality. Upon
              submission, you will receive a direct callback to discuss the
              property, review documentation, and schedule a private site visit.
            </p>
            <div className="mt-8 space-y-5 text-sm">
              {[
                { label: "Property", value: `${listing.title} · ${listing.location}` },
                { label: "Area", value: "108 sq.m." },
                { label: "Development", value: "Basement + Ground + 1st + 2nd Floor + Terrace" },
                { label: "Title", value: "Clean title · Transfer-ready" },
                { label: "Listing type", value: "Private resale · Serious buyers only" },
              ].map((item) => (
                <div key={item.label} className="border-border flex gap-4 border-b pb-5 last:border-0 last:pb-0">
                  <span className="text-muted w-28 shrink-0">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-border rounded-lg border p-6">
            <RealtyInquiryForm listingSlug={slug} />
          </div>
        </div>
      </Container>

      {/* FAQ */}
      <Container width="content" className="border-border border-t py-16">
        <p className="text-muted text-xs font-medium uppercase tracking-widest">FAQ</p>
        <h2 className="mt-3 text-2xl font-medium">Common Questions</h2>
        <div className="mt-8 divide-y divide-[var(--border)]">
          {[
            {
              q: "Is the price fixed?",
              a: `The listed price is ${listing.priceLabel}. Negotiation is possible for serious buyers. Submit an enquiry to begin a conversation.`,
            },
            {
              q: "Can I view the site?",
              a: "Yes — this property is shown by appointment only. Submit the enquiry form and a site visit will be arranged at your convenience.",
            },
            {
              q: "What documentation is available?",
              a: "Complete HSIIDC documentation, title records, and plot plan are available for independent legal due diligence. Shared after initial enquiry.",
            },
            {
              q: "What can this property be used for?",
              a: "As an HSIIDC SCO, it is approved for offices, warehousing, pharma distribution, showrooms, dark stores, logistics hubs, and MSME manufacturing.",
            },
            {
              q: "How quickly can a transfer happen?",
              a: "Clean title means no encumbrances or litigation. The transaction timeline depends on buyer readiness — typically a few weeks once documentation is reviewed.",
            },
          ].map((item) => (
            <div key={item.q} className="py-6 first:pt-0 last:pb-0">
              <p className="font-medium">{item.q}</p>
              <p className="text-muted mt-2 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
