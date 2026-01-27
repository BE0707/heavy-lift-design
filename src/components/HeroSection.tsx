import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Truck } from "lucide-react";
import heroImage from "@/assets/Hero2.png";
import heroMobileImage from "@/assets/Heromobil.png";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("iletisim");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Desktop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Bumerang Ağır Nakliyat - Lowbed kamyonu ile ağır yük taşımacılığı"
      >
        <div className="absolute inset-0 bg-overlay-gradient" />
      </div>
      {/* Background Image - Mobile */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroMobileImage})` }}
        role="img"
        aria-label="Bumerang Ağır Nakliyat - Lowbed kamyonu ile ağır yük taşımacılığı"
      >
        <div className="absolute inset-0 bg-overlay-gradient-mobile" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center hero-text-shadow">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-3 sm:mb-4 md:mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-off-white text-[11px] sm:text-xs md:text-sm font-medium leading-tight">Diyarbakır Merkezli Profesyonel Nakliyat</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-off-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-[1.1] sm:leading-tight px-1 animate-fade-in-up animation-delay-100">
            Ağır Yüklerde{" "}
            <span className="text-gradient-yellow block sm:inline mt-1 sm:mt-0">Güvenin Adı</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-off-white/85 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 lg:mb-10 px-2 leading-relaxed animate-fade-in-up animation-delay-200">
            Diyarbakır merkezli Bumerang Ağır Nakliyat ile ağır yüklerinizi güvenle taşıyoruz.
            Profesyonel ekip, modern filomuz ve yılların tecrübesiyle hizmetinizdeyiz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center items-stretch sm:items-center px-2 animate-fade-in-up animation-delay-300">
            <Button
              variant="hero"
              size="default"
              className="group w-full sm:w-auto text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5"
              onClick={scrollToContact}
            >
              Hemen İletişime Geç
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="heroOutline"
              size="default"
              className="w-full sm:w-auto text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5"
              onClick={() => {
                const element = document.getElementById("hizmetler");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Hizmetlerimiz
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-1 animate-fade-in-up animation-delay-400">
            {[
              { icon: Shield, label: "Güvenilir Hizmet", desc: "Sigortalı Taşımacılık" },
              { icon: Clock, label: "Zamanında Teslimat", desc: "7/24 Destek" },
              { icon: Truck, label: "Modern Filo", desc: "Profesyonel Ekipman" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-4 bg-charcoal/40 backdrop-blur-sm rounded-lg border border-off-white/10"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-off-white font-semibold text-xs sm:text-sm md:text-base leading-tight">{item.label}</p>
                  <p className="text-off-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-off-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
