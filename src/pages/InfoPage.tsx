import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SEO from "@/components/SEO";
import { Truck, ShieldCheck, Scale, Compass, CheckCircle2, Phone, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const InfoPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#hakkimizda") {
      setTimeout(() => {
        const element = document.getElementById("hakkimizda");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <SEO
        title="Lowbed Taşımacılık Nedir? KTK 33/1 ve Gabari Standartları | Bumerang Ağır Nakliyat"
        description="Lowbed taşımacılık nedir? Gabari dışı ağır yük taşıma sınırları, Karayolları KTK 33/1 özel izin prosedürleri, dingil yükü hesaplamaları ve Bumerang Ağır Nakliyat saha altyapısı."
        keywords="lowbed nedir, lowbed taşımacılık, gabari dışı taşıma sınırları, ktk 33/1 özel izin, ağır nakliyat mevzuatı, eskort araç zorunluluğu, diyarbakır lowbed firması"
      />
      <div className="min-h-screen bg-asphalt-950 text-foreground selection:bg-machinery-yellow selection:text-asphalt-950">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 bg-asphalt-900 border-b border-steel-border relative">
          <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt-950 border border-steel-border text-machinery-yellow font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <FileText className="w-3.5 h-3.5" />
                TEKNİK REHBER & MEVZUAT
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-foreground">
                Lowbed Taşımacılık, Gabari Sınırları & <br className="hidden sm:block" />
                <span className="text-machinery-yellow">KTK 33/1 İzin Mevzuatı</span>
              </h1>
              <p className="font-sans text-steel-light text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
                İş makineleri, şantiye tesisleri ve sanayi ekipmanlarının taşınmasında mühendislik hesapları, dingil başı ağırlık dağılımı ve resmi karayolları izin süreçleri hakkında teknik rehber.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Definition & Lowbed Mechanics */}
        <section className="py-16 sm:py-20 bg-asphalt-950 border-b border-steel-border">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Technical Principles */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-mono text-xs text-machinery-yellow font-bold uppercase tracking-widest block mb-2">
                    01. MÜHENDİSLİK PRENSİBİ
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
                    Lowbed Dorse Nedir ve Neden Zorunludur?
                  </h2>
                </div>

                <p className="text-steel-light text-sm sm:text-base leading-relaxed">
                  Standart tenteli veya açık kasa tır dorselerinin zemin yüksekliği 1.30m - 1.45m civarındadır. Karayolları Genel Müdürlüğü (KGM) mevzuatına göre köprü ve tünellerde maksimum yasal yükseklik sınırı <strong className="text-foreground">4.00 metre</strong>dir. Yüksekliği 3 metreyi aşan bir paletli ekskavatör standart dorsede taşındığında köprülere çarpma riski taşır ve kanunen yasaktır.
                </p>

                <p className="text-steel-light text-sm sm:text-base leading-relaxed">
                  <strong className="text-machinery-yellow">Lowbed (Alçak Güverteli Dorse)</strong>, tekerlek akslarının arasına veya önüne indirgenmiş özel şasisi sayesinde zemin yüksekliğini <strong className="text-foreground">35 cm ile 60 cm</strong> seviyesine çeker. Böylece yüksek kabinli ekskavatör, kule vinç veya kırma eleme tesisleri köprü gabarisine takılmadan emniyetle sevk edilir.
                </p>

                {/* Technical Advantages */}
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div className="p-3.5 bg-asphalt-900 border border-steel-border rounded-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-machinery-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block uppercase">Düşük Ağırlık Merkezi:</span>
                      <span className="text-steel-light">Virajlarda devrilme momentini minimize eder, yol tutuşunu maksimuma çıkarır.</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-asphalt-900 border border-steel-border rounded-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-machinery-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block uppercase">Çok Dingilli Aks Yükü Dağılımı:</span>
                      <span className="text-steel-light">4 ila 8 dingil sayesinde tonaj karayollarına eşit dağıtılır, yol tabakası korunur.</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-asphalt-900 border border-steel-border rounded-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-machinery-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block uppercase">Hidrolik Dümenlenebilir Dingiller:</span>
                      <span className="text-steel-light">Dar şantiye dönemeçlerinde ve şehirlerarası kavşaklarda manevra kabiliyeti sağlar.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Gabari Thresholds Matrix */}
              <div className="lg:col-span-5 bg-asphalt-900 border border-steel-border p-6 sm:p-7 rounded-sm shadow-xl">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-steel-border">
                  <Scale className="w-5 h-5 text-machinery-yellow" />
                  <div>
                    <span className="font-mono text-[11px] text-steel uppercase block">T.C. KARAYOLLARI MEVZUATI</span>
                    <h3 className="font-display text-lg font-bold text-foreground uppercase">
                      Gabari Dışı (Out of Gauge) Kriterleri
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-asphalt-950 border border-steel-border/70 rounded-sm">
                    <div className="flex justify-between text-steel mb-1">
                      <span>YASAL GENİŞLİK SINIRI:</span>
                      <span className="font-bold text-machinery-yellow">2.55 Metre</span>
                    </div>
                    <p className="text-[11px] text-steel-light">2.55 m üzeri yüklerde KGM Özel İzin ve öncü eskort şartı aranır.</p>
                  </div>

                  <div className="p-3 bg-asphalt-950 border border-steel-border/70 rounded-sm">
                    <div className="flex justify-between text-steel mb-1">
                      <span>YASAL YÜKSEKLİK SINIRI:</span>
                      <span className="font-bold text-machinery-yellow">4.00 Metre</span>
                    </div>
                    <p className="text-[11px] text-steel-light">Yerden yükseklik 4.00 m üzeri yüklerde havuzlu lowbed zorunludur.</p>
                  </div>

                  <div className="p-3 bg-asphalt-950 border border-steel-border/70 rounded-sm">
                    <div className="flex justify-between text-steel mb-1">
                      <span>YASAL TOPLAM UZUNLUK:</span>
                      <span className="font-bold text-machinery-yellow">16.50 – 18.75 Metre</span>
                    </div>
                    <p className="text-[11px] text-steel-light">18.75 m üzeri kiriş/boru yüklerinde teleskopik uzatmalı dorse kullanılır.</p>
                  </div>

                  <div className="p-3 bg-asphalt-950 border border-steel-border/70 rounded-sm">
                    <div className="flex justify-between text-steel mb-1">
                      <span>BRÜT AĞIRLIK SINIRI:</span>
                      <span className="font-bold text-machinery-yellow">40 – 44 Ton</span>
                    </div>
                    <p className="text-[11px] text-steel-light">44 ton üstü taşımalar KTK 33/1 Özel İzin Belgesine tabidir.</p>
                  </div>
                </div>

                <div className="mt-5 p-3 bg-machinery-yellow/10 border border-machinery-yellow/40 rounded-sm flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-machinery-yellow flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-steel-light leading-relaxed">
                    Bumerang Ağır Nakliyat, yükünüz bu limitleri aştığında Karayolları Genel Müdürlüğü&apos;nden resmi izinleri bizzat alarak sevkiyatı başlatır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KTK 33/1 & Escort Protocols */}
        <section className="py-16 sm:py-20 bg-asphalt-900 border-b border-steel-border">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mb-12">
              <span className="font-mono text-xs text-machinery-yellow font-bold uppercase tracking-widest block mb-2">
                02. YASAL MEVZUAT & SAHA EMNİYETİ
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
                KTK Madde 33/1 ve Eskort Refakat Prosedürü
              </h2>
              <p className="font-sans text-steel-light text-sm sm:text-base mt-2 leading-relaxed">
                2918 sayılı Karayolları Trafik Kanunu’nun 33/1 maddesi uyarınca ağırlık ve boyutları standartları aşan araçların karayoluna çıkışı özel izne bağlanmıştır.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-asphalt-950 border border-steel-border rounded-sm shadow-md">
                <div className="w-10 h-10 bg-asphalt-900 border border-steel-border flex items-center justify-center text-machinery-yellow mb-4 font-mono font-bold">
                  01
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-foreground mb-2">
                  Özel İzin Belgesi Başvurusu
                </h3>
                <p className="text-steel-light text-xs sm:text-sm leading-relaxed font-sans">
                  Çekici ve dorse plakaları, yükün net boyutları ve tonajı KGM sistemine işlenir. Belirlenen güzergah boyunca köprü ve menfez yük taşıma kapasiteleri taranır.
                </p>
              </div>

              <div className="p-6 bg-asphalt-950 border border-steel-border rounded-sm shadow-md">
                <div className="w-10 h-10 bg-asphalt-900 border border-steel-border flex items-center justify-center text-machinery-yellow mb-4 font-mono font-bold">
                  02
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-foreground mb-2">
                  Öncü & Artçı Eskort Araç Tahsisi
                </h3>
                <p className="text-steel-light text-xs sm:text-sm leading-relaxed font-sans">
                  Genişliği 3.00 metreyi aşan konvoylara önde uyarıcı öncü araç, arkada konvoy emniyetini sağlayan artçı araç eşlik eder. Araçlarda sarı tepe lambaları zorunludur.
                </p>
              </div>

              <div className="p-6 bg-asphalt-950 border border-steel-border rounded-sm shadow-md">
                <div className="w-10 h-10 bg-asphalt-900 border border-steel-border flex items-center justify-center text-machinery-yellow mb-4 font-mono font-bold">
                  03
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-foreground mb-2">
                  EN 12195 Lashing Emniyeti
                </h3>
                <p className="text-steel-light text-xs sm:text-sm leading-relaxed font-sans">
                  Yük, dorsenin şasisine Grade 80 çelik gerdirme zincirleriyle kilitlenir. Ani frenleme ve viraj savrulmalarında sıfır milim kayma hedeflenir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Company & Regional Authority */}
        <section id="hakkimizda" className="py-16 sm:py-20 bg-asphalt-950 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="bg-asphalt-900 border-2 border-steel-border p-6 sm:p-10 rounded-sm shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-machinery-yellow/15 border border-machinery-yellow/40 text-machinery-yellow font-mono text-xs font-bold uppercase tracking-wider mb-4">
                  BUMERANG AĞIR NAKLİYAT HAKKIMIZDA
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-4">
                  Diyarbakır ve Güneydoğu&apos;nun <br className="hidden sm:block" />
                  <span className="text-machinery-yellow">Ağır Sanayi & Lowbed Güvencesi</span>
                </h2>

                <p className="text-steel-light text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  Bumerang Ağır Nakliyat, Ramazan Karaboğa ve Engin Karaboğa yönetiminde, Diyarbakır merkez garajından Türkiye&apos;nin 81 iline ağır nakliye ve lowbed lojistiği sağlayan ihtisaslaşmış bir kuruluştur.
                </p>

                <p className="text-steel-light text-sm sm:text-base leading-relaxed mb-8 font-sans">
                  Altyapı müteahhitleri, maden işletmeleri, taş ocakları, çimento fabrikaları ve enerji santrali projeleri için; standart lojistik firmalarının taşıyamadığı aşırı tonajlı ve gabari dışı yükleri, teknik donanımlı araçlarımız ve yasal izin protokollerimizle sıfır risk prensibiyle ulaştırıyoruz.
                </p>

                {/* Operational Dispatcher Row */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-steel-border/70">
                  <div className="p-4 bg-asphalt-950 border border-steel-border rounded-sm">
                    <span className="font-mono text-[11px] text-machinery-yellow font-bold uppercase block">
                      Operasyon & Saha Koordinasyonu
                    </span>
                    <h4 className="font-display text-lg font-bold text-foreground mt-0.5">Ramazan Karaboğa</h4>
                    <a
                      href="tel:+905327459843"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-steel-light hover:text-machinery-yellow mt-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-machinery-yellow" />
                      +90 532 745 98 43
                    </a>
                  </div>

                  <div className="p-4 bg-asphalt-950 border border-steel-border rounded-sm">
                    <span className="font-mono text-[11px] text-machinery-yellow font-bold uppercase block">
                      Filo & Lojistik Dispeç
                    </span>
                    <h4 className="font-display text-lg font-bold text-foreground mt-0.5">Engin Karaboğa</h4>
                    <a
                      href="tel:+905326562605"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-steel-light hover:text-machinery-yellow mt-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-machinery-yellow" />
                      +90 532 656 26 05
                    </a>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link to="/#filo-teklif">
                    <Button variant="machinery" size="lg" className="w-full sm:w-auto font-display font-extrabold uppercase text-xs sm:text-sm">
                      Hızlı Yük Bildirimi Yap
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <Link to="/#galeri">
                    <Button variant="heroOutline" size="lg" className="w-full sm:w-auto font-display font-bold uppercase text-xs sm:text-sm">
                      Saha Operasyonlarını İncele
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </>
  );
};

export default InfoPage;
