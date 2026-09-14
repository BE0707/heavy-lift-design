import type { PhotoSlug } from "@/lib/photos";

/**
 * Saha fotoğrafları. Başlık ve detaylar fotoğrafta okunabilen bilgilerden
 * (makine markası/modeli, dorse tipi, ortam) yazılmıştır. Güzergah bilgisi
 * yalnızca bilindiğinde `route` alanına eklenmelidir; tahmini güzergah yazılmaz.
 */

export type ProjectCategory = "is-makinesi" | "gabari-disi" | "santiye";

export const PROJECT_CATEGORIES: readonly { id: ProjectCategory; label: string }[] = [
  { id: "is-makinesi", label: "İş Makinesi Taşımacılığı" },
  { id: "gabari-disi", label: "Gabari Dışı Ekipmanlar" },
  { id: "santiye", label: "Şantiye & Proje Nakliyesi" },
];

export interface Project {
  slug: PhotoSlug;
  category: ProjectCategory;
  title: string;
  detail: string;
  /** Örn. "Diyarbakır → Şanlıurfa" — yalnızca doğrulanmış bilgi */
  route?: string;
  alt: string;
  /** 4:3 küçük resim kırpımında odak noktası (object-position) */
  focus?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "sany-sy385h-ekskavator",
    category: "is-makinesi",
    title: "Sany SY385H Paletli Ekskavatör Transferi",
    detail: "38 t sınıfı · 3 dingil hidrolik rampalı lowbed · MAN TGX çekici",
    alt: "MAN TGX çekici ve kırmızı 3 dingilli lowbed üzerinde sarı Sany SY385H paletli ekskavatör, hasat edilmiş tarlalar arasındaki stabilize yolda",
  },
  {
    slug: "sumitomo-sh300-dag-konvoyu",
    category: "is-makinesi",
    title: "Sumitomo SH300 · İki Araçlı Vadi Geçişi",
    detail: "30 t sınıfı ekskavatör + arkada Doosan ekskavatör · 2 lowbed konvoy · dar dağ yolu",
    alt: "Kayalık dağ vadisindeki asfalt yolda iki lowbed: önde MAN çekici üzerinde sarı Sumitomo SH300 ekskavatör, arkada turuncu Doosan ekskavatör taşıyan ikinci çekici",
    focus: "50% 68%",
  },
  {
    slug: "hyundai-hx210-ekskavator",
    category: "is-makinesi",
    title: "Hyundai HX210 Paletli Ekskavatör",
    detail: "21 t sınıfı · 3 dingil lowbed · köy yolundan çıkış",
    alt: "Ağaçlı dar köy yolunda MAN çekicinin kırmızı lowbed dorsesinde siyah-sarı Hyundai HX210 paletli ekskavatör",
    focus: "50% 58%",
  },
  {
    slug: "hidromek-hmk220-actros",
    category: "is-makinesi",
    title: "Hidromek HMK 220 Paletli Ekskavatör",
    detail: "22 t sınıfı · Mercedes-Benz Actros çekici · 3 dingil lowbed",
    alt: "Enerji hattı direklerinin yanındaki asfalt yolda Mercedes-Benz Actros çekici ve lowbed dorse üzerinde beyaz Hidromek HMK 220 ekskavatör",
    focus: "50% 45%",
  },
  {
    slug: "hidromek-kazici-yukleyici",
    category: "is-makinesi",
    title: "Hidromek Kazıcı Yükleyici Sevkiyatı",
    detail: "2 adet HMK 102 tek dorsede · arkada ikinci çekiciyle Hidromek ekskavatör · yağışlı hava",
    alt: "Yağmurlu havada otoparkta iki çekici: öndeki MAN'ın dorsesinde iki beyaz-siyah Hidromek kazıcı yükleyici, arkadaki Mercedes-Benz Actros'ta Hidromek ekskavatör",
    focus: "50% 55%",
  },
  {
    slug: "traktor-balya-makinesi",
    category: "is-makinesi",
    title: "Tarım Makinesi: Traktör + Büyük Balya Makinesi",
    detail: "New Holland traktör ve Massey Ferguson balya makinesi aynı dorsede · 3 dingil lowbed",
    alt: "Taşlık arazide MAN çekicinin 3 dingilli lowbed dorsesinde mavi New Holland traktör ile kırmızı Massey Ferguson büyük balya makinesi; arkada tahıl siloları",
  },
  {
    slug: "paletli-dozer-dag-yolu",
    category: "is-makinesi",
    title: "Caterpillar Paletli Dozer · Virajlı Dağ Yolu",
    detail: "Yüksek tahrikli paletli dozer · rampaları kaldırılmış 3 dingil lowbed · yamaç kenarı mola",
    alt: "Alacakaranlıkta kayalık yamacın dibindeki virajlı dağ yolunda, rampaları kaldırılmış lowbed dorse üzerinde sarı Caterpillar paletli dozer",
  },
  {
    slug: "kleemann-mc110r-mobil-kirici",
    category: "gabari-disi",
    title: "Kleemann Mobicat MC 110 R Mobil Çeneli Kırıcı",
    detail: "Paletli mobil kırıcı · hidrolik rampalardan kendi yürüyüşüyle yükleme anı",
    alt: "Yol kenarında hidrolik rampaları indirilmiş kırmızı lowbed dorseye kendi paletleriyle çıkan gri Kleemann Mobicat MC 110 R mobil çeneli kırıcı; operatör uzaktan kumandayla yönlendiriyor",
  },
  {
    slug: "fore-kazik-makinesi",
    category: "gabari-disi",
    title: "Fore Kazık (Rotary) Makinesi Nakliyesi",
    detail: "Kelly barlı paletli sondaj ünitesi · direk dorse boyunu aşan çıkıntıyla · 3 dingil lowbed",
    alt: "Taşlık şantiye alanında MAN TGX çekicinin kırmızı lowbed dorsesinde, kelly bar direği yatırılmış beyaz-mavi paletli fore kazık makinesi",
  },
  {
    slug: "kamyon-ustu-sondaj-makinesi",
    category: "gabari-disi",
    title: "Kamyon Üstü Sondaj Makinesi Transferi",
    detail: "Ford Cargo 2520 şasili, kafes kuleli sondaj ünitesi · kule çıkıntılı yükleme · 3 dingil lowbed",
    alt: "Anız tarlasında kırmızı lowbed dorseye yüklenmiş, kafes kulesi yatırılmış beyaz Ford Cargo 2520 kamyon üstü sondaj makinesi ve bağlama yapan ekip",
  },
  {
    slug: "mobil-kirici-eleme-tesisi",
    category: "gabari-disi",
    title: "Paletli Mobil Kırıcı-Eleme Tesisi",
    detail: "Mercedes-Benz Axor çekici · 3 dingil lowbed · güzergah üzerinde akaryakıt molası",
    alt: "Akaryakıt istasyonunda Mercedes-Benz Axor çekicinin lowbed dorsesinde paletli mobil kırıcı-eleme tesisi",
  },
  {
    slug: "sondaj-destek-kamyonu",
    category: "santiye",
    title: "Sondaj Ekibi Mobilizasyonu: Destek Kamyonu",
    detail: "Ford Cargo 2520 kasalı kamyon · hidrolik rampadan yükleme · şehir içi toplama noktası",
    alt: "Apartman blokları önündeki anız alanda, hidrolik rampadan MAN çekicinin lowbed dorsesine yüklenmiş turuncu kabinli Ford Cargo 2520 kasalı kamyon",
  },
  {
    slug: "uc-lowbed-konvoy",
    category: "santiye",
    title: "Üç Lowbed'lik Saha Ekipmanı Konvoyu",
    detail: "Servis kamyonu ve saha ekipmanları · eş zamanlı sevkiyat · bölünmüş yol",
    alt: "Yarma şevinin yanındaki bölünmüş yolda sıralanmış üç lowbed: önde beyaz servis kamyonu, arkada kırmızı-beyaz saha ekipmanları taşıyan çekiciler",
    focus: "35% 50%",
  },
  {
    slug: "boru-hatti-santiyesi",
    category: "santiye",
    title: "Boru Hattı Şantiyesinde Vinç Destekli Yükleme",
    detail: "Büyük çaplı çelik boru hattı · mobil vinçle dorseye yükleme-boşaltma · kayalık arazi",
    alt: "Kayalık arazide açılmış boru hattı kanalı yanında, Mercedes-Benz Axor çekicinin lowbed dorsesi başında çalışan sarı mobil vinç ve büyük çaplı siyah çelik borular",
  },
  {
    slug: "ekskavator-silindir-kombine",
    category: "santiye",
    title: "Yol Yapım Ekipmanı: Ekskavatör + Silindir Tek Seferde",
    detail: "Paletli ekskavatör ve tek bandajlı silindir aynı dorsede · Volvo FH çekici",
    alt: "Yeni asfaltlanmış yolda Volvo FH çekicinin kırmızı lowbed dorsesinde sarı paletli ekskavatör ve sarı tek bandajlı silindir",
    focus: "50% 30%",
  },
];

/** Arşiv kayıt kodu (BG = Bumerang): arşivdeki sıra numarasıdır, ayrı bir iş numarası değildir */
export const recordCode = (slug: PhotoSlug): string => {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return `BG-${String(index + 1).padStart(2, "0")}`;
};
