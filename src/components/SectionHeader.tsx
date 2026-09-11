import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Teknik dizin numarası, örn. "02" */
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  titleId?: string;
  className?: string;
}

/** Sol hizalı bölüm başlığı: mono dizin + çizgi + etiket, ardından başlık */
const SectionHeader = ({ index, kicker, title, lead, titleId, className }: SectionHeaderProps) => (
  <header className={cn("max-w-3xl", className)}>
    <p className="label flex items-center gap-3">
      <span className="text-signal">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-rule-strong" />
      <span>{kicker}</span>
    </p>
    <h2 id={titleId} className="mt-4 text-balance text-[2.5rem] leading-[0.95] sm:text-5xl">
      {title}
    </h2>
    {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-steel">{lead}</p>}
  </header>
);

export default SectionHeader;
