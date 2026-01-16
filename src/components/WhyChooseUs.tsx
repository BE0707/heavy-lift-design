import { Award, Users, Truck, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Yılların Tecrübesi",
    description: "Ağır nakliyat sektöründe uzun yıllara dayanan deneyim ve uzmanlık.",
  },
  {
    icon: Users,
    title: "Güvenilir ve Profesyonel Ekip",
    description: "Alanında uzman, eğitimli ve güvenilir personel kadromuz.",
  },
  {
    icon: Truck,
    title: "Modern Araç Filosu",
    description: "Son teknoloji lowbed ve ağır yük taşıma araçlarımız.",
  },
  {
    icon: Clock,
    title: "Zamanında ve Güvenli Teslimat",
    description: "Yüklerinizi söz verilen zamanda ve güvenle teslim ediyoruz.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/10 text-primary font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
              NEDEN BİZ?
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 leading-tight">
              Güven ve Kalite ile{" "}
              <span className="text-gradient-yellow block sm:inline">Fark Yaratıyoruz</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8 leading-relaxed">
              Bumerang Ağır Nakliyat olarak, müşterilerimize en yüksek kalitede hizmet sunmayı
              ilke ediniyoruz. Tecrübemiz, profesyonel ekibimiz ve modern filomuz ile
              ağır yüklerinizi güvenle taşıyoruz.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">15+</p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">Yıllık Tecrübe</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">Başarılı Teslimat</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">81</p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">İl Kapsama</p>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-4 sm:p-5 md:p-6 bg-secondary rounded-lg sm:rounded-xl hover:bg-primary transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary-foreground/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 text-sm sm:text-base group-hover:text-primary-foreground transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed group-hover:text-primary-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
