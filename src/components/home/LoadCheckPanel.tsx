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
  <aside aria-labelledby="precheck-title" className="border border-rule-strong bg-ink shadow-lg">
    <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4">
      <h3 id="precheck-title" className="font-display text-xl font-bold uppercase tracking-tight text-bone">
        İzin ön kontrolü
      </h3>
      <span className="font-mono text-2xs uppercase tracking-label flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn("h-2 w-2", assessment ? "bg-signal shadow-[0_0_6px_rgba(253,184,19,0.7)]" : "bg-rule-strong")}
        />
        <span className={assessment ? "text-signal" : "text-dim"}>
          {assessment ? "Hesaplandı" : "Veri bekleniyor"}
        </span>
      </span>
    </div>

    {assessment ? (
      <div>
        <dl className="grid grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-1 lg:divide-x-0 lg:divide-y xl:grid-cols-2 xl:divide-y-0 xl:divide-x">
          <div className="bg-asphalt/60 px-5 py-4">
            <dt className="label text-dim">Önerilen dorse</dt>
            <dd className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-bone">
              {TRAILER_LABEL[assessment.trailer]}
            </dd>
          </div>
          <div className="bg-asphalt/60 px-5 py-4">
            <dt className="label text-dim">KGM özel izni</dt>
            <dd
              aria-live="polite"
              className={cn(
                "mt-2 font-display text-xl font-bold uppercase tracking-tight",
                assessment.permit === "gerekli" ? "text-hazard-text" : "text-signal",
              )}
            >
              {PERMIT_TEXT[assessment.permit]}
            </dd>
          </div>
        </dl>
        <ul className="divide-y divide-rule border-t border-rule bg-ink">
          {assessment.items.map((item, i) => {
            const { icon: Icon, tag, className } = LEVEL[item.level];
            return (
              <li key={`${item.topic}-${i}`} className="flex gap-3 px-5 py-4">
                <Icon aria-hidden="true" className={cn("mt-0.5 h-4 w-4 shrink-0", className)} />
                <p className="font-sans text-sm leading-snug text-steel">
                  <span className={cn("mr-2 font-mono text-2xs font-semibold uppercase tracking-label", className)}>
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
      <div className="px-5 py-6">
        <p className="font-sans text-sm leading-relaxed text-steel">
          Ağırlık ve ölçüleri girdikçe gabari ve özel izin ön değerlendirmesi burada otomatik hesaplanır.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-px border border-rule bg-rule">
          {[
            ["Genişlik", `${fmt(LEGAL_LIMITS.width)} m`],
            ["Yükseklik", `${fmt(LEGAL_LIMITS.height)} m`],
            ["Boy", `${fmt(LEGAL_LIMITS.length)} m`],
            ["Toplam ağırlık", `${LEGAL_LIMITS.grossWeight} t`],
          ].map(([label, value]) => (
            <li key={label} className="bg-asphalt/80 p-3.5">
              <span className="label block text-dim">{label} sınırı</span>
              <span className="tabular mt-1 block font-mono text-base font-semibold text-bone">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    <p className="border-t border-rule px-5 py-3.5 font-mono text-2xs leading-snug text-dim">
      Ön değerlendirmedir. Kesin karar güzergah etüdü ve KGM izin sürecinde verilir.
    </p>
  </aside>
);

export default LoadCheckPanel;
