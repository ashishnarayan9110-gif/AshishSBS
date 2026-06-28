import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashish.sbs"),
  title: {
    default: "Ashish — Systems Designer",
    template: "%s — Ashish",
  },
  description:
    "A living operating system documenting ventures, projects, research and the systems behind them.",
  openGraph: {
    type: "website",
    siteName: "Ashish — Systems Designer",
    title: "Ashish — Systems Designer",
    description:
      "A living operating system documenting ventures, projects, research and the systems behind them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish — Systems Designer",
    description:
      "A living operating system documenting ventures, projects, research and the systems behind them.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashish",
  jobTitle: "Systems Designer",
  url: "https://ashish.sbs",
  description:
    "Designs systems that help businesses operate with greater clarity, trust and efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
