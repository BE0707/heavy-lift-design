import { Phone, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactFooter = () => {
  return (
    <footer id="iletisim" className="bg-charcoal text-off-white">
      {/* Contact Section */}
      <div className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/20 text-primary font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
                İLETİŞİM
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
                Bizimle{" "}
                <span className="text-gradient-yellow block sm:inline">İletişime Geçin</span>
              </h2>
              <p className="text-off-white/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                Ağır yük taşımacılığı ihtiyaçlarınız için bizimle iletişime geçin.
                Uzman ekibimiz size en uygun çözümü sunmak için hazır.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-charcoal-light rounded-lg sm:rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Konum</p>
                  <p className="text-off-white/70 text-xs sm:text-sm">Diyarbakır, Türkiye</p>
                </div>
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="grid gap-4 sm:gap-5 md:gap-6">
              {/* Contact 1 */}
              <a
                href="tel:+905327459843"
                className="group flex items-center justify-between p-4 sm:p-5 md:p-6 bg-charcoal-light rounded-xl sm:rounded-2xl hover:bg-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-foreground/20 transition-colors">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-off-white/70 text-xs sm:text-sm group-hover:text-primary-foreground/70 transition-colors">
                      Ramazan Karaboğa
                    </p>
                    <p className="font-display text-base sm:text-lg md:text-xl font-bold group-hover:text-primary-foreground transition-colors break-all">
                      +90 532 745 98 43
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 text-primary-foreground transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-2" />
              </a>

              {/* Contact 2 */}
              <a
                href="tel:+905326562605"
                className="group flex items-center justify-between p-4 sm:p-5 md:p-6 bg-charcoal-light rounded-xl sm:rounded-2xl hover:bg-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-foreground/20 transition-colors">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-off-white/70 text-xs sm:text-sm group-hover:text-primary-foreground/70 transition-colors">
                      Engin Karaboğa
                    </p>
                    <p className="font-display text-base sm:text-lg md:text-xl font-bold group-hover:text-primary-foreground transition-colors break-all">
                      +90 532 656 26 05
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 text-primary-foreground transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-off-white/10 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-display font-bold text-base sm:text-lg leading-tight">Bumerang</span>
                <span className="text-[10px] sm:text-xs tracking-wider uppercase text-off-white/50">
                  Ağır Nakliyat
                </span>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-off-white/50 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Bumerang Ağır Nakliyat. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
