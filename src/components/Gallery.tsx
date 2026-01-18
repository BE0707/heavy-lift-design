import foto3 from "@/assets/Fotoğraflar/3.jpeg";
import foto4 from "@/assets/Fotoğraflar/4.jpeg";
import foto5 from "@/assets/Fotoğraflar/5.jpeg";
import foto6 from "@/assets/Fotoğraflar/6.jpeg";
import foto8 from "@/assets/Fotoğraflar/8.jpeg";
import foto9 from "@/assets/Fotoğraflar/9.jpeg";
import foto10 from "@/assets/Fotoğraflar/10.jpeg";
import foto11 from "@/assets/Fotoğraflar/11.jpeg";
import foto12 from "@/assets/Fotoğraflar/12.jpeg";
import axor1 from "@/assets/Fotoğraflar/axor1.jpeg";
import axor2 from "@/assets/Fotoğraflar/axor2.jpeg";

const images = [
  {
    src: foto3,
    alt: "Lowbed ile iş makinesi taşımacılığı - Bumerang Ağır Nakliyat Diyarbakır",
    title: "Profesyonel Lowbed Taşımacılık",
    description: "İş makineleri güvenli taşıma",
  },
  {
    src: foto4,
    alt: "Ağır yük lowbed taşımacılığı - Bumerang Ağır Nakliyat profesyonel hizmet",
    title: "Ağır Yük Nakliyesi",
    description: "Özel lowbed dorse ile taşıma",
  },
  {
    src: foto5,
    alt: "İş makinesi şehirlerarası lowbed taşımacılığı - Diyarbakır nakliyat",
    title: "Şehirlerarası Nakliyat",
    description: "Güvenli ve zamanında teslimat",
  },
  {
    src: foto6,
    alt: "Ekskavatör lowbed taşıma - Bumerang Ağır Nakliyat modern filo",
    title: "Ekskavatör Taşımacılığı",
    description: "Profesyonel ekipman ile taşıma",
  },
  {
    src: foto8,
    alt: "Ağır tonajlı yük lowbed taşımacılığı - Ağır yük nakliyat",
    title: "Ağır Tonajlı Yük Taşıma",
    description: "Özel izinli taşımacılık",
  },
  {
    src: foto9,
    alt: "Lowbed kamyonu ile iş makinesi taşımacılığı - Bumerang Ağır Nakliyat",
    title: "Lowbed Kamyonu ile Taşıma",
    description: "Modern araç filosu",
  },
  {
    src: foto10,
    alt: "İş makinesi lowbed taşımacılığı - Diyarbakır ağır nakliyat",
    title: "İş Makinesi Taşımacılığı",
    description: "Güvenilir ve profesyonel hizmet",
  },
  {
    src: foto11,
    alt: "Ağır ekipman lowbed taşımacılığı - Bumerang Ağır Nakliyat",
    title: "Ağır Ekipman Taşıma",
    description: "Uzman ekip ile taşımacılık",
  },
  {
    src: foto12,
    alt: "Lowbed dorse ile yük taşımacılığı - Profesyonel nakliyat hizmeti",
    title: "Lowbed Dorseli Taşıma",
    description: "Özel dorse ile güvenli taşıma",
  },
  {
    src: axor1,
    alt: "Mercedes Axor lowbed kamyonu - Bumerang Ağır Nakliyat modern filo",
    title: "Mercedes Axor Lowbed",
    description: "Modern ve güvenilir araç",
  },
  {
    src: axor2,
    alt: "Axor lowbed kamyonu ile taşımacılık - Profesyonel nakliyat",
    title: "Axor Lowbed Filosu",
    description: "Son teknoloji araçlar",
  },
];

const Gallery = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary" id="galeri">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/10 text-primary font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
            GALERİ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
            Nakliyat İşlerimizden Kareler
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-2">
            Gerçek projelerimizden ve başarılı teslimatlarımızdan fotoğraflar.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {images.map((image, index) => (
            <article
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <img
                src={image.src}
                alt={image.alt}
                title={image.title}
                loading={index < 3 ? "eager" : "lazy"}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                itemProp="contentUrl"
              />
              <meta itemProp="name" content={image.title} />
              <meta itemProp="description" content={image.alt} />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-display text-lg sm:text-xl font-bold text-off-white" itemProp="name">
                  {image.title}
                </h3>
                <p className="text-off-white/80 text-xs sm:text-sm mt-1">{image.description}</p>
                <div className="mt-2 sm:mt-3 h-1 w-10 sm:w-12 bg-primary rounded-full" />
              </div>
              {/* Corner Accent */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
