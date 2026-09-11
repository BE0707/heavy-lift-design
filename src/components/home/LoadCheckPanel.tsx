import { AlertTriangle, CheckSquare, Info } from "lucide-react";
import { LEGAL_LIMITS, TRAILER_LABEL, type CheckLevel, type LoadAssessment } from "@/lib/load-check";
import { cn } from "@/lib/utils";

const LEVEL: Record<CheckLevel, { icon: typeof Info; tag: string; className: string }> = {
  ok: { icon: CheckSquare, tag: "Uygun", className: "text-steel" },
  info: { icon: Info, tag: "Not", className: "text-bone" },
  warn: { icon: AlertTriangle, tag: "İzin", className: "text-hazard-text" },
};

const PERMIT_TEXT = {
  gerekli: "Gerekli görünüyor",
  gerekmeyebilir: "Gerekmeyebilir",
  belirsiz: "Ağırlık girilince netleşir",
} as const;

const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const LoadCheckPanel = ({ assessment }: { assessment: LoadAssessment | null }) => (
  <aside aria-labelledby="precheck-title" className="border border-rule-strong bg-ink">
    <div className="flex items-center justify-between gap-4 border-b border-rule-strong px-5 py-3.5">
      <h3 id="precheck-title" className="text-xl uppercase tracking-[0.03em]">
        İzin ön kontrolü
      </h3>
      <span className="label flex items-center gap-2">
        <span aria-hidden="true" className={cn("h-1.5 w-1.5", assessment ? "bg-signal" : "bg-rule-strong")} />
        {assessment ? "Hesaplandı" : "Veri bekleniyor"}
      </span>
    </div>

    {assessment ? (
      <div>
        <dl className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="bg-ink px-5 py-4">
            <dt className="label">Önerilen dorse</dt>
            <dd className="mt-1.5 font-display text-xl font-semibold uppercase leading-tight">{TRAILER_LABEL[assessment.trailer]}</dd>
          </div>
          <div className="bg-ink px-5 py-4">
            <dt className="label">KGM özel izni</dt>
            <dd
              aria-live="polite"
              className={cn(
                "mt-1.5 font-display text-xl font-semibold uppercase leading-tight",
                assessment.permit === "gerekli" ? "text-hazard-text" : "text-bone",
              )}
            >
              {PERMIT_TEXT[assessment.permit]}
            </dd>
          </div>
        </dl>
        <ul className="border-t border-rule">
          {assessment.items.map((item, i) => {
            const { icon: Icon, tag, className } = LEVEL[item.level];
            return (
              <li key={`${item.topic}-${i}`} className="flex gap-3 border-b border-rule px-5 py-3.5 last:border-b-0">
                <Icon aria-hidden="true" className={cn("mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0", className)} />
                <p className="text-[0.9375rem] leading-snug text-steel">
                  <span className={cn("mr-2 font-mono text-2xs font-medium uppercase tracking-label", className)}>
                    {item.topic} · {tag}
                  </span>
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <div className="px-5 py-5">
        <p className="text-pretty text-steel">
          Ağırlık ve ölçüleri girdikçe gabari ve özel izin ön değerlendirmesi burada hesaplanır.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-px bg-rule">
          {[
            ["Genişlik", `${fmt(LEGAL_LIMITS.width)} m`],
            ["Yükseklik", `${fmt(LEGAL_LIMITS.height)} m`],
            ["Boy", `${fmt(LEGAL_LIMITS.length)} m`],
            ["Toplam ağırlık", `${LEGAL_LIMITS.grossWeight} t`],
          ].map(([label, value]) => (
            <li key={label} className="bg-ink py-3 pr-3">
              <span className="label block">{label} sınırı</span>
              <span className="tabular mt-1 block font-mono text-bone">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    <p className="border-t border-rule px-5 py-3.5 text-sm leading-snug text-dim">
      Ön değerlendirmedir. Kesin karar güzergah etüdü ve KGM izin sürecinde verilir.
    </p>
  </aside>
);

export default LoadCheckPanel;
