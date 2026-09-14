/**
 * Gabari / özel izin ön kontrolü. Müşterinin girdiği ağırlık ve ölçüleri yasal
 * sınırlarla karşılaştırır ve ÖN DEĞERLENDİRME üretir. Dorseye uygunluk ve kesin
 * karar operasyon masası, güzergah etüdü ve KGM izin sürecinde verilir.
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

/**
 * Hesap VARSAYIMLARI. Dorsenin ruhsat değerleri doğrulanmadığından bu sayılar
 * sitede her kullanıldığı yerde "varsayım" olarak belirtilir.
 */
export const ASSUMPTIONS = {
  /** m, lowbed platform yüksekliği */
  deckHeight: 1.0,
  /** t, çekici + boş lowbed darası */
  tare: 20,
} as const;

export interface LoadInput {
  /** ton */
  weight?: number;
  /** metre */
  length?: number;
  width?: number;
  height?: number;
}

export type CheckLevel = "ok" | "info" | "warn";

export interface CheckItem {
  level: CheckLevel;
  topic: "Ağırlık" | "Genişlik" | "Yükseklik" | "Uzunluk";
  text: string;
}

export interface LoadAssessment {
  permit: "gerekli" | "gerekmeyebilir" | "belirsiz";
  items: CheckItem[];
  /** Varsayımlarla hesaplanan toplamlar (girilen değer yoksa undefined) */
  totals: { height?: number; weight?: number };
}

const fmt = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

const isSet = (n: number | undefined): n is number => typeof n === "number" && Number.isFinite(n) && n > 0;

export function assessLoad(input: LoadInput): LoadAssessment | null {
  const { weight, length, width, height } = input;
  if (![weight, length, width, height].some(isSet)) return null;

  const items: CheckItem[] = [];
  const totals: LoadAssessment["totals"] = {};

  if (isSet(weight)) {
    const total = weight + ASSUMPTIONS.tare;
    totals.weight = total;
    if (total > LEGAL_LIMITS.grossWeight) {
      items.push({ level: "warn", topic: "Ağırlık", text: `${fmt(weight)} t yükle toplam ≈ ${fmt(total)} t; ${LEGAL_LIMITS.grossWeight} t sınırı aşılır. KGM özel izni ve dingil yükü hesabı gerekir.` });
    } else {
      items.push({ level: "ok", topic: "Ağırlık", text: `${fmt(weight)} t yükle toplam ≈ ${fmt(total)} t; ${LEGAL_LIMITS.grossWeight} t sınırı içinde kalabilir. Dingil yükü dağılımı yine kontrol edilir.` });
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
    const total = height + ASSUMPTIONS.deckHeight;
    totals.height = total;
    if (total <= LEGAL_LIMITS.height) {
      items.push({ level: "ok", topic: "Yükseklik", text: `Platformla birlikte toplam ≈ ${fmt(total)} m; ${fmt(LEGAL_LIMITS.height)} m sınırı içinde.` });
    } else {
      items.push({ level: "warn", topic: "Yükseklik", text: `Platformla birlikte toplam ≈ ${fmt(total)} m; ${fmt(LEGAL_LIMITS.height)} m sınırı aşılır. Özel izin ve güzergah yükseklik etüdü (üst geçit, enerji hattı) gerekir.` });
    }
  }

  if (isSet(length)) {
    if (length > LEGAL_LIMITS.length) {
      items.push({ level: "warn", topic: "Uzunluk", text: `${fmt(length)} m: yük boyu tek başına ${fmt(LEGAL_LIMITS.length)} m toplam boy sınırını aşıyor. Özel izin gerekir.` });
    } else {
      items.push({ level: "info", topic: "Uzunluk", text: `${fmt(length)} m: dorseye sığıp sığmadığını ve arka çıkıntıyı operasyon masası kontrol eder.` });
    }
  }

  const hasWarn = items.some((i) => i.level === "warn");
  const permit = hasWarn ? "gerekli" : isSet(weight) ? "gerekmeyebilir" : "belirsiz";

  return { permit, items, totals };
}
