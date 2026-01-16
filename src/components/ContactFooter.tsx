import { Phone, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactFooter = () => {
  return (
    <footer id="iletisim" className="bg-charcoal text-off-white">
      {/* Contact Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-semibold text-sm rounded-full mb-4">
                İLETİŞİM
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Bizimle{" "}
                <span className="text-gradient-yellow">İletişime Geçin</span>
              </h2>
              <p className="text-off-white/70 text-lg mb-8 leading-relaxed">
                Ağır yük taşımacılığı ihtiyaçlarınız için bizimle iletişime geçin.
                Uzman ekibimiz size en uygun çözümü sunmak için hazır.
              </p>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 bg-charcoal-light rounded-xl">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Konum</p>
                  <p className="text-off-white/70">Diyarbakır, Türkiye</p>
                </div>
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="grid gap-6">
              {/* Contact 1 */}
              <a
                href="tel:+905327459843"
                className="group flex items-center justify-between p-6 bg-charcoal-light rounded-2xl hover:bg-primary transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-off-white/70 text-sm group-hover:text-primary-foreground/70 transition-colors">
                      Ramazan Karaboğa
                    </p>
                    <p className="font-display text-xl font-bold group-hover:text-primary-foreground transition-colors">
                      +90 532 745 98 43
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 text-primary-foreground transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Contact 2 */}
              <a
                href="tel:+905326562605"
                className="group flex items-center justify-between p-6 bg-charcoal-light rounded-2xl hover:bg-primary transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-off-white/70 text-sm group-hover:text-primary-foreground/70 transition-colors">
                      Engin Karaboğa
                    </p>
                    <p className="font-display text-xl font-bold group-hover:text-primary-foreground transition-colors">
                      +90 532 656 26 05
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 text-primary-foreground transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-off-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">Bumerang</span>
                <span className="text-xs tracking-wider uppercase text-off-white/50">
                  Ağır Nakliyat
                </span>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-off-white/50 text-sm">
              © {new Date().getFullYear()} Bumerang Ağır Nakliyat. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
