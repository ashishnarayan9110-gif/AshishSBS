import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OsShell } from "@/components/os/os-shell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="os flex min-h-screen flex-col">
      <OsShell />
      <SiteHeader />
      <div className="rig flex min-h-screen flex-1 flex-col">
        <span className="deep" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
