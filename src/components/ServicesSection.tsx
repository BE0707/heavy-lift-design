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
    <section id="hizmetler" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            HİZMETLERİMİZ
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Profesyonel Taşımacılık Çözümleri
          </h2>
          <p className="text-muted-foreground text-lg">
            Yılların tecrübesi ve modern ekipmanlarımızla ağır yüklerinizi güvenle taşıyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-background p-8 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 h-1 w-12 bg-primary/20 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
