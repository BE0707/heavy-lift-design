import type { PhotoSlug } from "@/lib/photos";

/**
 * Teknik filo & taşıma kapasiteleri.
 *
 * ÖNEMLİ: Değerler dorse tiplerinin piyasadaki TİPİK aralıklarıdır ("≈" ile).
 * Yayından önce firmanın gerçek dorse ruhsatı / tip onay belgesiyle
 * karşılaştırılıp güncellenmelidir. Tek kaynak burasıdır; hem sekmeli spec
 * kartları hem de karşılaştırma tablosu bu listeden üretilir.
 */

export type FleetId = "standart" | "havuzlu" | "teleskopik" | "eskort";

export interface SpecRow {
  label: string;
  value: string;
}

export interface FleetItem {
  id: FleetId;
  /** Spec sayfası tip kodu */
  code: string;
  tab: string;
  tabMeta: string;
  title: string;
  summary: string;
  specs: SpecRow[];
  tagsLabel: string;
  tags: string[];
  /** Karşılaştırma tablosu için kısa değerler */
  table: { axles: string; deck: string; length: string; payload: string };
  photo?: { slug: PhotoSlug; alt: string; caption: string };
}

export const FLEET: readonly FleetItem[] = [
  {
    id: "standart",
    code: "LB-3/4",
    tab: "Standart Lowbed",
    tabMeta: "3–4 dingil",
    title: "Standart Lowbed · Hidrolik Rampalı",
    summary:
      "Paletli ve lastikli iş makinelerinin şehirlerarası transferinde temel dorse. Makine hidrolik rampadan kendi yürüyüşüyle yüklenir; yükleme için vinç gerekmez.",
    specs: [
      { label: "Dingil sayısı", value: "3 veya 4" },
      { label: "Platform yüksekliği", value: "≈ 900–1.000 mm" },
      { label: "Platform uzunluğu", value: "≈ 9,5–10,5 m" },
      { label: "Platform genişliği", value: "2,55 m" },
      { label: "Teknik faydalı yük", value: "≈ 40 t (3 dingil) · ≈ 50 t (4 dingil)" },
      { label: "Yükleme", value: "Hidrolik rampa, kendi yürüyüşüyle" },
    ],
    tagsLabel: "Tipik yükler",
    tags: ["20–45 t paletli ekskavatör", "Dozer & greyder", "Silindir", "Kazıcı yükleyici", "Kamyon üstü sondaj", "Tarım makineleri"],
    table: { axles: "3–4", deck: "≈ 0,9–1,0 m", length: "≈ 9,5–10,5 m", payload: "≈ 40–50 t" },
    photo: {
      slug: "man-tgx-3-dingil-lowbed",
      alt: "Su kıyısındaki açık alanda park halinde beyaz MAN TGX çekici ve rampaları kaldırılmış, boş, kırmızı 3 dingilli lowbed dorse",
      caption: "Filodan: MAN TGX 18.440 çekici + 3 dingil hidrolik rampalı lowbed",
    },
  },
  {
    id: "havuzlu",
    code: "LB-HV",
    tab: "Havuzlu & Çok Dingilli",
    tabMeta: "5–8 dingil",
    title: "Havuzlu & Çok Dingilli Dorse",
    summary:
      "Yüksek tonajlı iş makineleri, taş kırma ve eleme tesisleri. Alçak havuz platformu yüksek yüklerde toplam araç yüksekliğini 4,00 m sınırının altında tutar; yük çok dingile yayılarak dingil yükleri düşürülür.",
    specs: [
      { label: "Dingil sayısı", value: "5–8" },
      { label: "Havuz yüksekliği", value: "≈ 400–500 mm" },
      { label: "Havuz uzunluğu", value: "≈ 7–9 m" },
      { label: "Platform genişliği", value: "2,55 m (üzeri özel izinle)" },
      { label: "Teknik faydalı yük", value: "60–80 t" },
      { label: "Yükleme", value: "Arka rampa veya vinç destekli" },
    ],
    tagsLabel: "Tipik yükler",
    tags: ["45 t üzeri ekskavatör", "Büyük sınıf dozer", "Mobil kırıcı & eleme tesisi", "Trafo & ağır sanayi ekipmanı", "Kule vinç elemanları"],
    table: { axles: "5–8", deck: "≈ 0,4–0,5 m", length: "≈ 7–9 m (havuz)", payload: "60–80 t" },
  },
  {
    id: "teleskopik",
    code: "LB-TL",
    tab: "Teleskopik / Uzatmalı",
    tabMeta: "uzun yük",
    title: "Teleskopik / Uzatmalı Lowbed",
    summary:
      "Uzun metrajlı kiriş, boru ve rüzgar enerjisi parçaları taşımacılığı. Platform yük boyuna göre uzatılır; arka çıkıntı ve toplam araç boyu izin sürecinde hesaplanır.",
    specs: [
      { label: "Dingil sayısı", value: "3–4" },
      { label: "Kapalı platform boyu", value: "≈ 13,6 m" },
      { label: "Uzatılmış platform boyu", value: "≈ 24 m'ye kadar" },
      { label: "Platform yüksekliği", value: "≈ 1.000 mm" },
      { label: "Teknik faydalı yük", value: "≈ 35–45 t" },
      { label: "İşaretleme", value: "Arka çıkıntı uyarı levhası ve ışıklandırma" },
    ],
    tagsLabel: "Tipik yükler",
    tags: ["Prefabrik & çelik kiriş", "Büyük çaplı boru", "Rüzgar türbini parçaları", "Vinç bomu elemanları", "Çelik konstrüksiyon"],
    table: { axles: "3–4", deck: "≈ 1,0 m", length: "≈ 13,6 → 24 m", payload: "≈ 35–45 t" },
  },
  {
    id: "eskort",
    code: "ESK",
    tab: "Eskort & Güzergah İzni",
    tabMeta: "KTK uyumlu",
    title: "Eskort & Karayolları Güzergah İzni",
    summary:
      "KTK mevzuatına tam uyumlu eskort araç tahsisi ve geçiş izin protokolleri. Gabari dışı ve ağır yüklerde izin, güzergah etüdü ve refakat tek elden yürütülür.",
    specs: [
      { label: "Mevzuat", value: "2918 sayılı KTK ve Karayolları Trafik Yönetmeliği" },
      { label: "Özel izin", value: "KGM özel yük taşıma izni başvurusu ve takibi" },
      { label: "Güzergah etüdü", value: "Köprü, menfez, üst geçit, enerji hattı, viraj ve şantiye girişi" },
      { label: "Eskort", value: "Ön ve arka refakat aracı, tepe lambası ve uyarı levhası" },
      { label: "Koordinasyon", value: "Gerektiğinde trafik ekipleriyle geçiş planı" },
      { label: "Sevk saatleri", value: "İzin belgesindeki saat ve güzergah kısıtlarına göre" },
    ],
    tagsLabel: "Devreye girdiği durumlar",
    tags: ["Genişlik > 2,55 m", "Toplam yükseklik > 4,00 m", "Toplam ağırlık > 40 t", "Uzun yük / arka çıkıntı"],
    table: { axles: "—", deck: "—", length: "—", payload: "—" },
  },
];

/** Karşılaştırma tablosuna yalnızca dorse tipleri girer */
export const TRAILERS = FLEET.filter((item) => item.id !== "eskort");
