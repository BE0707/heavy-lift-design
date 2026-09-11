import SectionHeader from "@/components/SectionHeader";
import { LEGAL_LIMITS } from "@/lib/load-check";

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

const LIMITS = [
  { label: "Genişlik", value: `${fmt(LEGAL_LIMITS.width)} m` },
  { label: "Yükseklik (yoldan)", value: `${fmt(LEGAL_LIMITS.height)} m` },
  { label: "Çekici + yarı römork boyu", value: `${fmt(LEGAL_LIMITS.length)} m` },
  { label: "Toplam ağırlık (5 dingil)", value: `${fmt(LEGAL_LIMITS.grossWeight, 0)} t` },
];

const OperationsProtocol = () => (
  <section id="protokol" aria-labelledby="protokol-title" className="border-b border-rule bg-ink py-20 lg:py-28">
    <div className="container">
      <SectionHeader
        index="02"
        kicker="Operasyon protokolü"
        titleId="protokol-title"
        title="İzin, Güzergah & Eskort Protokolü"
        lead="Gabari dışı her sevkiyat aynı sırayla ilerler: ölçü, dorse, güzergah, izin, eskort, teslim. Eskort araç tahsisi ve geçiş izinleri KTK mevzuatına uygun yürütülür."
      />

      <ol className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-ink p-6">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="font-mono text-sm font-medium text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-rule-strong" />
              <span className="h-2 w-2 border border-signal" />
            </div>
            <h3 className="mt-5 text-xl uppercase leading-tight tracking-[0.02em]">{step.title}</h3>
            <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-steel">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 border border-rule-strong">
        <div aria-hidden="true" className="hazard-band h-2" />
        <div className="grid gap-6 p-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-8">
          <div className="lg:col-span-4">
            <h3 className="text-2xl uppercase tracking-[0.02em]">Yasal gabari sınırları</h3>
            <p className="mt-2 text-pretty text-steel">
              Karayolları Trafik Yönetmeliği genel sınırları. Bu değerlerden birini aşan sevkiyat özel izin kapsamındadır.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px bg-rule lg:col-span-8 lg:grid-cols-4">
            {LIMITS.map((l) => (
              <div key={l.label} className="bg-ink px-4 py-4">
                <dt className="label">{l.label}</dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold text-bone">{l.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default OperationsProtocol;
