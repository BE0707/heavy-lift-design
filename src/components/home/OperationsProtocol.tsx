import SectionHeader from "@/components/SectionHeader";
import GaugeProfile from "@/components/GaugeProfile";
import { LEGAL_LIMITS } from "@/lib/load-check";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Yük bildirimi",
    text: "Yük tipi, marka/model, tahmini ağırlık ve ölçüler (boy × en × yükseklik); çıkış ve varış noktası.",
  },
  {
    title: "Dorse & dingil hesabı",
    text: "Ağırlık dağılımına göre dorse tipi ve dingil sayısı seçilir; yasal dingil yükleri kontrol edilir.",
  },
  {
    title: "Güzergah etüdü",
    text: "Köprü ve menfez kapasitesi, üst geçit ve enerji hattı yükseklikleri, dar viraj ve şantiye girişleri kontrol edilir.",
  },
  {
    title: "KGM özel izni",
    text: "Gabari dışı veya ağır yükler için Karayolları Genel Müdürlüğü'nden özel yük taşıma izni alınır.",
  },
  {
    title: "Eskort & sevkiyat",
    text: "Yük boyutuna göre ön ve arka eskort aracı tahsis edilir; yük zincir ve gerdirmelerle sabitlenir, izinli saatlerde yola çıkılır.",
  },
  {
    title: "Teslim",
    text: "Şantiyede rampadan veya vinçle indirme, bağlama elemanlarının sökümü ve teslim.",
  },
] as const;

const fmt = (n: number, digits = 2) => n.toLocaleString("tr-TR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

const Station = ({ index, title, text, className }: { index: number; title: string; text: string; className?: string }) => (
  <div className={className}>
    <p className="font-mono text-xs text-dim">{String(index + 1).padStart(2, "0")}</p>
    <h3 className="mt-2 text-xl leading-snug">{title}</h3>
    <p className="mt-2 max-w-[28ch] text-pretty text-[0.9375rem] leading-relaxed text-steel">{text}</p>
  </div>
);

/**
 * Güzergah şeması: altı istasyonlu tek hat. Masaüstünde metinler hattın bir
 * üstünde bir altında yer alır; mobilde dikey hat.
 */
const RouteSheet = () => (
  <div className="mt-20">
    {/* masaüstü: yatay hat */}
    <ol className="hidden grid-cols-6 lg:grid" aria-label="Operasyon adımları">
      {STEPS.map((step, i) => {
        const above = i % 2 === 1;
        return (
          <li key={step.title} className="grid grid-rows-[minmax(11rem,auto)_1.5rem_minmax(11rem,auto)] pr-6">
            {above ? <Station index={i} {...step} className="self-end pb-6" /> : <span aria-hidden="true" />}
            <div aria-hidden="true" className="relative flex items-center">
              <span className={cn("absolute inset-x-0 top-1/2 h-px -translate-y-1/2", i === STEPS.length - 1 ? "right-auto w-0" : "bg-rule-strong", "-mr-6")} />
              <span
                className={cn(
                  "relative z-10 block border",
                  i === 0 || i === STEPS.length - 1 ? "h-3 w-3 border-signal bg-signal" : "h-3 w-3 rounded-full border-steel bg-ink",
                )}
              />
            </div>
            {!above ? <Station index={i} {...step} className="pt-6" /> : <span aria-hidden="true" />}
          </li>
        );
      })}
    </ol>

    {/* mobil / tablet: dikey hat */}
    <ol className="relative grid gap-10 border-l border-rule-strong pl-7 lg:hidden" aria-label="Operasyon adımları">
      {STEPS.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute -left-[calc(1.75rem+6.5px)] top-1 block h-3 w-3 border",
              i === 0 || i === STEPS.length - 1 ? "border-signal bg-signal" : "rounded-full border-steel bg-ink",
            )}
          />
          <Station index={i} {...step} />
        </li>
      ))}
    </ol>
  </div>
);

const OperationsProtocol = () => {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="protokol" aria-labelledby="protokol-title" className="border-t border-rule bg-ink py-24 lg:py-32">
      <div ref={revealRef} className="container">
        <SectionHeader
          index="02"
          kicker="Operasyon protokolü"
          titleId="protokol-title"
          title="İzin, Güzergah & Eskort Protokolü"
          lead="Gabari dışı her sevkiyat aynı sırayla ilerler: ölçü, dorse, güzergah, izin, eskort, teslim. Eskort araç tahsisi ve geçiş izinleri KTK mevzuatına uygun yürütülür."
          layout="split"
        />

        <RouteSheet />

        <div className="mt-24 grid gap-12 border-t border-rule pt-14 lg:mt-28 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h3 className="text-display-md">Yasal gabari sınırları</h3>
            <p className="mt-4 max-w-[36ch] text-pretty text-steel">
              Karayolları Trafik Yönetmeliği genel sınırları. Bu değerlerden birini aşan sevkiyat özel izin ve eskort
              kapsamındadır.
            </p>
            <dl className="mt-10 grid grid-cols-2 border-t border-rule">
              {[
                { label: "Çekici + yarı römork", value: fmt(LEGAL_LIMITS.length), unit: "m" },
                { label: "Toplam ağırlık (5 dingil)", value: fmt(LEGAL_LIMITS.grossWeight, 0), unit: "t" },
              ].map((l, i) => (
                <div key={l.label} className={cn("pt-5", i === 1 && "border-l pl-5")}>
                  <dt className="text-sm text-dim">{l.label}</dt>
                  <dd className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-medium tracking-[-0.03em] text-bone">{l.value}</span>
                    <span className="font-mono text-sm text-signal">{l.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="min-w-0 lg:col-span-8">
            <div className="bg-blueprint overflow-x-auto border-y border-rule">
              <GaugeProfile className="mx-auto block h-auto w-full min-w-[520px] max-w-[720px]" />
            </div>
            <figcaption className="mt-3 text-sm text-dim">
              Genişlik ve yükseklik sınırı arka görünüşte; boy ve ağırlık sınırı solda. Taralı bölge, zarfı aşan yük
              kısmıdır.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default OperationsProtocol;
