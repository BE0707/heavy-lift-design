/**
 * Sayfa bazlı SEO metinleri. Hem React (SEO bileşeni) hem de build sırasında
 * üretilen statik rota HTML'leri (vite.config.ts → bilgi.html) buradan okur.
 * index.html içindeki ana sayfa metinleri bununla aynı tutulmalıdır.
 */
export const SITE_URL = "https://www.bumerangagirnakliyat.website";

export const PAGES = {
  home: {
    path: "/",
    title: "Bumerang Ağır Nakliyat | Lowbed Taşımacılık & Gabari Dışı Nakliye - Diyarbakır",
    description:
      "Diyarbakır ve Güneydoğu merkezli gabari dışı ağır taşımacılık, hidrolik rampalı lowbed kiralama, iş makinesi ve şantiye nakliye çözümleri.",
  },
  bilgi: {
    path: "/bilgi",
    title: "Lowbed Taşımacılık Rehberi: Dorse, Özel İzin ve Fiyat | Bumerang Ağır Nakliyat",
    description:
      "Lowbed nedir, hangi yükler taşınır, gabari dışı yükte ne zaman KGM özel izni ve eskort gerekir, fiyatı neler belirler? Diyarbakır merkezli Bumerang Ağır Nakliyat.",
  },
} as const;

/** Paylaşım önizlemesi: 1200×630 JPEG (WhatsApp 300 KB sınırı). Open Graph mutlak URL ister. */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
