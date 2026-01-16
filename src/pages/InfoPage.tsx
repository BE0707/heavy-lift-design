import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Truck, CheckCircle, Building2, Target, Users, Award } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-semibold text-sm rounded-full mb-4">
            BİLGİ
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-off-white mb-4">
            Lowbed Taşımacılık ve Hakkımızda
          </h1>
          <p className="text-off-white/70 text-lg max-w-2xl mx-auto">
            Profesyonel ağır yük taşımacılığı hakkında bilmeniz gereken her şey.
          </p>
        </div>
      </section>

      {/* Lowbed Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
                LOWBED NEDİR?
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Lowbed Taşımacılık Nedir?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Lowbed taşımacılık; iş makineleri, ağır tonajlı ve gabari dışı yüklerin özel lowbed
                dorseler ile güvenli şekilde taşınmasını sağlayan profesyonel bir nakliye hizmetidir.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Bu taşımacılık türü, uzmanlık, doğru ekipman ve deneyim gerektirir. Lowbed dorseler,
                düşük zemin yükseklikleri sayesinde yüksek makinelerin ve ekipmanların güvenli bir
                şekilde taşınmasına olanak tanır.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {[
                  "İş makineleri taşımacılığı",
                  "Gabari dışı yük taşımacılığı",
                  "Ağır tonajlı ekipman nakliyesi",
                  "Özel izinli taşımacılık hizmetleri",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-secondary rounded-2xl p-8 md:p-12">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <Truck className="w-16 h-16 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-background rounded-xl">
                    <p className="font-display text-2xl font-bold text-primary">60+</p>
                    <p className="text-muted-foreground text-sm">Ton Kapasite</p>
                  </div>
                  <div className="p-4 bg-background rounded-xl">
                    <p className="font-display text-2xl font-bold text-primary">24/7</p>
                    <p className="text-muted-foreground text-sm">Hizmet</p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full bg-primary/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimizda" className="py-20 bg-secondary scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
                HAKKIMIZDA
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Bumerang Ağır Nakliyat
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Bumerang Ağır Nakliyat, Diyarbakır merkezli olarak yıllardır ağır nakliyat
                sektöründe hizmet vermektedir. Tecrübe, bilgi birikimi ve güvenilirliği temel
                ilke edinmiş firmamız, lowbed taşımacılık alanında profesyonel çözümler sunmaktadır.
              </p>
            </div>

            {/* Mission & Values */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: Target,
                  title: "Misyonumuz",
                  description: "Ağır yük taşımacılığında en güvenilir ve profesyonel hizmeti sunmak.",
                },
                {
                  icon: Building2,
                  title: "Vizyonumuz",
                  description: "Sektörün lider firması olarak yenilikçi çözümler üretmek.",
                },
                {
                  icon: Award,
                  title: "Değerlerimiz",
                  description: "Güven, kalite, profesyonellik ve müşteri memnuniyeti.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-background p-6 rounded-xl text-center shadow-card"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Team Highlight */}
            <div className="bg-background p-8 md:p-12 rounded-2xl shadow-card">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    Deneyimli Ekibimiz
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Modern araç filomuz ve deneyimli ekibimizle yüklerinizi sorunsuz ve zamanında
                    teslim ediyoruz. Her projede güvenliği ön planda tutarak, müşterilerimize
                    en iyi hizmeti sunmayı amaçlıyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
};

export default InfoPage;
