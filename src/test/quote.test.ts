import { describe, expect, it } from "vitest";
import { WHATSAPP_GREETING, whatsappHref } from "@/data/company";
import { buildQuoteMessage, parseDecimal, validateQuote, type QuoteForm } from "@/lib/quote";

const form = (overrides: Partial<QuoteForm> = {}): QuoteForm => ({
  loadType: "Paletli ekskavatör",
  model: "",
  weight: "38",
  length: "",
  width: "",
  height: "",
  origin: "Diyarbakır / Kayapınar",
  destination: "Şanlıurfa / Siverek",
  date: "",
  loading: "",
  contact: "",
  note: "",
  dispatcherId: "ramazan",
  ...overrides,
});

describe("parseDecimal", () => {
  it("virgül ve nokta ondalığını kabul eder", () => {
    expect(parseDecimal("12,5")).toBe(12.5);
    expect(parseDecimal(" 38 ")).toBe(38);
    expect(parseDecimal("3.25")).toBe(3.25);
  });

  it("boş veya geçersiz girdide undefined döner", () => {
    expect(parseDecimal("")).toBeUndefined();
    expect(parseDecimal("abc")).toBeUndefined();
  });
});

describe("validateQuote", () => {
  it("zorunlu alanları ister", () => {
    const errors = validateQuote(form({ loadType: "", weight: "", origin: " ", destination: "" }));
    expect(Object.keys(errors).sort()).toEqual(["destination", "loadType", "origin", "weight"]);
  });

  it("geçersiz ölçüyü reddeder, boş ölçüyü kabul eder", () => {
    expect(validateQuote(form({ width: "abc" }))).toHaveProperty("width");
    expect(validateQuote(form({ width: "", height: "3,4" }))).toEqual({});
  });
});

describe("buildQuoteMessage", () => {
  it("selamla başlar, boş isteğe bağlı alanları atlar", () => {
    const lines = buildQuoteMessage(form()).split("\n");
    expect(lines[0]).toBe(WHATSAPP_GREETING);
    expect(lines).toContain("Tahmini ağırlık: 38 ton");
    expect(lines).toContain("Çıkış: Diyarbakır / Kayapınar");
    expect(lines.filter((l) => l === "")).toHaveLength(1);
    expect(lines.some((l) => l.startsWith("Marka / model"))).toBe(false);
  });

  it("ölçü, tarih ve yükleme şeklini biçimler", () => {
    const text = buildQuoteMessage(form({ length: "11,2", height: "3,4", date: "2026-09-15", loading: "Kendi yürüyüşüyle rampadan çıkar" }));
    expect(text).toContain("Ölçüler (boy × en × yükseklik): 11,2 × — × 3,4 m");
    expect(text).toContain("Planlanan yükleme: 15.09.2026");
    expect(text).toContain("Yükleme şekli: Kendi yürüyüşüyle rampadan çıkar");
  });
});

describe("whatsappHref", () => {
  it("numarayı sadeleştirir ve mesajı kodlar", () => {
    const href = whatsappHref("+905327459843");
    expect(href.startsWith("https://wa.me/905327459843?text=")).toBe(true);
    expect(decodeURIComponent(href.split("text=")[1])).toBe(WHATSAPP_GREETING);
  });
});
