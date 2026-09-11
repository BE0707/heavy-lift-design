/**
 * Gabari / özel izin ön kontrolü. Müşterinin girdiği ağırlık ve ölçülere göre
 * dorse tipini ve özel izin ihtiyacını ÖN DEĞERLENDİRME olarak hesaplar.
 * Kesin karar güzergah etüdü ve KGM izin sürecinde verilir.
 */

/** Karayolları Trafik Yönetmeliği genel sınırları (izin gerektirmeyen) */
export const LEGAL_LIMITS = {
  /** m */
  width: 2.55,
  /** m, yol yüzeyinden toplam araç yüksekliği */
  height: 4.0,
  /** m, çekici + yarı römork */
  length: 16.5,
  /** t, 5 dingilli çekici + yarı römork */
  grossWeight: 40,
} as const;

/** Tipik platform yükseklikleri (m); src/data/fleet.ts ile uyumlu üst değerler */
export const DECK_HEIGHT = { standart: 1.0, havuzlu: 0.45 } as const;
/** Standart lowbed platformunun üst uzunluğu (m) */
export const STANDARD_DECK_LENGTH = 10.5;
/** Teleskopik dorsenin kapalı boyu (m); üzerinde arka çıkıntı izne girer */
export const TELESCOPIC_CLOSED_LENGTH = 13.6;
/** Havuzlu dorsede havuz boyu üst değeri (m) */
export const WELL_LENGTH = 9;
/** Çekici + boş lowbed darası ≈ 20 t; bu yükün üstünde 40 t toplam ağırlık aşılır */
export const PAYLOAD_WITHOUT_PERMIT = 20;

export interface LoadInput {
  /** ton */
  weight?: number;
  /** metre */
  length?: number;
  width?: number;
  height?: number;
}

export type CheckLevel = "ok" | "info" | "warn";
export type TrailerSuggestion = "standart" | "teleskopik" | "havuzlu" | "proje";

export interface CheckItem {
  level: CheckLevel;
  topic: "Ağırlık" | "Genişlik" | "Yükseklik" | "Uzunluk";
  text: string;
}

export interface LoadAssessment {
  trailer: TrailerSuggestion;
  permit: "gerekli" | "gerekmeyebilir" | "belirsiz";
  items: CheckItem[];
}

export const TRAILER_LABEL: Record<TrailerSuggestion, string> = {
  standart: "Standart lowbed (3–4 dingil)",
  teleskopik: "Teleskopik / uzatmalı lowbed",
  havuzlu: "Havuzlu & çok dingilli (5–8 dingil)",
  proje: "Proje bazlı çözüm (operasyon masası)",
};

const RANK: Record<TrailerSuggestion, number> = { standart: 0, teleskopik: 1, havuzlu: 2, proje: 3 };

const fmt = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

const isSet = (n: number | undefined): n is number => typeof n === "number" && Number.isFinite(n) && n > 0;

export function assessLoad(input: LoadInput): LoadAssessment | null {
  const { weight, length, width, height } = input;
  if (![weight, length, width, height].some(isSet)) return null;

  const items: CheckItem[] = [];
  // `as`: closure içindeki atamalar akış analizine görünmediği için tip daraltılmasın
  let trailer = "standart" as TrailerSuggestion;
  const suggest = (t: TrailerSuggestion) => {
    if (RANK[t] > RANK[trailer]) trailer = t;
  };

  if (isSet(weight)) {
    if (weight > 80) {
      items.push({ level: "warn", topic: "Ağırlık", text: `${fmt(weight)} t: 80 t üzeri yüklerde modüler / proje bazlı çözüm gerekir. Operasyon masasıyla görüşün.` });
      suggest("proje");
    } else if (weight > 50) {
      items.push({ level: "warn", topic: "Ağırlık", text: `${fmt(weight)} t: yük 5–8 dingile yayılmalı. Çok dingilli dorse ve KGM özel izni gerekir.` });
      suggest("havuzlu");
    } else if (weight > PAYLOAD_WITHOUT_PERMIT) {
      items.push({ level: "warn", topic: "Ağırlık", text: `${fmt(weight)} t: çekici ve dorseyle toplam ağırlık ${LEGAL_LIMITS.grossWeight} t sınırını aşar. KGM özel izni ve dingil yükü hesabı gerekir.` });
    } else {
      items.push({ level: "ok", topic: "Ağırlık", text: `${fmt(weight)} t: genel sınırlar içinde kalabilir; dingil yükü dağılımı yine kontrol edilir.` });
    }
  }

  if (isSet(width)) {
    if (width > LEGAL_LIMITS.width) {
      items.push({ level: "warn", topic: "Genişlik", text: `${fmt(width)} m: ${fmt(LEGAL_LIMITS.width)} m sınırı aşılıyor. Özel izin gerekir; eskort ihtiyacı genişliğe göre belirlenir.` });
    } else {
      items.push({ level: "ok", topic: "Genişlik", text: `${fmt(width)} m: ${fmt(LEGAL_LIMITS.width)} m sınırı içinde.` });
    }
  }

  if (isSet(height)) {
    const onStandard = height + DECK_HEIGHT.standart;
    const onWell = height + DECK_HEIGHT.havuzlu;
    if (onStandard <= LEGAL_LIMITS.height) {
      items.push({ level: "ok", topic: "Yükseklik", text: `Standart lowbedde toplam ≈ ${fmt(onStandard)} m (sınır ${fmt(LEGAL_LIMITS.height)} m).` });
    } else if (onWell <= LEGAL_LIMITS.height) {
      items.push({ level: "info", topic: "Yükseklik", text: `Standart lowbedde toplam ≈ ${fmt(onStandard)} m ile sınır aşılır; havuzlu dorsede ≈ ${fmt(onWell)} m ile sınır içinde kalır.` });
      suggest("havuzlu");
    } else {
      items.push({ level: "warn", topic: "Yükseklik", text: `Havuzlu dorsede bile toplam ≈ ${fmt(onWell)} m. Özel izin ve güzergah yükseklik etüdü (üst geçit, enerji hattı) gerekir.` });
      suggest("havuzlu");
    }
  }

  if (isSet(length)) {
    if (length > TELESCOPIC_CLOSED_LENGTH) {
      items.push({ level: "warn", topic: "Uzunluk", text: `${fmt(length)} m: uzun yük. Teleskopik dorse; arka çıkıntı ve toplam boy (${fmt(LEGAL_LIMITS.length)} m) özel izin kapsamında değerlendirilir.` });
      suggest("teleskopik");
    } else if (length > STANDARD_DECK_LENGTH) {
      items.push({ level: "info", topic: "Uzunluk", text: `${fmt(length)} m: standart platform (≈ 9,5–${fmt(STANDARD_DECK_LENGTH)} m) aşılıyor; teleskopik / uzatmalı dorse önerilir.` });
      suggest("teleskopik");
    } else {
      items.push({ level: "ok", topic: "Uzunluk", text: `${fmt(length)} m: standart platforma sığar.` });
    }
    // Ağır ve uzun yük havuz boyuna sığmıyorsa dorse seçimi projeye döner
    if (trailer === "havuzlu" && length > WELL_LENGTH) {
      items.push({ level: "info", topic: "Uzunluk", text: `Havuz boyu (≈ 7–${fmt(WELL_LENGTH)} m) aşılıyor; dorse seçimi proje bazlı yapılır.` });
      suggest("proje");
    }
  }

  const hasWarn = items.some((i) => i.level === "warn");
  const permit = hasWarn ? "gerekli" : isSet(weight) ? "gerekmeyebilir" : "belirsiz";

  return { trailer, permit, items };
}
