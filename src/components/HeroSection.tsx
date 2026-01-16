import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Truck } from "lucide-react";
import heroImage from "@/assets/hero-truck.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("iletisim");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-overlay-gradient" />
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 md:mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-off-white text-xs sm:text-sm font-medium">Diyarbakır Merkezli Profesyonel Nakliyat</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white mb-4 sm:mb-5 md:mb-6 leading-tight px-2 animate-fade-in-up animation-delay-100">
            Ağır Yüklerde{" "}
            <span className="text-gradient-yellow block sm:inline">Güvenin Adı</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-off-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 leading-relaxed animate-fade-in-up animation-delay-200">
            Diyarbakır merkezli Bumerang Ağır Nakliyat ile ağır yüklerinizi güvenle taşıyoruz.
            Profesyonel ekip, modern filomuz ve yılların tecrübesiyle hizmetinizdeyiz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 animate-fade-in-up animation-delay-300">
            <Button
              variant="hero"
              size="default"
              className="group w-full sm:w-auto sm:px-8 sm:py-3 text-sm sm:text-base"
              onClick={scrollToContact}
            >
              Hemen İletişime Geç
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="heroOutline"
              size="default"
              className="w-full sm:w-auto sm:px-8 sm:py-3 text-sm sm:text-base"
              onClick={() => {
                const element = document.getElementById("hizmetler");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Hizmetlerimiz
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 md:mt-16 px-2 animate-fade-in-up animation-delay-400">
            {[
              { icon: Shield, label: "Güvenilir Hizmet", desc: "Sigortalı Taşımacılık" },
              { icon: Clock, label: "Zamanında Teslimat", desc: "7/24 Destek" },
              { icon: Truck, label: "Modern Filo", desc: "Profesyonel Ekipman" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-charcoal/30 backdrop-blur-sm rounded-lg border border-off-white/10"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-off-white font-semibold text-sm sm:text-base">{item.label}</p>
                  <p className="text-off-white/60 text-xs sm:text-sm truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-off-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
