import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Belge içi bölüm numarası, örn. "02" */
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  titleId?: string;
  className?: string;
  /** split: başlık solda, açıklama sağda alt hizada (geniş bölümler için) */
  layout?: "default" | "split";
}

/**
 * Bölüm başlığı: katalog/teknik el kitabı düzeni. Tek sarı çentikli bölüm işareti,
 * normal büyük-küçük harfli başlık; kontrast ağırlıktan değil boyuttan gelir.
 */
const SectionHeader = ({ index, kicker, title, lead, titleId, className, layout = "default" }: SectionHeaderProps) => {
  const mark = (
    <p className="section-mark">
      <span className="text-fg-muted">{index}</span>
      <span>{kicker}</span>
    </p>
  );
  const heading = (
    <h2 id={titleId} className="mt-5 max-w-[18ch] text-balance text-display-lg">
      {title}
    </h2>
  );

  if (layout === "split") {
    return (
      <header className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
        <div className="lg:col-span-7">
          {mark}
          {heading}
        </div>
        {lead && <p className="max-w-[38rem] text-pretty text-lg leading-relaxed text-fg-muted lg:col-span-5 lg:pb-1.5">{lead}</p>}
      </header>
    );
  }

  return (
    <header className={cn("max-w-3xl", className)}>
      {mark}
      {heading}
      {lead && <p className="mt-5 max-w-[38rem] text-pretty text-lg leading-relaxed text-fg-muted">{lead}</p>}
    </header>
  );
};

export default SectionHeader;
