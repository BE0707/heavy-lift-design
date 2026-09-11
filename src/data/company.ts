import { SITE_URL } from "@/data/seo";

/**
 * Firma ve sevk (operasyon) hattı bilgileri. Telefon, WhatsApp ve adres
 * sitenin her yerinde buradan okunur; tek noktadan güncellenir.
 */
export const COMPANY = {
  name: "Bumerang Ağır Nakliyat",
  base: "Diyarbakır",
  region: "Güneydoğu Anadolu",
  hours: "7/24",
  siteUrl: SITE_URL,
} as const;

export interface Dispatcher {
  id: string;
  line: string;
  name: string;
  /** E.164 formatı: tel: ve wa.me bağlantıları için */
  phone: string;
  /** Yurt içi okunuş biçimi */
  display: string;
}

export const DISPATCHERS: readonly Dispatcher[] = [
  { id: "ramazan", line: "Hat 01", name: "Ramazan Karaboğa", phone: "+905327459843", display: "0532 745 98 43" },
  { id: "engin", line: "Hat 02", name: "Engin Karaboğa", phone: "+905326562605", display: "0532 656 26 05" },
];

export const PRIMARY_DISPATCHER = DISPATCHERS[0];

export const WHATSAPP_GREETING = "Merhaba, ağır nakliyat / lowbed taşıma fiyatı almak istiyorum.";

export const telHref = (phone: string) => `tel:${phone}`;

export const whatsappHref = (phone: string, text: string = WHATSAPP_GREETING) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
