import { WHATSAPP_GREETING } from "@/data/company";

export const LOAD_TYPES = [
  "Paletli ekskavatör",
  "Lastikli ekskavatör",
  "Dozer",
  "Greyder",
  "Silindir",
  "Kazıcı yükleyici (beko loder)",
  "Lastikli yükleyici (loder)",
  "Mobil kırıcı / eleme tesisi",
  "Vinç / kule vinç elemanı",
  "Sondaj / fore kazık makinesi",
  "Tarım makinesi",
  "Trafo / ağır sanayi ekipmanı",
  "Kiriş / boru / uzun malzeme",
  "Diğer",
] as const;

export interface QuoteForm {
  loadType: string;
  model: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  origin: string;
  destination: string;
  date: string;
  /** Dorse / hizmet tercihi (boş: operasyon masası önersin) */
  trailer: string;
  contact: string;
  note: string;
  dispatcherId: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteForm, string>>;

/** "12,5" ve "12.5" kabul eder; boş veya geçersiz girdide undefined döner */
export function parseDecimal(value: string): number | undefined {
  const normalized = value.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return undefined;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : undefined;
}

const fmt = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

export function validateQuote(form: QuoteForm): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!form.loadType) errors.loadType = "Yük tipini seçin.";

  const weight = parseDecimal(form.weight);
  if (weight === undefined || weight <= 0 || weight > 1000) {
    errors.weight = "Tahmini ağırlığı ton olarak girin (örn. 38 veya 12,5).";
  }

  for (const key of ["length", "width", "height"] as const) {
    if (!form[key].trim()) continue;
    const n = parseDecimal(form[key]);
    if (n === undefined || n <= 0 || n > 100) errors[key] = "Metre cinsinden geçerli bir ölçü girin.";
  }

  if (!form.origin.trim()) errors.origin = "Çıkış noktasını yazın (il / ilçe veya şantiye).";
  if (!form.destination.trim()) errors.destination = "Varış noktasını yazın (il / ilçe veya şantiye).";
  return errors;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

/** Operasyon masasına gidecek WhatsApp mesajı (düz metin, WhatsApp *kalın* biçimiyle) */
export function buildQuoteMessage(form: QuoteForm): string {
  const weight = parseDecimal(form.weight);
  const dims = [form.length, form.width, form.height].map(parseDecimal);
  const hasDims = dims.some((d) => d !== undefined);

  const optional = (value: string, label: string) => (value.trim() ? `${label}: ${value.trim()}` : null);

  const lines: (string | null)[] = [
    WHATSAPP_GREETING,
    "",
    "*YÜK BİLDİRİMİ*",
    `Yük tipi: ${form.loadType}`,
    optional(form.model, "Marka / model"),
    weight !== undefined ? `Tahmini ağırlık: ${fmt(weight)} ton` : null,
    hasDims ? `Ölçüler (boy × en × yükseklik): ${dims.map((d) => (d === undefined ? "—" : fmt(d))).join(" × ")} m` : null,
    `Çıkış: ${form.origin.trim()}`,
    `Varış: ${form.destination.trim()}`,
    form.date ? `Planlanan yükleme: ${formatDate(form.date)}` : null,
    optional(form.trailer, "Dorse / hizmet tercihi"),
    optional(form.contact, "İletişim"),
    optional(form.note, "Not"),
  ];

  return lines.filter((line) => line !== null).join("\n");
}
