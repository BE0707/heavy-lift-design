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

/** Ön değerlendirme raporu: kutulu kart yerine teknik rapor sayfası düzeni */
const LoadCheckPanel = ({ assessment }: { assessment: LoadAssessment | null }) => (
  <aside aria-labelledby="precheck-title" className="border-t-2 border-bone/80 bg-ink">
    <div className="flex items-baseline justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
      <h3 id="precheck-title" className="text-xl">
        İzin ön kontrolü
      </h3>
      <span className={cn("font-mono text-2xs uppercase tracking-label", assessment ? "text-signal" : "text-dim")}>
        {assessment ? "Hesaplandı" : "Veri bekleniyor"}
      </span>
    </div>

    {assessment ? (
      <div>
        <dl className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="px-5 py-5 sm:px-6">
            <dt className="label">Önerilen dorse</dt>
            <dd className="mt-2 text-lg leading-snug text-bone">{TRAILER_LABEL[assessment.trailer]}</dd>
          </div>
          <div className="border-t border-rule px-5 py-5 sm:border-l sm:border-t-0 sm:px-6 lg:border-l-0 lg:border-t xl:border-l xl:border-t-0">
            <dt className="label">KGM özel izni</dt>
            <dd aria-live="polite" className={cn("mt-2 text-lg leading-snug", assessment.permit === "gerekli" ? "text-hazard-text" : "text-bone")}>
              {PERMIT_TEXT[assessment.permit]}
            </dd>
          </div>
        </dl>
        <ul className="border-t border-rule">
          {assessment.items.map((item, i) => {
            const { icon: Icon, tag, className } = LEVEL[item.level];
            return (
              <li key={`${item.topic}-${i}`} className="flex gap-3 border-b border-rule px-5 py-4 last:border-b-0 sm:px-6">
                <Icon aria-hidden="true" className={cn("mt-0.5 h-4 w-4 shrink-0", className)} />
                <p className="text-sm leading-relaxed text-steel">
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
      <div className="border-t border-rule px-5 py-6 sm:px-6">
        <p className="text-sm leading-relaxed text-steel">
          Ağırlık ve ölçüleri girdikçe gabari ve özel izin ön değerlendirmesi burada hesaplanır.
        </p>
        <dl className="mt-6 grid grid-cols-2">
          {[
            ["Genişlik", `${fmt(LEGAL_LIMITS.width)} m`],
            ["Yükseklik", `${fmt(LEGAL_LIMITS.height)} m`],
            ["Boy", `${fmt(LEGAL_LIMITS.length)} m`],
            ["Toplam ağırlık", `${LEGAL_LIMITS.grossWeight} t`],
          ].map(([label, value], i) => (
            <div key={label} className={cn("border-t border-rule py-3.5", i % 2 === 1 && "border-l pl-4")}>
              <dt className="text-sm text-dim">{label} sınırı</dt>
              <dd className="tabular mt-1 font-mono text-bone">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    )}

    <p className="border-t border-rule px-5 py-4 text-xs leading-relaxed text-dim sm:px-6">
      Ön değerlendirmedir. Kesin karar güzergah etüdü ve KGM izin sürecinde verilir.
    </p>
  </aside>
);

export default LoadCheckPanel;
