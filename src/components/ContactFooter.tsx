import { Phone, MapPin, MessageSquare, ShieldCheck, Clock, Navigation, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

const dispatchers = [
  {
    name: "Ramazan Karaboğa",
    role: "Operasyon & Saha Koordinasyonu",
    phone: "+90 532 745 98 43",
    telLink: "tel:+905327459843",
    whatsappLink: `https://wa.me/905327459843?text=${encodeURIComponent(
      "Merhaba Ramazan Bey, ağır nakliyat / lowbed taşıma fiyatı almak istiyorum."
    )}`,
    badge: "SAHA SEVKİYAT",
  },
  {
    name: "Engin Karaboğa",
    role: "Filo & Lojistik Dispeç",
    phone: "+90 532 656 26 05",
    telLink: "tel:+905326562605",
    whatsappLink: `https://wa.me/905326562605?text=${encodeURIComponent(
      "Merhaba Engin Bey, ağır nakliyat / lowbed taşıma fiyatı almak istiyorum."
    )}`,
    badge: "FİLO PLANLAMA",
  },
];

const coverageProvinces = [
  "Diyarbakır (Merkez)",
  "Batman",
  "Mardin",
  "Şanlıurfa",
  "Elazığ",
  "Bingöl",
  "Gaziantep",
  "Malatya",
  "Siirt",
  "Van",
  "Erzurum",
  "Mersin Limanı",
  "İskenderun Limanı",
  "Tüm 81 İl Şantiyeleri",
];

const ContactFooter = () => {
  return (
    <footer id="iletisim" className="bg-asphalt-950 text-foreground border-t-2 border-machinery-yellow/60 relative">
      {/* Top Hazard Accent Bar */}
      <div className="h-2 bg-hazard-stripes-bold" />

      <div className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt-900 border border-steel-border text-machinery-yellow font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              OPERASYON & DİSPEÇ MERKEZİ
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
              Doğrudan Sevkiyat Masası ile <br className="hidden sm:block" />
              <span className="text-machinery-yellow">7/24 İletişime Geçin</span>
            </h2>
            <p className="font-sans text-steel-light text-sm sm:text-base md:text-lg mt-3 leading-relaxed">
              Aracı veya santral beklemeden, şantiye sahanızdaki nakliye talebini bizzat operasyon sorumlularımıza ileterek rotanıza en uygun lowbed aracını dakikalar içinde rezerve edin.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Dispatcher Direct Contact Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-steel font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-machinery-yellow" />
                Yetkili Dispeç Sorumluları:
              </h3>

              {dispatchers.map((disp) => (
                <div
                  key={disp.phone}
                  className="bg-asphalt-900 border border-steel-border hover:border-machinery-yellow/60 rounded-sm p-5 sm:p-6 transition-all shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-machinery-yellow/15 border border-machinery-yellow/40 text-machinery-yellow font-mono text-[10px] font-bold tracking-widest uppercase">
                          {disp.badge}
                        </span>
                        <span className="text-xs font-mono text-steel-light">7/24 Aktif Hat</span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground uppercase tracking-tight">
                        {disp.name}
                      </h4>
                      <p className="text-xs sm:text-sm font-mono text-machinery-amber mt-0.5">
                        {disp.role}
                      </p>
                      <p className="font-mono text-lg sm:text-xl font-extrabold text-foreground mt-2 tracking-wide">
                        {disp.phone}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row sm:flex-col gap-2 min-w-[170px]">
                      <a
                        href={disp.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-machinery-yellow text-asphalt-950 font-display font-extrabold text-xs tracking-wider uppercase rounded-sm hover:bg-machinery-amber transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        WhatsApp Fiyat Al
                      </a>

                      <a
                        href={disp.telLink}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-asphalt-800 border border-steel-border text-foreground hover:text-machinery-yellow hover:border-machinery-yellow font-display font-bold text-xs tracking-wider uppercase rounded-sm transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-machinery-yellow" />
                        Hemen Ara
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Working Hours & Protocol Info */}
              <div className="p-4 bg-asphalt-900/60 border border-steel-border/70 rounded-sm grid sm:grid-cols-2 gap-3 text-xs font-mono text-steel-light">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-machinery-yellow flex-shrink-0" />
                  <span>Haftanın 7 Günü / 24 Saat Çağrı Kabulü</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-machinery-yellow flex-shrink-0" />
                  <span>KGM İzin Belgeli & Sigortalı Sevkiyat</span>
                </div>
              </div>
            </div>

            {/* Base & Coverage Map Column (5 cols) */}
            <div className="lg:col-span-5 bg-asphalt-900 border border-steel-border rounded-sm p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-steel-border/70">
                <MapPin className="w-5 h-5 text-machinery-yellow" />
                <div>
                  <span className="font-mono text-[11px] text-steel uppercase block">MERKEZ GARAJ & ÜS</span>
                  <h4 className="font-display text-lg font-bold text-foreground uppercase">
                    Diyarbakır, Türkiye
                  </h4>
                </div>
              </div>

              <p className="text-steel-light text-xs sm:text-sm leading-relaxed mb-5">
                Diyarbakır merkezli garajımızdan Güneydoğu, Doğu Anadolu, Akdeniz limanları ve Türkiye genelindeki tüm maden, baraj ve altyapı şantiyelerine transit lowbed sevkiyatı gerçekleştiriyoruz.
              </p>

              <div className="mb-4">
                <span className="font-mono text-[11px] text-steel uppercase font-bold tracking-wider block mb-2">
                  ÖNCELİKLİ GÜZERGAH & ŞANTİYE BÖLGELERİ:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {coverageProvinces.map((prov, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-asphalt-950 border border-steel-border/80 text-steel-light rounded-sm"
                    >
                      {prov}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-steel-border/70">
                <a
                  href="#filo-teklif"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-asphalt-800 border border-steel-border text-foreground hover:border-machinery-yellow hover:text-machinery-yellow font-display font-bold text-xs tracking-wider uppercase rounded-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-machinery-yellow" />
                  Online Yük Bildirimi Yap
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Industrial Bar */}
          <div className="pt-8 border-t border-steel-border/70 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-steel">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-machinery-yellow text-asphalt-950 font-display font-extrabold flex items-center justify-center text-sm border border-machinery-amber">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wider text-foreground">
                  BUMERANG AĞIR NAKLİYAT
                </span>
                <span className="text-[10px] tracking-widest uppercase text-steel">
                  DİYARBAKIR &bull; LOWBED & GABARİ DIŞI TAŞIMACILIK
                </span>
              </div>
            </div>

            <p className="text-center md:text-right text-[11px]">
              © {new Date().getFullYear()} Bumerang Ağır Nakliyat. KTK 33/1 KGM Özel İzinli Taşımacılık. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
