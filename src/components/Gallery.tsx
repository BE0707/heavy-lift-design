import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const images = [
  {
    src: gallery1,
    alt: "Lowbed ile ekskavatör taşıma",
    title: "İş Makinesi Taşıma",
  },
  {
    src: gallery2,
    alt: "Vinç taşıması",
    title: "Ağır Ekipman Nakliyesi",
  },
  {
    src: gallery3,
    alt: "Araç filosu",
    title: "Modern Araç Filomuz",
  },
];

const Gallery = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            GALERİ
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Çalışmalarımızdan Kareler
          </h2>
          <p className="text-muted-foreground text-lg">
            Başarılı teslimatlarımızdan ve modern araç filomuzdan görüntüler.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-display text-xl font-bold text-off-white">
                  {image.title}
                </h3>
                <div className="mt-2 h-1 w-12 bg-primary rounded-full" />
              </div>
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
