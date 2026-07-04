import Link from "next/link";

export function RealtyFooter() {
  return (
    <footer className="border-border mt-auto border-t">
      <div className="mx-auto flex max-w-(--layout-max-width) flex-wrap items-center justify-between gap-6 px-6 py-10">
        <div>
          <p className="text-sm font-medium">Ashish · Realty</p>
          <p className="text-muted mt-1 text-xs">
            Performance Realty · HSIIDC Industrial Area, Barwala (Alipur), Panchkula
          </p>
        </div>
        <ul className="text-muted flex flex-wrap gap-6 text-sm">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/#listings" className="hover:text-foreground transition-colors">
              Listings
            </Link>
          </li>
          <li>
            <Link href="/#enquire" className="hover:text-foreground transition-colors">
              Enquire
            </Link>
          </li>
          <li>
            <Link href="https://ashish.sbs" className="hover:text-foreground transition-colors">
              ashish.sbs ↗
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-border text-muted mx-auto max-w-(--layout-max-width) border-t px-6 py-4 text-xs">
        © {new Date().getFullYear()} Ashish. All details provided in good faith. Independent due diligence advised prior to acquisition.
      </div>
    </footer>
  );
}
