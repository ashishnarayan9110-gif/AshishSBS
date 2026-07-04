import type { Metadata } from "next";
import { RealtyHeader } from "@/components/layout/realty-header";
import { RealtyFooter } from "@/components/layout/realty-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://realty.ashish.sbs"),
  title: {
    default: "Ashish Realty — Performance Realty for Serious Buyers",
    template: "%s — Ashish Realty",
  },
  description:
    "Performance realty for serious buyers, investors and businesses. Exclusive industrial and commercial opportunities — sourced, researched and negotiated with precision.",
  openGraph: {
    type: "website",
    siteName: "Ashish Realty",
  },
};

export default function RealtyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RealtyHeader />
      <main className="flex-1">{children}</main>
      <RealtyFooter />
    </>
  );
}
