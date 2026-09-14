import { PROJECTS } from "@/data/projects";
import type { PhotoSlug } from "@/lib/photos";

/**
 * Filo: firmanın tek dorse tipi, 3 dingilli hidrolik rampalı lowbed.
 *
 * Yalnızca kesin bilgiler yazılır: dingil sayısı, rampa ve yükleme şekli arşiv
 * fotoğraflarında görülür. Faydalı yük, platform yüksekliği ve platform boyu
 * ruhsat / tip onay belgesiyle doğrulanmadan sitede yayınlanmaz.
 */
export const LOWBED = {
  code: "LB-3",
  title: "3 dingilli lowbed, hidrolik rampalı",
  summary:
    "Paletli ve lastikli iş makineleri hidrolik rampalardan kendi yürüyüşüyle dorseye çıkar; yükleme için vinç gerekmez. Yük, dorsenin bağlama noktalarına zincir ve gerdirmelerle sabitlenir.",
  facts: [
    { label: "Dorse", value: "Lowbed yarı römork" },
    { label: "Dingil", value: "3" },
    { label: "Rampa", value: "Hidrolik, çift" },
    { label: "Yükleme", value: "Makine rampadan kendi yürüyüşüyle çıkar" },
  ],
  photo: {
    slug: "man-tgx-3-dingil-lowbed" as PhotoSlug,
    alt: "Su kıyısındaki açık alanda park halinde beyaz MAN TGX çekici ve rampaları kaldırılmış, boş, kırmızı 3 dingilli lowbed dorse",
    caption: "Filodan: MAN TGX çekici ve 3 dingilli hidrolik rampalı lowbed",
  },
} as const;

export interface LoadExample {
  slug: PhotoSlug;
  load: string;
  /** Makinenin üretici ağırlık sınıfı (t); yalnızca model biliniyorsa */
  weightClass?: number;
}

/**
 * Bu dorseyle taşınan yükler; her satır proje arşivindeki bir fotoğrafa dayanır.
 * Sınıfı bilinenler önce (ağırdan hafife), ardından diğerleri arşiv sırasıyla.
 */
export const LOAD_EXAMPLES: readonly LoadExample[] = [
  { slug: "sany-sy385h-ekskavator", load: "Sany SY385H paletli ekskavatör", weightClass: 38 },
  { slug: "sumitomo-sh300-dag-konvoyu", load: "Sumitomo SH300 paletli ekskavatör", weightClass: 30 },
  { slug: "hidromek-hmk220-actros", load: "Hidromek HMK 220 paletli ekskavatör", weightClass: 22 },
  { slug: "hyundai-hx210-ekskavator", load: "Hyundai HX210 paletli ekskavatör", weightClass: 21 },
  { slug: "hidromek-kazici-yukleyici", load: "2 × Hidromek HMK 102 kazıcı yükleyici" },
  { slug: "traktor-balya-makinesi", load: "Traktör ve büyük balya makinesi" },
  { slug: "paletli-dozer-dag-yolu", load: "Caterpillar paletli dozer" },
  { slug: "kleemann-mc110r-mobil-kirici", load: "Kleemann Mobicat MC 110 R mobil çeneli kırıcı" },
  { slug: "fore-kazik-makinesi", load: "Paletli fore kazık makinesi" },
  { slug: "kamyon-ustu-sondaj-makinesi", load: "Kamyon üstü sondaj makinesi" },
  { slug: "boru-hatti-santiyesi", load: "Büyük çaplı çelik boru" },
  { slug: "ekskavator-silindir-kombine", load: "Paletli ekskavatör ve tek bandajlı silindir" },
];

const CLASSES = LOAD_EXAMPLES.flatMap((l) => (l.weightClass ? [l.weightClass] : []));

/** Arşivdeki paletli ekskavatörlerin sınıf aralığı, örn. "21–38" */
export const EXCAVATOR_CLASS_RANGE = `${Math.min(...CLASSES)}–${Math.max(...CLASSES)}`;

/** Örnek yükün proje arşivi kategorisi (rehberde gruplamak için) */
export const exampleCategory = (slug: PhotoSlug) => PROJECTS.find((p) => p.slug === slug)?.category;
