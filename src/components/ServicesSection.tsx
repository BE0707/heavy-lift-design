import { Truck, Package, MapPin } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Lowbed Taşımacılık",
    description:
      "İş makineleri, ağır tonajlı ve gabari dışı yüklerinizi özel lowbed dorselerimiz ile güvenle taşıyoruz.",
  },
  {
    icon: Package,
    title: "Ağır Yük Nakliyesi",
    description:
      "Her türlü ağır yükünüz için profesyonel ekipman ve deneyimli ekibimizle kusursuz hizmet sunuyoruz.",
  },
  {
    icon: MapPin,
    title: "Şehirlerarası Profesyonel Taşıma",
    description:
      "Türkiye genelinde güvenli ve hızlı şehirlerarası ağır yük taşımacılığı hizmeti veriyoruz.",
  },
];

const ServicesSection = () => {
  return (
    <section id="hizmetler" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/10 text-primary font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
            HİZMETLERİMİZ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
            Profesyonel Taşımacılık Çözümleri
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-2">
            Yılların tecrübesi ve modern ekipmanlarımızla ağır yüklerinizi güvenle taşıyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-background p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-4 sm:mt-5 md:mt-6 h-1 w-10 sm:w-12 bg-primary/20 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
