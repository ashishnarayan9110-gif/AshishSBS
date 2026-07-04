/**
 * Seeds the HSIIDC SCO Barwala listing.
 * Safe to re-run: uses upsert keyed on slug.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.realtyListing.upsert({
    where: { slug: "barwala-hsiidc-sco" },
    update: {},
    create: {
      slug: "barwala-hsiidc-sco",
      title: "HSIIDC SCO, Phase-1",
      subtitle: "Industrial Area, Barwala (Alipur), Panchkula",
      location: "Phase-1, Barwala (Alipur), Panchkula, Haryana",
      priceLabel: "₹3.5 Crore",
      negotiable: true,
      status: "ACTIVE",
      summary:
        "A rare resale of an HSIIDC-allocated SCO plot with clean title and ready-for-transfer ownership. 108 sq.m. of prime frontage, expansive truck parking, and full development rights — positioned at the heart of Panchkula's next great growth corridor.",
      specifications: [
        {
          label: "Plot Area",
          value: "108",
          valueSmall: "sq.m.",
          description:
            "Generous frontage within the established HSIIDC industrial estate — well-proportioned for multi-level commercial development and truck access.",
        },
        {
          label: "Development Rights",
          value: "B + G + 1st + 2nd",
          valueSmall: "+ Terrace",
          description:
            "Five levels of permissible construction. Each floor can serve a distinct purpose — basement storage, ground-floor retail, upper-floor offices, rooftop terrace. One plot, multiple revenue streams.",
        },
        {
          label: "Standout Advantage",
          value: "Premium Parking Forecourt",
          highlight: true,
          description:
            "The forecourt accommodates multiple large trucks and loaded containers simultaneously — alongside private vehicles. In the Barwala industrial cluster, where space is scarce, this operational depth is irreplaceable and commands premium rents from logistics, pharma, and warehousing tenants.",
        },
        {
          label: "Institutional Pedigree",
          value: "HSIIDC",
          valueSmall: "Phase-1 Estate",
          description:
            "Allocated by HSIIDC — the Haryana government's industrial development body. Fully serviced infrastructure, legal certainty, on-estate administration, and a dedicated fire station. An address that banks, insurers, and quality tenants respect.",
        },
        {
          label: "Title Status",
          value: "Clean Title",
          valueSmall: "Ready to Transfer",
          description:
            "Clear ownership, no encumbrances, no disputes. Complete documentation is available for independent legal due diligence. This transaction can move at the buyer's pace — from first call to transfer.",
        },
      ],
      permittedUses: [
        {
          title: "Premium Offices",
          description:
            "Corporate suites, branch offices, and managed workspaces for businesses requiring an established industrial address.",
        },
        {
          title: "Warehousing & Storage",
          description:
            "Multi-level storage with truck-accessible forecourt — suited for distribution, fulfilment, and bulk goods operations.",
        },
        {
          title: "Pharma Units",
          description:
            "Manufacturing, distribution, and storage of pharmaceuticals — HSIIDC estates are among the preferred locations for pharma licensing approvals.",
        },
        {
          title: "Dark Stores & Quick Commerce",
          description:
            "With new residential townships arriving on this corridor, dark store demand is acute. Excellent road access and multi-level layout make this ideal.",
        },
        {
          title: "Showrooms",
          description:
            "Ground-floor frontage with ample visitor parking makes this a compelling location for automobile, machinery, or large-format retail showrooms.",
        },
        {
          title: "MSME & Export Units",
          description:
            "Light manufacturing, assembly, and export-oriented units benefit from the estate's institutional credibility, infrastructure, and logistics connectivity.",
        },
        {
          title: "Logistics & Distribution Hubs",
          description:
            "The oversized parking forecourt is purpose-built for logistics — allowing simultaneous loading, unloading, and manoeuvring of multiple heavy vehicles.",
        },
      ],
      locationPoints: [
        {
          title: "NH-7 Panchkula–Barwala Road — Direct Frontage Access",
          description:
            "The state highway connecting Panchkula city to Barwala runs adjacent to the estate, offering seamless logistics access to Chandigarh (under 20 km), Ambala, and Delhi-NCR freight corridors.",
        },
        {
          title: "Panchkula Extension-2 — 24 Sectors, ~10,000 Acres",
          description:
            "The Haryana government has approved a major new township along this very road — 24 urban sectors spanning ~10,000 acres, with Phase 1 (10 sectors, 2,081 acres) actively advancing. Demand for quality industrial and commercial spaces in this corridor is structurally underpinned for the next decade.",
        },
        {
          title: "Chandigarh & International Airport",
          description:
            "Chandigarh's international airport is within practical range — relevant for export units, time-sensitive pharmaceutical logistics, and corporates whose teams require air connectivity.",
        },
        {
          title: "HSIIDC Office & Fire Station — Within the Estate",
          description:
            "Estate administration and emergency services sit within the industrial zone — providing compliance ease, rapid response capability, and the institutional assurance that underlies all HSIIDC properties.",
        },
        {
          title: "Essential Services & Banking — Immediately Nearby",
          description:
            "Banking branches, fuel stations, commercial eateries, and day-to-day services surround the industrial area — reducing friction for any business operating from this address from day one.",
        },
      ],
      whyNow: [
        {
          eyebrow: "Asset Security",
          title: "Government-Backed Title Certainty",
          description:
            "HSIIDC plots carry the legal certainty of government allocation. No encroachment risk, clear land demarcation, institutional dispute resolution framework. Capital invested here sits on the firmest possible legal foundation.",
        },
        {
          eyebrow: "Growth Trajectory",
          title: "Township Arrival Drives Structural Demand",
          description:
            "Land values in corridors preceding large residential developments invariably appreciate as population density arrives. With Panchkula Extension-2 advancing, this window — acquiring ahead of the curve — is narrow and closing.",
        },
        {
          eyebrow: "Rental Income",
          title: "Active Tenant Demand — Today",
          description:
            "Pharma companies, dark store operators, MSME manufacturers, and logistics firms are actively seeking exactly this profile of space in this corridor. The combination of truck parking capacity and multi-floor rights positions this SCO to command among the highest lease rates in the cluster.",
        },
      ],
      stats: [
        { value: "<20 km", label: "To Chandigarh" },
        { value: "24", label: "New Sectors Planned" },
        { value: "10,000 ac", label: "Township Corridor" },
        { value: "5", label: "Development Levels" },
        { value: "108 sqm", label: "Premium Plot Area" },
      ],
      pillars: [
        {
          roman: "I",
          title: "A Plot That Works as Hard as You Do",
          description:
            "Every square metre of this SCO is productive. Five development levels mean you build upward, not outward — multiplying your usable commercial area on a single, strategically located footprint. The oversized parking forecourt keeps operations moving without compromise.",
        },
        {
          roman: "II",
          title: "Government Certainty in an Uncertain Market",
          description:
            "HSIIDC allocation is not a label — it is a legal guarantee. Clean demarcation, institutional dispute resolution, and government-serviced infrastructure eliminate the risks that plague private industrial parcels.",
        },
        {
          roman: "III",
          title: "A Corridor Whose Best Days Lie Ahead",
          description:
            "The Panchkula–Barwala road is being transformed by 24 new government-approved urban sectors. Demand for quality commercial space in this corridor will only intensify as townships arrive.",
        },
      ],
      published: true,
    },
  });

  console.log("Realty seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
