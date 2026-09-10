import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Ana Sayfa", action: () => scrollToSection("hero") },
    { label: "Lowbed Taşımacılık Nedir?", action: () => navigate("/bilgi") },
    { label: "Hakkımızda", action: () => navigate("/bilgi#hakkimizda") },
    { label: "İletişim", action: () => scrollToSection("iletisim") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-4 md:py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="flex flex-col">
            <span className={`font-display font-bold text-sm sm:text-base md:text-lg leading-tight transition-colors ${isScrolled ? "text-foreground" : "text-off-white"}`}>
              Bumerang
            </span>
            <span className={`text-[10px] sm:text-xs tracking-wider uppercase transition-colors ${isScrolled ? "text-muted-foreground" : "text-off-white/70"}`}>
              Ağır Nakliyat
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`font-medium text-sm xl:text-base transition-colors duration-200 hover:text-primary ${
                isScrolled ? "text-foreground" : "text-off-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <Button
            variant="hero"
            size="default"
            onClick={() => scrollToSection("iletisim")}
            className="flex items-center gap-2 text-xs xl:text-sm px-3 xl:px-4"
          >
            <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span className="hidden xl:inline">Bize Ulaşın</span>
            <span className="xl:hidden">Ulaş</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-1.5 sm:p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-5 h-5 sm:w-6 sm:h-6 ${isScrolled ? "text-foreground" : "text-off-white"}`} />
          ) : (
            <Menu className={`w-5 h-5 sm:w-6 sm:h-6 ${isScrolled ? "text-foreground" : "text-off-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-elevated animate-fade-in">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-foreground font-medium py-2 text-left hover:text-primary transition-colors text-sm sm:text-base"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="hero"
              size="default"
              onClick={() => scrollToSection("iletisim")}
              className="mt-1 sm:mt-2 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4" />
              Bize Ulaşın
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
