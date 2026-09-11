import type { ReactNode } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileDock from "@/components/layout/MobileDock";

const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-dvh flex-col pb-dock lg:pb-0">
    <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
      İçeriğe geç
    </a>
    <SiteHeader />
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      {children}
    </main>
    <SiteFooter />
    <MobileDock />
  </div>
);

export default PageShell;
