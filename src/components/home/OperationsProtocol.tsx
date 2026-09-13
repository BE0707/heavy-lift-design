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
  { label: "Genişlik", value: `${fmt(LEGAL_LIMITS.width)} m`, note: "Maks. yasal sınır" },
  { label: "Yükseklik (yoldan)", value: `${fmt(LEGAL_LIMITS.height)} m`, note: "Yol kotundan ölçülür" },
  { label: "Çekici + yarı römork boyu", value: `${fmt(LEGAL_LIMITS.length)} m`, note: "Standart kombinasyon" },
  { label: "Toplam ağırlık (5 dingil)", value: `${fmt(LEGAL_LIMITS.grossWeight, 0)} t`, note: "İzinsiz azami sınır" },
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
        layout="split"
      />

      {/* Editoryal süreç akışı: kutu kafesi yerine açık, ritmik zaman çizgisi */}
      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="group flex flex-col border-t border-rule pt-6 transition-colors hover:border-signal">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-1.5 w-1.5 rounded-none bg-rule-strong group-hover:bg-signal transition-colors" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-bone">
              {step.title}
            </h3>
            <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-steel/90">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      {/* Yasal sınırlar: kutu yerine açık editoryal teknik veri bandı */}
      <div className="mt-16 border-t border-rule-strong pt-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="label text-signal">Mevzuat Referansı</p>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-bone">
              Yasal gabari sınırları
            </h3>
            <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-steel">
              Karayolları Trafik Yönetmeliği genel sınırları. Bu değerlerden birini aşan sevkiyat özel izin ve eskort kapsamındadır.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-8">
            {LIMITS.map((l) => (
              <div key={l.label} className="border-l border-rule pl-4">
                <dt className="label text-dim">{l.label}</dt>
                <dd className="mt-2 font-display text-3xl font-bold tabular text-bone lg:text-4xl">
                  {l.value}
                </dd>
                <dd className="mt-1 font-mono text-2xs text-steel/70">{l.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default OperationsProtocol;
