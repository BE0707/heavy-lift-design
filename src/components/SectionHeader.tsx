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
  layout?: "default" | "split";
}

/**
 * Editoryal bölüm başlığı: mono dizin numarası, rafine kicker ve
 * güçlü tipografik hiyerarşi. Split yerleşimle başlık ve açıklama dengelenir.
 */
const SectionHeader = ({
  index,
  kicker,
  title,
  lead,
  titleId,
  className,
  layout = "default",
}: SectionHeaderProps) => {
  if (layout === "split") {
    return (
      <header className={cn("border-b border-rule pb-8 lg:pb-12", className)}>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="label flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold text-signal">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-rule-strong" />
              <span className="tracking-[0.1em] text-steel">{kicker}</span>
            </p>
            <h2
              id={titleId}
              className="mt-3.5 text-balance font-display text-3xl font-bold tracking-[-0.025em] text-bone sm:text-4xl lg:text-5xl lg:leading-[1.04]"
            >
              {title}
            </h2>
          </div>
          {lead && (
            <div className="lg:col-span-5">
              <p className="text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
                {lead}
              </p>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className={cn("max-w-3xl", className)}>
      <p className="label flex items-center gap-2.5">
        <span className="font-mono text-xs font-semibold text-signal">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-rule-strong" />
        <span className="tracking-[0.1em] text-steel">{kicker}</span>
      </p>
      <h2
        id={titleId}
        className="mt-3.5 text-balance font-display text-3xl font-bold tracking-[-0.025em] text-bone sm:text-4xl lg:text-5xl lg:leading-[1.04]"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
          {lead}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;
