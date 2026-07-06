import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import Image from "next/image";

export const metadata = {
  title: "Rikencare Lifesciences — Brand System & Website · Ashish",
  description:
    "Brand identity design and website engineering for a WHO-GMP compliant third-party pharmaceutical manufacturer in Himachal Pradesh.",
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-muted/10 rounded-full border px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted mb-3 text-xs font-semibold uppercase tracking-widest">
      {children}
    </p>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-foreground/20 my-8 border-l-2 pl-5">
      <p className="text-lg font-light italic leading-relaxed">{children}</p>
    </blockquote>
  );
}

function EngineeringNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/10 border-border my-6 rounded-lg border p-4">
      <p className="text-muted mb-1 text-xs font-semibold uppercase tracking-widest">
        Engineering note
      </p>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function Divider() {
  return <hr className="border-border my-12" />;
}

export default function RikencareProjectPage() {
  return (
    <>
      <Container width="content" className="pt-8">
        <Breadcrumbs
          items={[
            { href: "/projects", label: "Projects" },
            { href: "/projects/rikencare-lifesciences", label: "Rikencare Lifesciences" },
          ]}
        />
      </Container>

      {/* Hero */}
      <Container width="content" className="pt-8 pb-12">
        <SectionEyebrow>Case Study</SectionEyebrow>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Rikencare Lifesciences
        </h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          Brand identity design and website engineering for a WHO-GMP compliant,
          ISO 9001:2015 certified third-party pharmaceutical manufacturer in Nalagarh,
          Himachal Pradesh.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Tag>Brand Strategy</Tag>
          <Tag>Identity Design</Tag>
          <Tag>Front-end Engineering</Tag>
          <Tag>Data Pipeline</Tag>
          <Tag>2025</Tag>
        </div>
        <div className="mt-6 flex gap-4">
          <a
            href="http://rikencare-demo.ashish.sbs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4"
          >
            View live demo →
          </a>
        </div>
      </Container>

      {/* Logo lockup */}
      <div className="bg-[#0A1826] py-16">
        <Container width="content" className="flex items-center justify-center gap-5">
          <Image
            src="/projects/rikencare/6.png"
            alt="Rikencare monogram"
            width={72}
            height={72}
            className="object-contain"
          />
          <div className="h-10 w-px bg-white/20" />
          <div>
            <p
              className="text-2xl font-light tracking-tight text-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Rikencare
            </p>
            <p className="mt-0.5 text-[9px] font-semibold tracking-[0.3em] text-[#7E8FA3] uppercase">
              Lifesciences
            </p>
          </div>
        </Container>
      </div>

      {/* Part One */}
      <Container width="content" className="pt-16 pb-4">
        <SectionEyebrow>Part One</SectionEyebrow>
        <h2 className="text-2xl font-medium tracking-tight">The Brand System</h2>
      </Container>

      <Container width="content" className="space-y-10 pb-16">

        {/* 1. Orientation */}
        <section>
          <h3 className="font-medium">What Rikencare Is — and the Problem the Brand Solves</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Rikencare Lifesciences manufactures pharmaceuticals on contract for healthcare brands
            in Nalagarh, Himachal Pradesh. Their buyers are procurement leads and quality managers
            — people who sign off on supply-chain decisions with real liability attached. These buyers
            don&apos;t care about the lowest quote. They care about not getting a recall, not failing an
            audit, and not having to explain a batch variance to their board.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            The brand&apos;s job was to answer those fears before a conversation began. The positioning
            statement arrived at: &ldquo;We don&apos;t chase volume. We protect reputations.&rdquo; Rikencare is
            selective by design — a manufacturing partner that mirrors the client&apos;s brand requirements,
            holds a no-discount discipline, and treats every batch as a signed commitment. The identity
            had to embody that without saying it.
          </p>
        </section>

        {/* 2. Pillars */}
        <section>
          <h3 className="font-medium">Three Pillars, One Mandate</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Resilient · Robust · Refined. These aren&apos;t adjectives chosen for their sound — each maps
            to a specific buyer fear.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Resilient answers supply-chain instability: the plant runs, the documentation is in order,
            the batch ships on schedule. Robust answers batch variance: process discipline that removes
            human error from the repeatability equation. Refined answers regulatory exposure: a finish
            and a paper trail the client is proud to show an auditor.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Every design decision in the system was tested against one question: does this communicate
            process discipline, or does it undercut it?
          </p>
          <PullQuote>
            &ldquo;We sound like proof, not a pitch. Documented, not declamatory. Precise over persuasive.&rdquo;
          </PullQuote>
        </section>

        {/* 3. Architecture */}
        <section>
          <h3 className="font-medium">Brand Architecture: The Discreet Endorsement Model</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Rikencare manufactures across four dosage divisions — tablets, capsules, ointments, and
            liquids. The architecture choice was a <strong>branded house</strong>: one master brand
            over all divisions, with divisional names kept descriptive rather than elevated to
            sub-brands. The consequence on packaging is deliberate: on a client&apos;s finished product,
            the Rikencare mark appears once, small — &ldquo;Manufactured by Rikencare Lifesciences.&rdquo; A
            discreet seal of compliance. The client&apos;s brand remains sovereign on their pack.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            This architecture also has a practical compounding effect. Every audited batch, every clean
            inspection, every on-time delivery accrues to a single brand asset. The mark becomes more
            valuable each time it&apos;s associated with something that doesn&apos;t fail.
          </p>
        </section>

        {/* 4. Monogram */}
        <section>
          <h3 className="font-medium">The Monogram: East + West in One Mark</h3>
          <div className="mt-4 flex items-start gap-8">
            <div className="bg-[#0A1826] flex-shrink-0 rounded-lg p-6">
              <Image
                src="/projects/rikencare/6.png"
                alt="Rikencare monogram close-up"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <p className="text-muted leading-relaxed">
              The logo is a geometric monogram — a cropped, angular &ldquo;R&rdquo; shape that encodes four
              ideas simultaneously: the Latin <strong>R</strong> for Rikencare, the Devanagari
              character <strong>र</strong> (<em>ra</em>) — the root sound of the name in Hindi — a
              cradle for the <strong>C</strong> of Care in its negative space, and at full abstraction,
              a <strong>capsule cross-section</strong>: a split circle cut along its horizontal diameter.
              East and West, Indian heritage and modern pharmaceutical engineering, in one mark.
            </p>
          </div>
          <p className="text-muted mt-4 leading-relaxed">
            The decision was to resist the visual vocabulary of pharma cliché — no molecule, no
            caduceus, no globe — and instead build something that earned its meaning. The wordmark
            uses custom geometric letterforms derived from Century Gothic Bold at −50 tracking.
            The display typeface is Sifonn Pro. The full lockup: symbol, hairline vertical divider,
            then &ldquo;Rikencare / LIFESCIENCES.&rdquo;
          </p>
        </section>

        {/* 5. Colour */}
        <section>
          <h3 className="font-medium">Colour: Restraint as a Premium Signal</h3>
          <div className="mt-4 grid grid-cols-5 gap-1 rounded-lg overflow-hidden text-xs">
            {[
              { hex: "#0A1826", name: "Midnight", role: "60% · Ground" },
              { hex: "#F1ECDF", name: "Bone", role: "30% · Reads", dark: true },
              { hex: "#2F6FB0", name: "Clinical", role: "10% · Accent" },
              { hex: "#7FB2E0", name: "Sky", role: "Light accent" },
              { hex: "#7E8FA3", name: "Steel", role: "Secondary text" },
            ].map((c) => (
              <div key={c.hex}>
                <div
                  className="h-16 w-full"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="mt-1 font-medium leading-tight">{c.name}</p>
                <p className="text-muted">{c.hex}</p>
                <p className="text-muted">{c.role}</p>
              </div>
            ))}
          </div>
          <p className="text-muted mt-5 leading-relaxed">
            The 60/30/10 ratio is enforced across every composition: Midnight carries the brand, Bone
            does the reading, Clinical punctuates what matters. The discipline is the message — a layout
            that deploys Clinical everywhere signals nothing with it. Used once per screen, it says: this
            matters. Restraint is the premium signal.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Accessibility was not a checkbox. Verified contrast ratios: Bone on Midnight at{" "}
            <strong>14.8:1 (AAA)</strong>, Sky on Midnight at <strong>7.1:1 (AAA)</strong>, Clinical
            on Bone at <strong>4.6:1 (AA)</strong>. A compliance brand that fails basic accessibility
            has already made an argument against itself.
          </p>
        </section>

        {/* 6. Type & hairline */}
        <section>
          <h3 className="font-medium">Typography and the Hairline System</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Three typefaces, three functions. <strong>Sifonn Pro</strong> for display headings —
            precision and weight at large sizes. <strong>Jost</strong> (approved open-source substitute
            for Century Gothic) for body and UI copy — geometric, clean, readable at 17px with 1.6
            line-height and a measure of 60–75 characters. <strong>Spline Sans Mono</strong> for data,
            batch codes, licence numbers, statistics — the visual register of documentation.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            The hairline system takes the vertical divider from the brand lockup and extends it as a
            structural device throughout the layout. It sections information, separates content blocks,
            draws the eye across data rows. A single-weight line, applied consistently, becomes a
            grammar: here is organised information, produced by an organised company.
          </p>
        </section>

        {/* 7. Motion & voice */}
        <section>
          <h3 className="font-medium">Motion and Voice: Stillness Reads as Control</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Every motion in the system follows one easing curve:{" "}
            <code className="text-xs">cubic-bezier(.2,.7,.2,1)</code> — ease-out only. Entrances fade
            up 12 pixels. Hairlines draw in left-to-right. The split-circle motif has one signature
            animation: a quarter-turn reveal, used only for page loaders. No bounce, no spin, no
            parallax, no autoplay. These aren&apos;t omissions — they&apos;re commitments.
          </p>
          <PullQuote>
            &ldquo;A pharmaceutical compliance brand that bounces its logo is not in control of its own
            presentation.&rdquo;
          </PullQuote>
          <p className="text-muted mt-4 leading-relaxed">
            The voice rule is equally direct. The difference between &ldquo;Every batch ships with full GMP
            documentation, signed and traceable to source&rdquo; and &ldquo;Best rates — unbeatable quality,
            100% guaranteed!!&rdquo; is not a matter of style. It is the difference between a company that
            trusts its record and one that doesn&apos;t.
          </p>
        </section>

        {/* 8. Coherence reflection */}
        <section>
          <h3 className="font-medium">What Makes It Coherent</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The strongest brand systems don&apos;t have great individual parts — they have a single idea
            expressed consistently across every part. Here that idea is: documented, repeatable,
            trusted. The split-circle logo encodes it geometrically. The Midnight/Bone palette encodes
            it tonally. The 60/30/10 discipline encodes it behaviourally. The hairline system encodes
            it structurally. The ease-out-only motion encodes it kinetically.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Every element is doing the same work in a different register. Building the site meant first
            understanding that as a designer — and then executing against it without compromise.
          </p>
        </section>
      </Container>

      <Divider />

      {/* Part Two */}
      <Container width="content" className="pb-4">
        <SectionEyebrow>Part Two</SectionEyebrow>
        <h2 className="text-2xl font-medium tracking-tight">The Website</h2>
      </Container>

      <Container width="content" className="space-y-10 pb-16">

        {/* 1. Objective */}
        <section>
          <h3 className="font-medium">The Objective</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The brief was to turn a complete brand identity into a working &ldquo;digital vault&rdquo; — a trust
            instrument, not a brochure. The target audience is not a consumer browsing on a phone.
            It&apos;s a pharmaceutical procurement manager, a quality assurance director, or a regulatory
            affairs lead, likely on a desktop, with one question: <em>can this manufacturer be trusted
            with my product?</em> Every structural decision — information architecture, data presentation,
            enquiry flow — was made in service of that question.
          </p>
        </section>

        {/* 2. Brand → product */}
        <section>
          <h3 className="font-medium">Translating Brand into Product</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The translation was mechanical before it was creative. CSS custom properties defined the
            five brand colours, the full type scale, and the ease curve as design tokens — the single
            source of truth for every rendered pixel. Sifonn Pro loaded via{" "}
            <code className="text-xs">@font-face</code>; Jost and Spline Sans Mono via Google Fonts.
            The 60/30/10 rhythm became alternating Midnight and Bone sections, with Clinical used only
            for accents and CTAs. Hairline dividers from the identity system became the structural
            element separating every content block.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            The split-circle loader is implemented in SVG — a quarter-turn{" "}
            <code className="text-xs">rotate(-90deg)</code> reveal on page transitions, matching the
            motion spec precisely. Scroll-triggered reveals use{" "}
            <code className="text-xs">IntersectionObserver</code> to fade elements up 12px on entry
            with the brand ease curve. Nothing runs on a timer. Nothing loops. The fidelity wasn&apos;t
            incidental — the site is the brand&apos;s first impression on buyers who will spend weeks doing
            due diligence.
          </p>
        </section>

        {/* 3. IA */}
        <section>
          <h3 className="font-medium">Information Architecture Across Eight Sections</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Eight sections, navigable via a sticky top nav with in-page routing (no full-page loads):
            Home, About, Products, Services, Manufacturing, Quality, Careers, Contact. The sequence is
            deliberate. Home establishes what Rikencare is and surfaces the compliance credentials in
            the first viewport. Products is the heaviest section — the full approved catalogue. Quality
            is the trust anchor: certifications, documentation, the audit-readiness claim made explicit.
            Contact is minimal: an enquiry form and a response-time promise.
          </p>
        </section>

        {/* 4. Data */}
        <section>
          <h3 className="font-medium">The Data Problem: 197 Real Products</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The client provided their government-format &ldquo;Approved Composition List&rdquo; — a Word document
            with inconsistent formatting, merged cells, and no clear schema. I parsed this into a
            structured JSON array: 197 products, each with name, active composition, strengths,
            pharmacopoeial references (IP/BP/USP), and dosage category.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Every record was integrity-checked: all 197 present, none missing, none duplicated, none
            mis-categorised. The five dosage divisions broke down as: Syrups &amp; Suspensions (98),
            Creams/Gels/Ointments (50), Capsules (22), Solutions &amp; Mouthwash (17), Drops (10). The
            product grid renders with category filters, live text search, and product cards. The entire
            catalogue is client-side — sub-50ms filter response, no API call.
          </p>
          <EngineeringNote>
            Reading a government Word document into typed JSON required pattern matching for irregular
            spacing, handling pharmacopoeial abbreviations as distinct fields, and reconciling product
            names that appeared in multiple forms across dosage categories. The final JSON is the
            authoritative source for both the product grid and the PDF generator.
          </EngineeringNote>
        </section>

        {/* 5. Configurator */}
        <section>
          <h3 className="font-medium">The Packaging Configurator</h3>
          <p className="text-muted mt-3 leading-relaxed">
            Each product card opens a configurator allowing a buyer to specify packaging requirements:
            container type (bottle, tube, or strip — switching by dosage form), cap or closure,
            measuring aid, label specification, carton, and package insert. The configurator concludes
            with a buyer-liability declaration before the product is added to the enquiry cart. This is
            deliberate friction, not a UX oversight. Pharmaceutical procurement involves liability. The
            declaration surfaces that at the point of selection, not buried in a terms page.
          </p>
        </section>

        {/* 6. Enquiry funnel */}
        <section>
          <h3 className="font-medium">The Enquiry Funnel: Why Not E-Commerce</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The cart persists in <code className="text-xs">localStorage</code>. A buyer can add
            multiple SKUs at a 3,000-unit MOQ per product, edit the cart, then proceed to a checkout
            form capturing name, company, GST number, Drug Licence number, and a confirmation of
            authorised-buyer status. The form submits to a third-party form service; the buyer sees a
            success state.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            There are no payments, no dashboards, no accounts. This was not a technical limitation —
            it was a deliberate model choice. Authorised pharmaceutical buyers in India do not transact
            on e-commerce rails. They send enquiries, receive quotations, sign purchase orders, and pay
            on invoice terms. Building an e-commerce flow would have produced a product that looked
            modern and was commercially useless.
          </p>
          <PullQuote>
            &ldquo;The enquiry/quotation model is how the market actually works. The product should fit
            the workflow, not ask the buyer to change it.&rdquo;
          </PullQuote>
        </section>

        {/* 7. PDF */}
        <section>
          <h3 className="font-medium">The Brand-Styled PDF Generator</h3>
          <p className="text-muted mt-3 leading-relaxed">
            A buyer can download the complete 197-product Approved Composition List as a PDF, generated
            client-side via jsPDF and jspdf-autotable. The document opens with a Midnight cover page
            carrying the Rikencare logo and the three-pillar statement. Category sections use Clinical
            Blue header bands. Rows alternate between Bone and white. Strength values render in Spline
            Sans Mono. A procurement manager can open it, review it against their formulary, and share
            it internally — without a server call, a login, or an expiring download link.
          </p>
          <EngineeringNote>
            Generating a brand-consistent PDF in the browser required embedding Sifonn Pro as a base64
            data URI, canvas operations for precise logo cropping (pixel analysis to identify the
            transparent mark&apos;s bounding box), and per-category band logic that resets cleanly on each
            auto-paginated page.
          </EngineeringNote>
        </section>

        {/* 8. Honest metrics */}
        <section>
          <h3 className="font-medium">Compliance, Trust, and Honest Metrics</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The Quality section surfaces WHO-GMP and ISO 9001:2015 certification, Drug Manufacturing
            Licences on Forms 25 and 28, pharmacopoeial adherence (IP/USP/BP), and a response-time
            commitment. One judgment call is worth naming: the Brand Bible included &ldquo;ESTD. 1988&rdquo; — a
            founding-year reference that framed Rikencare within a longer institutional history. The
            manufacturing licences (Forms 25 and 28) were issued in 2022. The client confirmed 2022 as
            the correct, canonical year. I updated every instance accordingly.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            A compliance brand that states an unverifiable founding date on its own website has already
            started the audit badly. The site makes no metric claims it cannot substantiate — no
            &ldquo;500+ satisfied clients,&rdquo; no &ldquo;99.8% batch pass rate.&rdquo; The credibility argument rests
            on documentation, not assertion.
          </p>
        </section>

        {/* 9. Technical */}
        <section>
          <h3 className="font-medium">Responsive, Accessible, Lightweight</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The site is framework-free — one self-contained <code className="text-xs">index.html</code>{" "}
            and an <code className="text-xs">assets/</code> directory. No build step, no bundler, no
            Node runtime. The brand&apos;s verified contrast ratios (AAA on primary pairings) are met
            everywhere. Modals are keyboard-dismissible and full-screen on mobile. The mobile pass uses
            compact navigation, full-width CTAs, a single-column product grid, and a stacked trust
            strip. The <code className="text-xs">theme-color</code> meta tag is set to Midnight.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Performance is a consequence of the architecture. There is no JavaScript framework to
            parse, no component tree to hydrate. jsPDF loads deferred via CDN, after the page is
            interactive. The product catalogue renders entirely from a static JSON file.
          </p>
        </section>

        {/* 10. What's next */}
        <section>
          <h3 className="font-medium">Prototype Scope and What I&apos;d Do Next</h3>
          <p className="text-muted mt-3 leading-relaxed">
            The current build is a complete, deployable front-end with a working enquiry flow. What it
            doesn&apos;t have: CRM integration to receive and manage enquiries, a product database with an
            admin interface for adding SKUs, and a backend that would enable authenticated buyer
            accounts or order tracking.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            These are not omissions from the brief — they were a deliberate first scope. The site
            needed to go live, establish credibility, and start receiving enquiries. A version that
            waited for a custom CRM would not have shipped. The next phase is clear: a structured
            enquiry inbox, catalogue management via an admin interface, and — if enquiry volume
            justifies it — an authenticated buyer portal with saved carts and quote history.
          </p>
        </section>
      </Container>

      <Divider />

      {/* Credits */}
      <Container width="content" className="pt-14 pb-24">
        <SectionEyebrow>Credits & Caveats</SectionEyebrow>
        <h2 className="text-xl font-medium tracking-tight">Roles, Provenance, and Honest Scope</h2>
        <div className="text-muted mt-6 space-y-4 text-sm leading-relaxed">
          <p>
            <strong className="text-foreground">Roles.</strong> Brand identity (logo, monogram,
            wordmark, brand guidelines, colour system, typography, motion specification, graphic
            language, and brand voice) and website design and engineering: Ashish Narayan. The work
            was produced with the assistance of AI tooling throughout — direction, decisions, and
            final approval are my own.
          </p>
          <p>
            <strong className="text-foreground">Client & status.</strong> Rikencare Lifesciences is a
            real client engagement. The live prototype is accessible at{" "}
            <a
              href="http://rikencare-demo.ashish.sbs/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              rikencare-demo.ashish.sbs
            </a>
            . The demo domain is used for portfolio display; the client&apos;s production domain is managed
            independently.
          </p>
          <p>
            <strong className="text-foreground">Trademarks & IP.</strong> &ldquo;Rikencare Lifesciences,&rdquo;
            its logo, wordmark, and all associated brand assets are the property of Rikencare
            Lifesciences. Shown here for portfolio and case-study purposes.
          </p>
          <p>
            <strong className="text-foreground">Real vs. illustrative content.</strong> The 197-product
            catalogue is derived from the client&apos;s government-issued Approved Composition List and is
            shown with permission. Leadership names, testimonials, marquee client names, and contact
            phone number shown on the live demo are placeholders.
          </p>
          <p>
            <strong className="text-foreground">Prototype scope.</strong> Front-end only. Enquiries
            route via a third-party form service. There is no backend, no database, and no CRM
            integration. The map is a Google Maps embed.
          </p>
          <p>
            <strong className="text-foreground">No fabricated results.</strong> No conversion rates,
            revenue figures, or business results are claimed. No independently verified performance
            data is available at the time of publishing.
          </p>
          <p>
            <strong className="text-foreground">AI tooling disclosure.</strong> Portions of the brand
            copy and product descriptions were drafted with the assistance of AI language model tooling,
            then reviewed, edited, and approved before implementation.
          </p>
          <p>
            <strong className="text-foreground">Sector note.</strong> This site is designed for
            authorised pharmaceutical buyers operating within a B2B procurement context. Nothing on
            the page constitutes medical advice or a marketing claim about the safety or efficacy of
            any product.
          </p>
        </div>
      </Container>
    </>
  );
}
