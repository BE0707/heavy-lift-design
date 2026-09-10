import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ShieldCheck, MapPin } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Ana Sayfa", action: () => scrollToSection("hero") },
    { label: "Filo & Kapasite", action: () => scrollToSection("filo") },
    { label: "Mühendislik & İzinler", action: () => scrollToSection("standartlar") },
    { label: "Proje Galerisi", action: () => scrollToSection("galeri") },
    { label: "Teknik Bilgi", action: () => { setIsMobileMenuOpen(false); navigate("/bilgi"); } },
    { label: "Dispeç & İletişim", action: () => scrollToSection("iletisim") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Industrial Operational Top Bar */}
      <div className="bg-asphalt-950/95 border-b border-steel-border/70 text-xs font-mono text-steel-light py-1.5 px-3 sm:px-6 hidden md:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-machinery-yellow font-bold">
              <span className="w-2 h-2 rounded-full bg-machinery-yellow animate-pulse" />
              DİSPEÇ MERKEZİ: 7/24 AKTİF
            </span>
            <span className="text-steel-dark">|</span>
            <span className="inline-flex items-center gap-1 text-steel-light">
              <MapPin className="w-3.5 h-3.5 text-machinery-yellow" />
              Diyarbakır Merkezli &bull; 81 İl Güzergah & Eskort Yönetimi
            </span>
            <span className="text-steel-dark">|</span>
            <span className="inline-flex items-center gap-1 text-steel-light">
              <ShieldCheck className="w-3.5 h-3.5 text-machinery-yellow" />
              KTK 33/1 KGM Özel İzinli Taşımacılık
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <a
              href="tel:+905327459843"
              className="hover:text-machinery-yellow transition-colors flex items-center gap-1"
            >
              <span className="text-steel">Ramazan K.:</span> +90 532 745 98 43
            </a>
            <span className="text-steel-dark">|</span>
            <a
              href="tel:+905326562605"
              className="hover:text-machinery-yellow transition-colors flex items-center gap-1"
            >
              <span className="text-steel">Engin K.:</span> +90 532 656 26 05
            </a>
          </div>
        </div>
      </div>

      {/* Main Tactical Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-asphalt-900/95 backdrop-blur-md border-b border-steel-border shadow-2xl py-2.5 sm:py-3"
            : "bg-gradient-to-b from-asphalt-950/90 via-asphalt-900/70 to-transparent py-3 sm:py-4"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
          {/* Industrial Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-machinery-yellow text-asphalt-950 font-display font-extrabold flex items-center justify-center text-lg sm:text-xl border border-machinery-amber shadow-sm">
              B
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-wider text-foreground leading-none">
                  BUMERANG
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-machinery-yellow/15 border border-machinery-yellow/40 text-machinery-yellow tracking-widest uppercase">
                  AĞIR NAKLİYAT
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-steel uppercase mt-0.5">
                LOWBED & GABARİ DIŞI TAŞIMA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="px-3 py-1.5 font-display text-sm tracking-wide uppercase text-steel-light hover:text-machinery-yellow hover:bg-asphalt-800/80 transition-all duration-150 rounded-sm"
              >
                {item.label}
              </button>
            ))}

            <div className="ml-2 pl-3 border-l border-steel-border flex items-center gap-2">
              <Button
                variant="machinery"
                size="sm"
                onClick={() => scrollToSection("filo-teklif")}
                className="font-display font-extrabold text-xs tracking-wider px-3.5 py-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 mr-1" />
                HIZLI FİYAT TALEBİ
              </Button>
            </div>
          </div>

          {/* Mobile Dispatch / Menu Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+905327459843"
              className="px-2.5 py-1.5 bg-machinery-yellow text-asphalt-950 font-display font-bold text-xs flex items-center gap-1 rounded-sm shadow-sm"
              aria-label="Dispeç Ara"
            >
              <Phone className="w-3 h-3" />
              <span>DİSPEÇ</span>
            </a>

            <button
              className="p-2 text-foreground bg-asphalt-800 border border-steel-border rounded-sm hover:text-machinery-yellow transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menüyü Aç"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tactical Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-steel-border bg-asphalt-950/98 backdrop-blur-xl shadow-2xl animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <div className="pb-2 mb-2 border-b border-steel-border/50 text-[11px] font-mono text-machinery-yellow flex items-center justify-between">
                <span>DİYARBAKIR HQ DİSPEÇ: 7/24 AKTİF</span>
                <span className="w-2 h-2 rounded-full bg-machinery-yellow animate-pulse" />
              </div>

              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full text-left py-2.5 px-3 font-display text-base tracking-wide uppercase text-steel-light hover:text-machinery-yellow hover:bg-asphalt-850 transition-colors border-l-2 border-transparent hover:border-machinery-yellow"
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-3 pt-3 border-t border-steel-border flex flex-col gap-2">
                <div className="text-[11px] font-mono text-steel uppercase tracking-wider mb-1">
                  Doğrudan Sevkiyat & Dispeç İletişim:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+905327459843"
                    className="p-2.5 bg-asphalt-850 border border-steel-border rounded-sm text-center"
                  >
                    <p className="text-[10px] text-steel-light font-mono">Ramazan Karaboğa</p>
                    <p className="font-mono text-xs font-bold text-machinery-yellow mt-0.5">0532 745 98 43</p>
                  </a>
                  <a
                    href="tel:+905326562605"
                    className="p-2.5 bg-asphalt-850 border border-steel-border rounded-sm text-center"
                  >
                    <p className="text-[10px] text-steel-light font-mono">Engin Karaboğa</p>
                    <p className="font-mono text-xs font-bold text-machinery-yellow mt-0.5">0532 656 26 05</p>
                  </a>
                </div>

                <Button
                  variant="machinery"
                  size="default"
                  onClick={() => scrollToSection("filo-teklif")}
                  className="w-full font-display font-extrabold text-sm tracking-wider uppercase mt-1"
                >
                  Online Yük Bildirimi & Fiyat Al
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
