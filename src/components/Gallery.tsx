import { useState } from "react";
import { Truck, MapPin, ShieldCheck, Maximize2, X } from "lucide-react";
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
import agir2 from "@/assets/Fotoğraflar/agir2.jpeg";
import agir3 from "@/assets/Fotoğraflar/agir3.jpeg";
import agir4 from "@/assets/Fotoğraflar/agir4.jpeg";
import agir5 from "@/assets/Fotoğraflar/agir5.jpeg";
import Agir7 from "@/assets/Fotoğraflar/Agir7.jpeg";

interface ProjectItem {
  src: string;
  category: "is-makinesi" | "gabari-disi" | "santiye-proje";
  title: string;
  route: string;
  tonnage: string;
  trailer: string;
  alt: string;
}

const projects: ProjectItem[] = [
  {
    src: foto3,
    category: "is-makinesi",
    title: "CAT 336 Paletli Ekskavatör Saha Nakliyesi",
    route: "Diyarbakır → Şanlıurfa Otoyol Şantiyesi",
    tonnage: "38 Ton",
    trailer: "4 Dingil Havuzlu Lowbed",
    alt: "CAT 336 Paletli Ekskavatör havuzlu lowbed dorse ile nakliyesi Diyarbakır Şanlıurfa güzergahı",
  },
  {
    src: foto4,
    category: "gabari-disi",
    title: "Gabari Dışı Ağır Sanayi Tesisi Ekipman Transferi",
    route: "Gaziantep OSB → Batman Rafineri Sahası",
    tonnage: "54 Ton",
    trailer: "5 Dingil Hidrolik Dümenlenir Lowbed",
    alt: "Gabari dışı ağır sanayi ekipmanı KTK 33/1 özel izinli taşıma",
  },
  {
    src: foto5,
    category: "santiye-proje",
    title: "Mobil Taş Kırma Eleme Tesisi (Konkasör) Nakli",
    route: "Diyarbakır → Mardin Taş Ocağı Projesi",
    tonnage: "62 Ton",
    trailer: "6 Dingil Ağır Hizmet Platformu",
    alt: "Konkasör kırma eleme tesisi lowbed transferi Mardin şantiye",
  },
  {
    src: foto6,
    category: "is-makinesi",
    title: "Volvo EC380 Ağır Ekskavatör Şantiye Transferi",
    route: "Elazığ Maden Sahası → Diyarbakır Merkez",
    tonnage: "41 Ton",
    trailer: "Havuzlu Düşük Zemin Dorse",
    alt: "Volvo EC380 paletli ekskavatör lowbed taşıma operasyonu",
  },
  {
    src: foto8,
    category: "gabari-disi",
    title: "Endüstriyel Kazan & Yüksek Gabarili Ekipman",
    route: "Mersin Limanı → Erzurum Enerji Santrali",
    tonnage: "68 Ton",
    trailer: "KTK Özel İzinli & Eskortlu Konvoy",
    alt: "Yüksek gabarili endüstriyel kazan ve eskortlu ağır nakliye konvoyu",
  },
  {
    src: foto9,
    category: "santiye-proje",
    title: "Şantiye İçi Ağır Dozer ve Silindir Yer Değişimi",
    route: "Güneydoğu Otoyol Genişletme Projesi",
    tonnage: "35 Ton",
    trailer: "Çok Dingilli Lowbed Çekici",
    alt: "Şantiye içi dozer ve silindir iş makineleri nakliye operasyonu",
  },
  {
    src: foto10,
    category: "is-makinesi",
    title: "Komatsu D85 Zırhlı Dozer Baraj Sahası Sevkiyatı",
    route: "Diyarbakır → Batman Baraj İnşaatı",
    tonnage: "32 Ton",
    trailer: "4 Dingil Sertifikalı Lashing Zincirli",
    alt: "Komatsu D85 dozer baraj inşaatı projesine lowbed ile transfer",
  },
  {
    src: foto11,
    category: "santiye-proje",
    title: "Ağır Ekipman Karayolları Denetim & İntikal Seferi",
    route: "Diyarbakır → Malatya Karayolu Güzergahı",
    tonnage: "48 Ton",
    trailer: "Öncü Eskort Destekli Dorse",
    alt: "Ağır nakliye aracı ve eskort ekibi güzergah kontrolü",
  },
  {
    src: foto12,
    category: "gabari-disi",
    title: "Genişletilebilir Lowbed ile Gabari Dışı Yükleme",
    route: "Diyarbakır Organize Sanayi Bölgesi",
    tonnage: "50 Ton",
    trailer: "Yan Destek Açılır Ağır Dorse",
    alt: "Genişletilmiş lowbed dorse üzerinde gabari dışı yükleme",
  },
  {
    src: axor1,
    category: "is-makinesi",
    title: "Mercedes Axor Çekici ile Ekskavatör İntikali",
    route: "Diyarbakır Garaj → Siirt Altyapı Şantiyesi",
    tonnage: "36 Ton",
    trailer: "Mercedes-Benz Ağır Çekici Filosu",
    alt: "Mercedes Axor lowbed çekici ve paletli iş makinesi yüklemesi",
  },
  {
    src: axor2,
    category: "santiye-proje",
    title: "Ağır Nakliyat Çekici Filosu Eşzamanlı Konvoy",
    route: "Güneydoğu & Doğu Anadolu Şantiye Transferi",
    tonnage: "Filo İntikali",
    trailer: "Çoklu Çekici & Lowbed Grubu",
    alt: "Mercedes Axor ağır nakliyat çekici ve lowbed konvoyu",
  },
  {
    src: agir2,
    category: "gabari-disi",
    title: "Ağır Sanayi Ekipmanı Şehirlerarası Transferi",
    route: "İskenderun → Diyarbakır Sanayi Hattı",
    tonnage: "58 Ton",
    trailer: "5 Dingil Hidrolik Lowbed",
    alt: "Ağır sanayi parçası şehirlerarası lowbed taşımacılığı",
  },
  {
    src: agir3,
    category: "is-makinesi",
    title: "Zorlu Arazi ve Şantiye Şartlarında Lowbed Teslimatı",
    route: "Hakkari / Yüksekova Altyapı Sahası",
    tonnage: "34 Ton",
    trailer: "Havuzlu Arazi Uyumlu Dorse",
    alt: "Zorlu şantiye arazisinde lowbed ile iş makinesi teslimi",
  },
  {
    src: agir4,
    category: "santiye-proje",
    title: "Kış Şartlarında Dağ Geçidi Ağır Nakliye Operasyonu",
    route: "Bingöl → Erzurum Dağ Güzergahı",
    tonnage: "45 Ton",
    trailer: "Zincirli Güvenlik Donanımı & Eskort",
    alt: "Kış mevsiminde dağ yolunda emniyetli lowbed nakliyesi",
  },
  {
    src: agir5,
    category: "gabari-disi",
    title: "Ağır Sanayi Silo ve Reaktör Gövdesi Transferi",
    route: "Adana → Diyarbakır Fabrika Kurulumu",
    tonnage: "52 Ton",
    trailer: "Modüler Ağır Hizmet Platformu",
    alt: "Büyük çaplı endüstriyel gövde parçasının taşınması",
  },
  {
    src: Agir7,
    category: "santiye-proje",
    title: "Bumerang Ağır Nakliyat Şantiye Filo İntikali",
    route: "Diyarbakır Merkez Garaj → 81 İl Güzergahı",
    tonnage: "Kombine Filo",
    trailer: "Özel İzinli Lowbed Dorseler",
    alt: "Bumerang Ağır Nakliyat geniş lowbed ve çekici filosu",
  },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((item) => item.category === activeCategory);

  return (
    <section id="galeri" className="py-16 sm:py-20 md:py-24 bg-asphalt-950 border-b border-steel-border relative">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-technical-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt-900 border border-steel-border text-machinery-yellow font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 bg-machinery-yellow rounded-full" />
            OPERASYON & SAHA LOGLARI
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground uppercase tracking-tight">
            Gerçek Projeler, <br className="hidden sm:block" />
            <span className="text-machinery-yellow">Sertifikalı Sevkiyat Kayıtları</span>
          </h2>
          <p className="font-sans text-steel-light text-sm sm:text-base md:text-lg mt-3 max-w-3xl leading-relaxed">
            Stok veya sahte görseller değil; Diyarbakır, Güneydoğu ve Türkiye genelindeki baraj, maden, otoyol ve sanayi şantiyelerine bizzat teslim ettiğimiz gerçek lowbed operasyonları.
          </p>
        </div>

        {/* Categorization Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-steel-border/60">
          {[
            { id: "all", label: "TÜM SEVKİYATLAR" },
            { id: "is-makinesi", label: "İŞ MAKİNESİ TRANSFERİ" },
            { id: "gabari-disi", label: "GABARİ DIŞI EKİPMANLAR" },
            { id: "santiye-proje", label: "ŞANTİYE & PROJE NAKLİYESİ" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all rounded-sm border ${
                activeCategory === cat.id
                  ? "bg-machinery-yellow text-asphalt-950 border-machinery-yellow shadow-sm"
                  : "bg-asphalt-900 text-steel-light border-steel-border hover:border-steel hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <article
              key={index}
              onClick={() => setLightboxImage(project)}
              className="bg-asphalt-900 border border-steel-border hover:border-machinery-yellow/70 transition-all rounded-sm overflow-hidden group cursor-pointer shadow-lg flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-asphalt-950">
                <img
                  src={project.src}
                  alt={project.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Technical Overlay Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-asphalt-950/90 border border-steel-border font-mono text-[10px] font-bold text-machinery-yellow uppercase tracking-wider">
                    {project.tonnage}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1.5 bg-asphalt-950/90 border border-steel-border text-machinery-yellow rounded-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-steel mb-1">
                    <MapPin className="w-3 h-3 text-machinery-yellow flex-shrink-0" />
                    <span className="truncate">{project.route}</span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-foreground uppercase tracking-tight group-hover:text-machinery-yellow transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-steel-border/70 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-steel-light flex items-center gap-1">
                    <Truck className="w-3 h-3 text-machinery-yellow" />
                    {project.trailer}
                  </span>
                  <span className="text-machinery-yellow font-bold text-[10px] tracking-wider uppercase">
                    SEVK EDİLDİ
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-asphalt-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-asphalt-900 border-2 border-machinery-yellow/60 rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="bg-asphalt-950 px-4 py-3 border-b border-steel-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-machinery-yellow" />
                <span className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                  OPERASYON SAHA DETAYI
                </span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1 text-steel-light hover:text-machinery-yellow hover:bg-asphalt-800 transition-colors rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative max-h-[65vh] bg-asphalt-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-5 sm:p-6 bg-asphalt-900 border-t border-steel-border">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-machinery-yellow font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {lightboxImage.route}
                </span>
                <span className="font-mono text-xs text-steel font-bold px-2 py-0.5 bg-asphalt-950 border border-steel-border">
                  {lightboxImage.tonnage}
                </span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground uppercase">
                {lightboxImage.title}
              </h4>
              <p className="font-mono text-xs text-steel-light mt-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-machinery-yellow" />
                Konfigürasyon: {lightboxImage.trailer} &bull; KGM Özel İzinli Transfer
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
