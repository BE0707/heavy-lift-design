import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, ArrowRight, CheckCircle2, SlidersHorizontal, MessageSquare, Phone } from "lucide-react";

interface FleetEquipment {
  id: string;
  category: "teleskopik" | "havuzlu" | "moduler" | "eskort";
  title: string;
  subtitle: string;
  badge: string;
  payload: string;
  axles: string;
  dimensions: string;
  deckHeight: string;
  description: string;
  applications: string[];
  keySpecs: { label: string; value: string }[];
}

const fleetList: FleetEquipment[] = [
  {
    id: "havuzlu-lowbed",
    category: "havuzlu",
    title: "Havuzlu (Drop Deck) Ağır Hizmet Lowbed",
    subtitle: "Düşük Zemin Yükseklikli İş Makinesi Dorsesi",
    badge: "YÜKSEK GABARİ KORUMASI",
    payload: "35 – 70 Ton Kapasite",
    axles: "3 - 5 Dingil Grubu",
    dimensions: "Havuz: 7.50m - 11.50m / Toplam 13.60m",
    deckHeight: "35 cm – 55 cm Yükleme Yüksekliği",
    description:
      "Zemin yüksekliği minimuma indirilmiş havuzlu dorselerimiz, yüksek kabinli ve kuleli paletli makinelerin otoyol köprü ve üst geçit gabari sınırlarına takılmadan güvenle nakledilmesini sağlar.",
    applications: [
      "CAT 336 / 349 & Volvo EC380 / EC480 Paletli Ekskavatörler",
      "Komatsu D85 / D155 ve Ağır Zırhlı Dozerler",
      "Fore Kazık & Sondaj Delgi Makineleri",
      "Yüksek Gövdeli Endüstriyel Presler",
    ],
    keySpecs: [
      { label: "Dingil Tipi", value: "Ağır Hizmet Aksları" },
      { label: "Rampa Donanımı", value: "Hidrolik Ağır Yük Rampası" },
      { label: "Genişleme", value: "Yan Açılır Destek Kolları (+60cm)" },
      { label: "Lashing", value: "16mm Grade 80 Emniyet Zincirleri" },
    ],
  },
  {
    id: "teleskopik-lowbed",
    category: "teleskopik",
    title: "Teleskopik / Uzatmalı Ağır Nakliye Lowbed",
    subtitle: "Uzun Metrajlı Sanayi & Enerji Taşıyıcı",
    badge: "28 METREYE KADAR UZAMA",
    payload: "50 – 90 Ton Kapasite",
    axles: "5 - 8 Dingil (Hidrolik Dümenlenir)",
    dimensions: "13.60m Kapalı → 28.00m Açık Teleskopik",
    deckHeight: "85 cm – 100 cm Platform Yüksekliği",
    description:
      "Teleskopik uzayabilen özel şasili dorselerimiz, aşırı uzun yüklerde viraj kabiliyeti sağlayan bağımsız hidrolik dümenlenebilir aksları ile en dar şantiye yollarında dahi üstün manevra kabiliyeti sunar.",
    applications: [
      "Prefabrik Beton Köprü & Viyadük Kirişleri",
      "Rüzgar Enerji Santrali (RES) Kanat & Kule Parçaları",
      "Büyük Çaplı Çelik Boru Hatları & Profiller",
      "Kule Vinç Gövde, Bom ve Karşı Ağırlık Elemanları",
    ],
    keySpecs: [
      { label: "Manevra Sistemi", value: "Hidrolik Uzaktan Kumandalı Aks" },
      { label: "Uzatma Kademesi", value: "Kilit Mekanizmalı Çift Kademeli" },
      { label: "Kiriş Yatağı", value: "Özel Takoz & Döner Platform Destek" },
      { label: "Süspansiyon", value: "Pnömatik / Hidrolik Dengeleme" },
    ],
  },
  {
    id: "moduler-platform",
    category: "moduler",
    title: "Çok Dingilli Ağır Sanayi Platformu",
    subtitle: "Yüksek Tonajlı Tesis & Konkasör Nakliyesi",
    badge: "120 TONA KADAR AĞIR HİZMET",
    payload: "70 – 120+ Ton Kapasite",
    axles: "6 - 8+ Dingil Kombinasyonu",
    dimensions: "Genişlik: 3.00m (+60cm Genişleme)",
    deckHeight: "90 cm Düz Taşıma Güvertesi",
    description:
      "Maden, taş ocağı ve endüstriyel tesis kurulumları için tasarlanmış çok dingilli ağır yük platformlarımız, aşırı tonajları dengeli şekilde dingil başına dağıtarak KGM yol standartlarına tam uyum sağlar.",
    applications: [
      "Mobil Taş Kırma Eleme Tesisleri (Konkasör)",
      "Yüksek Gerilim Santral Trafoları & Reaktörler",
      "Fabrika Döner Fırın & Silo Gövdeleri",
      "Ağır Madencilik Yükleyicileri & Kaya Kamyonları",
    ],
    keySpecs: [
      { label: "Aks Yükü Dağılımı", value: "KGM Dingil Başı Tolerans Uyumlu" },
      { label: "Şasi Malzemesi", value: "Yüksek Mukavemetli Weldox Çelik" },
      { label: "Güverte", value: "Kaymaz Izgaralı Ağır Hizmet Tabanı" },
      { label: "Fren Sistemi", value: "EBS & Otomatik Yük Duyarlı Fren" },
    ],
  },
  {
    id: "eskort-guvenlik",
    category: "eskort",
    title: "Öncü & Artçı Eskort ve Güzergah İzin Yönetimi",
    subtitle: "KTK 33/1 KGM Protokolleri & Yol Emniyeti",
    badge: "YASAL PROSEDÜR & SAHA ESKORTU",
    payload: "Gabari Dışı Konvoy Refakati",
    axles: "Özel Donanımlı Destek Filosu",
    dimensions: "Türkiye Geneli Güzergah Analizi",
    deckHeight: "Köprü & Menfez Gabari Etütleri",
    description:
      "Gabari dışı ve ağır tonajlı yüklerin nakliyesinde Karayolları Genel Müdürlüğü (KGM) özel izin belgelerinin alınması, güzergah etütlerinin yapılması ve yasal tepe lambalı eskort araçlarımızla konvoy emniyetinin sağlanması.",
    applications: [
      "KTK 33/1 Özel Taşıma İzin Belgesi Temini",
      "Sarı Tepe Lambalı Öncü & Artçı Araç Refakati",
      "Köprü Statik Mukavemet ve Alt Geçit Gabari Analizi",
      "Enerji & Telekom Hat Yükseklik Kontrolleri",
    ],
    keySpecs: [
      { label: "Mevzuat Uyumu", value: "Karayolları Taşıma Yönetmeliği" },
      { label: "Haberleşme", value: "Kesintisiz VHF Telsiz & GPS Takibi" },
      { label: "Tabela & İkaz", value: "Mevzuata Uygun Reflektif Donanım" },
      { label: "Raporlama", value: "Şantiye Sorumlusuna Anlık Rota Bilgisi" },
    ],
  },
];

