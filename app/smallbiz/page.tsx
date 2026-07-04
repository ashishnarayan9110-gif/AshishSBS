import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SmallBizWaitlistForm } from "@/features/smallbiz/waitlist-form";

export const metadata: Metadata = {
  title: "Buy Your Next Business — Launching Soon",
};

export default function SmallBizPage() {
  return (
    <Container width="content" className="py-32 text-center">
      <p className="text-muted text-xs font-medium uppercase tracking-widest">
        Launching Soon
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">
        Buy Your Next Business.
      </h1>
      <p className="text-muted mt-2 text-2xl font-light">
        Not Just a Listing Website.
      </p>
      <p className="text-muted mx-auto mt-8 max-w-md leading-relaxed">
        Curated acquisition opportunities for entrepreneurs, operators and
        investors. Researched deals, clean documentation, and a direct line to
        the seller — without the noise.
      </p>

      <div className="border-border mx-auto mt-12 max-w-sm rounded-lg border p-6 text-left">
        <p className="text-sm font-medium">Get notified when we launch.</p>
        <p className="text-muted mt-1 text-sm">
          No spam. Just one email when the first listings go live.
        </p>
        <div className="mt-4">
          <SmallBizWaitlistForm />
        </div>
      </div>

      <p className="text-muted mt-12 text-sm">
        A project by{" "}
        <a href="https://ashish.sbs" className="hover:text-foreground underline underline-offset-2">
          Ashish
        </a>
        {" "}— the founder behind Savison Life.
      </p>
    </Container>
  );
}
