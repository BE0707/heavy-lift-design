import { ShieldCheck, Compass, FileCheck2, Anchor, Radio, CheckSquare2 } from "lucide-react";

const engineeringProtocols = [
  {
    icon: Compass,
    code: "STD-01",
    title: "Güzergah & Köprü Statik Etüdü",
    description:
      "Ağır tonajlı ve gabari dışı yükler yola çıkmadan önce güzergah üzerindeki alt geçit gabari yükseklikleri, viyadükler, köprü tonaj sınırları ve dar viraj yarıçapları mühendislik titizliğiyle etüt edilir.",
    metrics: "KGM Alt Geçit & Viyadük Gabari Taraması",
  },
  {
    icon: FileCheck2,
    code: "STD-02",
    title: "KTK Madde 33/1 KGM Özel İzin Yönetimi",
    description:
      "Karayolları Trafik Kanunu Madde 33/1 kapsamında Ulaştırma Bakanlığı ve Karayolları Genel Müdürlüğü'nden zorunlu Özel Taşıma İzin Belgesi ve güzergah onay protokolleri eksiksiz tamamlanır.",
    metrics: "Yasal Ruhsat & Özel Güzergah Onayı",
  },
  {
    icon: ShieldCheck,
    code: "STD-03",
    title: "Öncü & Artçı Eskort Koordinasyonu",
    description:
      "Gabari dışı konvoyların seyir güvenliği için mevzuata tam uyumlu, tepe lambalı ve reflektif ikaz donanımlı eskort destek araçları refakat eder. Karayolundaki diğer sürücüler ve konvoy korunur.",
    metrics: "Reflektif Donanım & Sarı Döner Lamba",
  },
  {
    icon: Anchor,
    code: "STD-04",
    title: "Ağır Hizmet Sabitleme & Lashing (EN 12195)",
    description:
      "İş makineleri ve endüstriyel tesis bileşenleri, EN 12195-3 standardına uygun 16mm Grade 80/100 sertifikalı çelik zincirler, cırcırlı gergiler ve kaymaz taban matlarıyla dorselere kilitlenir.",
    metrics: "Grade 80/100 Çelik Emniyet Zincirleri",
  },
  {
    icon: Radio,
    code: "STD-05",
    title: "7/24 Kesintisiz Dispeç & Şantiye İletişimi",
    description:
      "Diyarbakır merkez dispeç merkezimiz, şantiye şefleri ve proje müdürlerine anlık sevkiyat durumu, tahmini varış saati (ETA) ve güzergah raporlamasını kesintisiz aktarır.",
    metrics: "Doğrudan Sevkiyat Yetkilisi Erişimi",
  },
];

const technicalParameters = [
  { label: "Maksimum Faydalı Yük", value: "120 Ton (Modüler Platform)" },
  { label: "Dingil Başı Tolerans", value: "KGM Standartlarına Tam Uyum" },
  { label: "Maksimum Platform Boyu", value: "28.00 Metre (Teleskopik)" },
  { label: "Minimum Zemin Yüksekliği", value: "35 cm (Havuzlu Dorse)" },
  { label: "Bağlama Standardı", value: "EN 12195-3 Lashing" },
  { label: "Operasyon Kapsamı", value: "Diyarbakır Merkezli 81 İl" },
];