const loadTypes = [
  "Paletli Ekskavatör (20 - 55 Ton)",
  "Dozer / Zırhlı İş Makinesi (25 - 60 Ton)",
  "Mobil Taş Kırma Eleme Tesisi / Konkasör",
  "Kule Vinç & Ağır Bom Parçaları",
  "Beton / Çelik Köprü Kirişi (Uzun Metraj)",
  "Transformatör / Endüstriyel Kazan / Tank",
  "Delgi / Fore Kazık / Sondaj Ekipmanı",
  "Diğer Gabari Dışı Ağır Sanayi Ekipmanı",
];

const tonnageOptions = [
  "10 – 25 Ton",
  "25 – 45 Ton",
  "45 – 70 Ton",
  "70 – 100 Ton",
  "100+ Ton (Özel Proje & Çok Dingil)",
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<string>("tum");
  const [selectedLoadType, setSelectedLoadType] = useState<string>(loadTypes[0]);
  const [selectedTonnage, setSelectedTonnage] = useState<string>(tonnageOptions[1]);
  const [originCity, setOriginCity] = useState<string>("Diyarbakır");
  const [destCity, setDestCity] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  const filteredFleet =
    activeTab === "tum"
      ? fleetList
      : fleetList.filter((item) => item.category === activeTab);

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Merhaba Bumerang Ağır Nakliyat Dispeç Merkezi,\n\n` +
      `Ağır nakliyat / lowbed transfer fiyatı almak istiyorum:\n` +
      `• Yük Tipi: ${selectedLoadType}\n` +
      `• Tahmini Ağırlık: ${selectedTonnage}\n` +
      `• Çıkış Noktası: ${originCity || "Diyarbakır"}\n` +
      `• Varış Noktası: ${destCity || "Belirtilecek"}\n` +
      (companyName ? `• Şantiye / Firma: ${companyName}\n` : "") +
      `\nMüsait araç ve fiyat teklifinizi rica ederim.`
    );
    window.open(`https://wa.me/905327459843?text=${text}`, "_blank");
  };

  return (
    <section id="filo" className="py-16 sm:py-20 md:py-24 bg-asphalt-950 border-b border-steel-border relative">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt-900 border border-steel-border text-machinery-yellow font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 bg-machinery-yellow rounded-full" />
            TEKNİK FİLO & TAŞIMA KAPASİTELERİ
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground uppercase tracking-tight">
            Şantiye Şartlarına Uygun <br className="hidden sm:block" />
            <span className="text-machinery-yellow">Mühendislik Standartlarında</span> Ekipman Parkı
          </h2>
          <p className="font-sans text-steel-light text-sm sm:text-base md:text-lg mt-3 max-w-3xl leading-relaxed">
            Ağır tonajlı iş makinelerinden gabari dışı endüstriyel tesislere kadar; 3 ila 8 dingilli lowbed, teleskopik uzatmalı dorse ve tepe lambalı eskort filomuzla Türkiye genelinde hizmet veriyoruz.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-steel-border/60">
          {[
            { id: "tum", label: "TÜM FİLO & MEVZUAT" },
            { id: "havuzlu", label: "HAVUZLU LOWBED (İŞ MAKİNESİ)" },
            { id: "teleskopik", label: "TELESKOPİK (UZUN METRAJ)" },
            { id: "moduler", label: "ÇOK DİNGİLLİ (AĞIR SANAYİ)" },
            { id: "eskort", label: "ESKORT & KTK İZİN" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all rounded-sm border ${
                activeTab === tab.id
                  ? "bg-machinery-yellow text-asphalt-950 border-machinery-yellow shadow-sm"
                  : "bg-asphalt-900 text-steel-light border-steel-border hover:border-steel hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fleet Equipment Cards (Spec-Sheet Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredFleet.map((item) => (
            <div
              key={item.id}
              className="bg-asphalt-900 border border-steel-border hover:border-machinery-yellow/70 transition-all rounded-sm p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group shadow-lg"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-asphalt-800 group-hover:bg-machinery-yellow transition-colors" />

              <div>
                {/* Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-machinery-yellow/15 border border-machinery-yellow/40 text-machinery-yellow uppercase tracking-widest">
                    {item.badge}
                  </span>
                  <span className="font-mono text-xs text-steel font-medium">
                    {item.axles}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground uppercase tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-machinery-amber mb-4">
                  {item.subtitle}
                </p>

                {/* Key Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 bg-asphalt-950/80 border border-steel-border/70 rounded-sm mb-5 font-mono text-xs">
                  <div>
                    <span className="text-steel text-[10px] block uppercase">Net Kapasite</span>
                    <span className="font-bold text-foreground text-xs sm:text-sm">{item.payload}</span>
                  </div>
                  <div>
                    <span className="text-steel text-[10px] block uppercase">Zemin / Güverte</span>
                    <span className="font-bold text-machinery-yellow text-xs sm:text-sm">{item.deckHeight}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-steel text-[10px] block uppercase">Platform Boyutu</span>
                    <span className="font-bold text-foreground text-xs sm:text-sm">{item.dimensions}</span>
                  </div>
                </div>

                <p className="text-steel-light text-xs sm:text-sm leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Common Applications */}
                <div className="mb-5">
                  <h4 className="font-mono text-[11px] text-steel uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-machinery-yellow" />
                    Tipik Taşıma ve Yük Kapsamı:
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {item.applications.map((app, idx) => (
                      <li key={idx} className="text-xs text-steel-light flex items-start gap-2">
                        <span className="text-machinery-yellow font-bold">&bull;</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Spec Matrix Table */}
              <div className="pt-4 border-t border-steel-border/70">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {item.keySpecs.map((spec, sIdx) => (
                    <div key={sIdx} className="bg-asphalt-850/60 p-2 border border-steel-border/40 rounded-sm">
                      <span className="text-steel block text-[10px]">{spec.label}:</span>
                      <span className="text-foreground font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prominent "Hızlı Yük Bildirimi & Fiyat Talebi" (Freight Dispatch Tool) */}
        <div
          id="filo-teklif"
          className="bg-asphalt-900 border-2 border-machinery-yellow/60 rounded-sm p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl"
        >
          {/* Top Industrial Danger/Warning Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-hazard-stripes-bold" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-machinery-yellow text-asphalt-950 font-mono text-[11px] font-extrabold uppercase tracking-wider mb-3">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                DİSPEÇ OPERASYON TALEBİ
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground uppercase tracking-tight leading-tight mb-3">
                Hızlı Yük Bildirimi & <br className="hidden sm:block" />
                <span className="text-machinery-yellow">Lowbed Fiyat Talebi</span>
              </h3>
              <p className="text-steel-light text-sm leading-relaxed mb-6">
                Şantiyenizdeki veya fabrikanızdaki makine ve ekipman parametrelerini seçin; doğrudan sevkiyat yetkililerimize WhatsApp veya telefon üzerinden anlık rotaya uygun lowbed teklifi iletin.
              </p>

              <div className="space-y-3 font-mono text-xs text-steel-light">
                <div className="flex items-center gap-2.5 p-2.5 bg-asphalt-950 border border-steel-border/80 rounded-sm">
                  <ShieldCheck className="w-4 h-4 text-machinery-yellow flex-shrink-0" />
                  <span>KGM Özel İzin Belgesi & Güzergah Analizi Dahil</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-asphalt-950 border border-steel-border/80 rounded-sm">
                  <Truck className="w-4 h-4 text-machinery-yellow flex-shrink-0" />
                  <span>Diyarbakır Merkez Garaj & 81 İl Şantiye Transferi</span>
                </div>
              </div>

              {/* Direct Dispatcher Contacts */}
              <div className="mt-6 pt-5 border-t border-steel-border/60 flex flex-wrap gap-3">
                <a
                  href="tel:+905327459843"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-asphalt-800 border border-steel-border rounded-sm text-xs font-mono text-foreground hover:text-machinery-yellow hover:border-machinery-yellow transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-machinery-yellow" />
                  <span>Ramazan Karaboğa: 0532 745 98 43</span>
                </a>
                <a
                  href="tel:+905326562605"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-asphalt-800 border border-steel-border rounded-sm text-xs font-mono text-foreground hover:text-machinery-yellow hover:border-machinery-yellow transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-machinery-yellow" />
                  <span>Engin Karaboğa: 0532 656 26 05</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Form Column */}
            <div className="lg:col-span-7 bg-asphalt-950 p-5 sm:p-7 border border-steel-border rounded-sm">
              <div className="space-y-4">
                {/* 1. Yük Cinsi */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-steel font-bold mb-1.5">
                    1. Taşınacak Ekipman / Yük Tipi
                  </label>
                  <select
                    value={selectedLoadType}
                    onChange={(e) => setSelectedLoadType(e.target.value)}
                    aria-label="Taşınacak Ekipman veya Yük Tipi Seçin"
                    className="w-full bg-asphalt-900 border border-steel-border text-foreground text-sm rounded-sm px-3 py-2.5 focus:border-machinery-yellow focus:outline-none font-sans"
                  >
                    {loadTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Tonaj */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-steel font-bold mb-1.5">
                    2. Tahmini Ağırlık / Tonaj
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {tonnageOptions.map((ton, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTonnage(ton)}
                        className={`px-2.5 py-2 text-xs font-mono text-center border rounded-sm transition-all ${
                          selectedTonnage === ton
                            ? "bg-machinery-yellow text-asphalt-950 font-bold border-machinery-yellow"
                            : "bg-asphalt-900 text-steel-light border-steel-border hover:border-steel"
                        }`}
                      >
                        {ton}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Güzergah */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel font-bold mb-1.5">
                      3. Yükleme Noktası (İl / İlçe)
                    </label>
                    <input
                      type="text"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      placeholder="Örn: Diyarbakır / Kayapınar"
                      className="w-full bg-asphalt-900 border border-steel-border text-foreground text-sm rounded-sm px-3 py-2.5 focus:border-machinery-yellow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel font-bold mb-1.5">
                      4. Boşaltma Noktası (Varış)
                    </label>
                    <input
                      type="text"
                      value={destCity}
                      onChange={(e) => setDestCity(e.target.value)}
                      placeholder="Örn: Şanlıurfa, Batman, Mersin..."
                      className="w-full bg-asphalt-900 border border-steel-border text-foreground text-sm rounded-sm px-3 py-2.5 focus:border-machinery-yellow focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Şantiye / Firma Adı */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-steel font-bold mb-1.5">
                    5. Şantiye Şefi / Firma Adı (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Örn: X İnşaat / Proje Müdürü"
                    className="w-full bg-asphalt-900 border border-steel-border text-foreground text-sm rounded-sm px-3 py-2.5 focus:border-machinery-yellow focus:outline-none"
                  />
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="machinery"
                    size="lg"
                    onClick={handleWhatsAppQuote}
                    className="w-full font-display font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 h-12 shadow-yellow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp İle Fiyat İste
                  </Button>

                  <a
                    href="tel:+905327459843"
                    className="w-full h-12 bg-asphalt-900 border border-steel-border hover:border-machinery-yellow text-foreground hover:text-machinery-yellow font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 rounded-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-machinery-yellow" />
                    Doğrudan Dispeçi Ara
                  </a>
                </div>

                <p className="text-[11px] font-mono text-steel text-center pt-1">
                  * Bilgileriniz doğrudan saha sevkiyat sorumlusuna iletilir. Spam veya üçüncü tarafla paylaşım yapılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
