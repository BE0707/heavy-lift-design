import { AlertTriangle, CheckSquare, Info } from "lucide-react";
import { ASSUMPTIONS, LEGAL_LIMITS, type CheckLevel, type LoadAssessment } from "@/lib/load-check";
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

const fmt = (n: number, digits = 2) => n.toLocaleString("tr-TR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** Varsayımla hesaplanan toplam: değer değişince yeniden oturur (key) */
const Total = ({ label, value, unit, limit, assumption }: { label: string; value?: number; unit: string; limit: number; assumption: string }) => (
  <div className="px-5 py-5 sm:px-6">
    <dt className="label">{label}</dt>
    <dd className="mt-2 flex items-baseline gap-1.5">
      {value === undefined ? (
        <span className="text-lg text-dim">—</span>
      ) : (
        <span key={value} className="flex animate-spec-in items-baseline gap-1.5">
          <span className="font-mono text-sm text-dim">≈</span>
          <span className={cn("text-2xl font-medium tracking-[-0.02em]", value > limit ? "text-hazard-text" : "text-bone")}>
            {fmt(value, unit === "t" ? 0 : 2)}
          </span>
          <span className="font-mono text-sm text-signal">{unit}</span>
        </span>
      )}
    </dd>
    <dd className="mt-1 text-xs text-dim">{assumption}</dd>
  </div>
);

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
        <dl className="border-t border-rule">
          <div className="px-5 py-5 sm:px-6">
            <dt className="label">KGM özel izni</dt>
            <dd aria-live="polite" className={cn("mt-2 text-lg leading-snug", assessment.permit === "gerekli" ? "text-hazard-text" : "text-bone")}>
              {PERMIT_TEXT[assessment.permit]}
            </dd>
          </div>
          <div className="grid grid-cols-2 border-t border-rule [&>div+div]:border-l [&>div+div]:border-rule">
            <Total
              label="Toplam yükseklik"
              value={assessment.totals.height}
              unit="m"
              limit={LEGAL_LIMITS.height}
              assumption={`Platform ≈ ${fmt(ASSUMPTIONS.deckHeight, 1)} m varsayımıyla`}
            />
            <Total
              label="Toplam ağırlık"
              value={assessment.totals.weight}
              unit="t"
              limit={LEGAL_LIMITS.grossWeight}
              assumption={`Dara ≈ ${ASSUMPTIONS.tare} t varsayımıyla`}
            />
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
      Ön değerlendirmedir; platform yüksekliği ve dara varsayımdır. Dorseye uygunluğu operasyon masası, kesin kararı
      güzergah etüdü ve KGM izin süreci verir.
    </p>
  </aside>
);

export default LoadCheckPanel;