const WhyChooseUs = () => {
  return (
    <section id="standartlar" className="py-16 sm:py-20 md:py-24 bg-asphalt-900 border-b border-steel-border relative">
      {/* Background Dots Grid */}
      <div className="absolute inset-0 bg-technical-dots opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt-950 border border-steel-border text-machinery-yellow font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 bg-machinery-yellow rounded-full" />
            OPERASYONEL STANDARTLAR & MÜHENDİSLİK
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground uppercase tracking-tight">
            Rastgele Taşımacılık Değil; <br className="hidden sm:block" />
            <span className="text-machinery-yellow">Sertifikalı Güvenlik & İzin Yönetimi</span>
          </h2>
          <p className="font-sans text-steel-light text-sm sm:text-base md:text-lg mt-3 max-w-3xl leading-relaxed">
            Ağır nakliyat, sıradan tır nakliyesinden tamamen farklı bir mühendislik ve lojistik disiplinidir. Bumerang Ağır Nakliyat olarak yükün fiziki boyutlarından yolun altyapı limitlerine kadar her aşamayı yasal ve teknik prosedürlerle yönetiyoruz.
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {engineeringProtocols.map((protocol) => (
            <div
              key={protocol.code}
              className="p-5 sm:p-6 bg-asphalt-950 border border-steel-border hover:border-machinery-yellow/60 rounded-sm flex flex-col justify-between group transition-all shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3">
                <span className="font-mono text-[11px] font-bold text-steel group-hover:text-machinery-yellow transition-colors">
                  {protocol.code}
                </span>
              </div>

              <div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-asphalt-900 border border-steel-border rounded-sm flex items-center justify-center mb-4 text-machinery-yellow group-hover:border-machinery-yellow group-hover:bg-machinery-yellow group-hover:text-asphalt-950 transition-all">
                  <protocol.icon className="w-5 h-5" />
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground uppercase tracking-tight mb-2">
                  {protocol.title}
                </h3>
                <p className="text-steel-light text-xs sm:text-sm leading-relaxed mb-4">
                  {protocol.description}
                </p>
              </div>

              <div className="pt-3 border-t border-steel-border/60">
                <span className="font-mono text-[11px] text-machinery-amber font-semibold block">
                  &bull; {protocol.metrics}
                </span>
              </div>
            </div>
          ))}

          {/* Technical Fleet Parameters Card */}
          <div className="p-5 sm:p-6 bg-asphalt-950 border-2 border-machinery-yellow/40 rounded-sm flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-machinery-yellow/15 text-machinery-yellow font-mono text-[10px] font-bold tracking-widest uppercase mb-3">
                TEKNİK PARAMETRELER
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground uppercase tracking-tight mb-3">
                Filo Emniyet Kriterleri
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {technicalParameters.map((param, pIdx) => (
                  <div key={pIdx} className="flex items-center justify-between pb-1.5 border-b border-steel-border/50">
                    <span className="text-steel text-[11px]">{param.label}:</span>
                    <span className="text-foreground font-semibold text-[11px] text-right">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-steel-border/70 flex items-center justify-between text-xs font-mono text-steel">
              <span className="flex items-center gap-1 text-machinery-yellow">
                <CheckSquare2 className="w-3.5 h-3.5" />
                Tam Mevzuat Uyumu
              </span>
              <span>Diyarbakır HQ</span>
            </div>
          </div>
        </div>

        {/* Operational Flow Banner */}
        <div className="p-6 sm:p-8 bg-asphalt-950 border border-steel-border rounded-sm relative overflow-hidden">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-steel-border pb-4 md:pb-0 md:pr-6">
              <span className="font-mono text-xs text-steel uppercase">Ağır Yük Süreci</span>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-machinery-yellow uppercase mt-0.5">
                Sevkiyat İş Akışı
              </h4>
              <p className="text-xs text-steel-light mt-1">Saha bildiriminden teslimata kadar 4 aşamalı planlama.</p>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-asphalt-900 border border-steel-border/70 rounded-sm">
                <span className="text-machinery-yellow font-bold block mb-1">01. YÜK VE ROTA TESPİTİ</span>
                <p className="text-steel-light text-[11px]">Tonaj, gabari boyutları ve güzergahın KGM köprü limitleri taranır.</p>
              </div>
              <div className="p-3 bg-asphalt-900 border border-steel-border/70 rounded-sm">
                <span className="text-machinery-yellow font-bold block mb-1">02. İZİN VE ESKORT TAHSİSİ</span>
                <p className="text-steel-light text-[11px]">KTK 33/1 belgesi düzenlenir, öncü/artçı eskort araçları belirlenir.</p>
              </div>
              <div className="p-3 bg-asphalt-900 border border-steel-border/70 rounded-sm">
                <span className="text-machinery-yellow font-bold block mb-1">03. LASHING VE TRANSFER</span>
                <p className="text-steel-light text-[11px]">Çelik zincir bağlama ile yük şantiye sahasına güvenle ulaştırılır.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
