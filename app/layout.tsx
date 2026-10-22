import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Anton,
  Space_Grotesk,
  Work_Sans,
  IBM_Plex_Mono,
  Archivo,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

/* The main-site identity. Archivo carries everything structural, Cormorant
   the display serif, JetBrains the metadata. Scoped to .os in globals.css so
   realty and smallbiz keep the neutral set. */
const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${spaceGrotesk.variable} ${workSans.variable} ${ibmPlexMono.variable} ${archivo.variable} ${cormorant.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col antialiased">
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
        {children}
      </body>
    </html>
  );
}
