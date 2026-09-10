import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, ShieldCheck, MapPin, Gauge, Truck } from "lucide-react";
import heroImage from "@/assets/Hero2.png";
import heroMobileImage from "@/assets/Heromobil.png";

const HeroSection = () => {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-asphalt-950 border-b border-steel-border pt-24 md:pt-28 pb-14"
    >
      {/* Background Image - Desktop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Bumerang Ağır Nakliyat - Lowbed ve Gabari Dışı Taşıma"
      />
      {/* Background Image - Mobile */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 mix-blend-luminosity"
        style={{ backgroundImage: `url(${heroMobileImage})` }}
        role="img"
        aria-label="Bumerang Ağır Nakliyat - Lowbed ve Gabari Dışı Taşıma"
      />

      {/* Industrial Gradients & Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/80 to-asphalt-950/60" />
      <div className="absolute inset-0 bg-technical-grid opacity-30 pointer-events-none" />

      {/* Decorative Technical Hazard Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-hazard-stripes-bold opacity-80" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Tactical Metadata Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt-900 border border-steel-border text-machinery-yellow text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-machinery-yellow animate-pulse" />
              DİYARBAKIR &bull; 37°54&apos;N 40°14&apos;E
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-asphalt-900/90 border border-steel-border text-steel-light text-[11px] sm:text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-machinery-yellow" />
              <span>KGM & KTK 33/1 MEVZUAT UYUMLU</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-asphalt-900/90 border border-steel-border text-steel-light text-[11px] sm:text-xs font-mono">
              <Truck className="w-3.5 h-3.5 text-machinery-yellow" />
              <span>4-8 DİNGİL LOWBED FİLOSU</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground tracking-tight leading-[1.05] uppercase mb-4 sm:mb-6">
            Diyarbakır ve Güneydoğu Merkezli <br className="hidden sm:block" />
            <span className="text-machinery-yellow inline-block relative">
              Gabari Dışı Ağır Taşımacılık
              <span className="block h-1 w-full bg-machinery-yellow/60 mt-1" />
            </span>{" "}
            & Lowbed Operasyonları
          </h1>

          {/* Sub-headline */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-steel-light max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal">
            Ekskavatör, dozer, taş kırma eleme tesisleri (konkasör), vinç ve ağır sanayi ekipmanları için{" "}
            <strong className="text-foreground font-semibold">özel izinli</strong>,{" "}
            <strong className="text-foreground font-semibold">eskort koordinasyonlu</strong> şehirlerarası ve şantiyeler arası lowbed transfer çözümleri.
          </p>

          {/* Tactile Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-12 sm:mb-16">
            <Button
              variant="machinery"
              size="lg"
              className="h-13 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-display font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
              onClick={() => scrollToId("filo-teklif")}
            >
              Hızlı Yük Bildirimi & Fiyat Al
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="heroOutline"
              size="lg"
              className="h-13 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-display font-bold tracking-wider uppercase"
              onClick={() => scrollToId("filo")}
            >
              Teknik Filo & Kapasiteler
            </Button>

            <a
              href="tel:+905327459843"
              className="inline-flex items-center justify-center gap-2 h-13 sm:h-14 px-5 text-sm sm:text-base font-mono font-bold text-steel-light bg-asphalt-900 border border-steel-border hover:border-machinery-yellow hover:text-machinery-yellow transition-all rounded-sm"
            >
              <Phone className="w-4 h-4 text-machinery-yellow" />
              <span>0532 745 98 43</span>
            </a>
          </div>

          {/* Factual Technical Capability Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-steel-border/80">
            <div className="p-4 bg-asphalt-900/90 border border-steel-border rounded-sm relative overflow-hidden group hover:border-machinery-yellow/60 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-steel">FİLO DİNGİL YAPISI</span>
                <Truck className="w-4 h-4 text-machinery-yellow" />
              </div>
              <p className="font-display font-extrabold text-xl sm:text-2xl text-foreground">4 - 8 DİNGİL</p>
              <p className="text-xs text-steel-light mt-1">Havuzlu, Düz & Teleskopik Uzatmalı Lowbed Dorseler</p>
            </div>

            <div className="p-4 bg-asphalt-900/90 border border-steel-border rounded-sm relative overflow-hidden group hover:border-machinery-yellow/60 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-steel">AZAMİ KAPASİTE</span>
                <Gauge className="w-4 h-4 text-machinery-yellow" />
              </div>
              <p className="font-display font-extrabold text-xl sm:text-2xl text-machinery-yellow">120 TONA KADAR</p>
              <p className="text-xs text-steel-light mt-1">Ağır Sanayi, Fabrika & Madencilik Ekipman Nakli</p>
            </div>

            <div className="p-4 bg-asphalt-900/90 border border-steel-border rounded-sm relative overflow-hidden group hover:border-machinery-yellow/60 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-steel">MEVZUAT & GÜVENLİK</span>
                <ShieldCheck className="w-4 h-4 text-machinery-yellow" />
              </div>
              <p className="font-display font-extrabold text-xl sm:text-2xl text-foreground">KTK MADDE 33/1</p>
              <p className="text-xs text-steel-light mt-1">KGM Özel İzin Belgesi & Öncü/Artçı Eskort Desteği</p>
            </div>

            <div className="p-4 bg-asphalt-900/90 border border-steel-border rounded-sm relative overflow-hidden group hover:border-machinery-yellow/60 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-steel">SEVKİYAT AĞI</span>
                <MapPin className="w-4 h-4 text-machinery-yellow" />
              </div>
              <p className="font-display font-extrabold text-xl sm:text-2xl text-foreground">81 İL ŞANTİYE</p>
              <p className="text-xs text-steel-light mt-1">Güzergah Köprü, Alt Geçit & Gabari Statik Analizi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
