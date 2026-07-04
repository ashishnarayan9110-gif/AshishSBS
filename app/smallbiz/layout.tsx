import type { Metadata } from "next";
import { SmallBizHeader } from "@/components/layout/smallbiz-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://smallbusinessforsale.ashish.sbs"),
  title: "Buy Your Next Business — Small Business For Sale",
  description:
    "Curated acquisition opportunities for entrepreneurs, operators and investors. Not just a listing website — a curated deal flow.",
  robots: { index: true, follow: true },
};

export default function SmallBizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmallBizHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-border border-t">
        <div className="text-muted mx-auto max-w-(--layout-max-width) px-6 py-6 text-xs">
          © {new Date().getFullYear()} Ashish. smallbusinessforsale.ashish.sbs
        </div>
      </footer>
    </>
  );
}
