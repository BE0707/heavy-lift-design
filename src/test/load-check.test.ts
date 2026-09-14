import { describe, expect, it } from "vitest";
import { ASSUMPTIONS, assessLoad } from "@/lib/load-check";

describe("assessLoad", () => {
  it("veri yokken değerlendirme üretmez", () => {
    expect(assessLoad({})).toBeNull();
    expect(assessLoad({ weight: 0, width: Number.NaN })).toBeNull();
  });

  it("hafif yükte izin gerekmeyebilir; toplam ağırlık dara varsayımıyla hesaplanır", () => {
    const result = assessLoad({ weight: 15 });
    expect(result?.permit).toBe("gerekmeyebilir");
    expect(result?.items[0].level).toBe("ok");
    expect(result?.totals.weight).toBe(15 + ASSUMPTIONS.tare);
  });

  it("dara ile 40 t aşılınca izin ister", () => {
    const result = assessLoad({ weight: 38 });
    expect(result?.permit).toBe("gerekli");
    expect(result?.items[0]).toMatchObject({ level: "warn", topic: "Ağırlık" });
    expect(result?.items[0].text).toContain("≈ 58 t");
    expect(result?.items[0].text).toContain("40 t");
  });

  it("2,55 m üzeri genişlikte izin ister", () => {
    const result = assessLoad({ width: 3.2 });
    expect(result?.items[0]).toMatchObject({ level: "warn", topic: "Genişlik" });
    expect(result?.permit).toBe("gerekli");
  });

  it("yüksekliği platform varsayımıyla toplar (Türkçe ondalık)", () => {
    const low = assessLoad({ height: 2.8 });
    expect(low?.items[0].level).toBe("ok");
    expect(low?.items[0].text).toContain("3,8 m");
    expect(low?.totals.height).toBeCloseTo(2.8 + ASSUMPTIONS.deckHeight);

    const high = assessLoad({ height: 3.2 });
    expect(high?.items[0].level).toBe("warn");
    expect(high?.items[0].text).toContain("4,2 m");
    expect(high?.permit).toBe("gerekli");
  });

  it("boyu operasyon masasına bırakır; 16,50 m'yi tek başına aşan yükte izin ister", () => {
    expect(assessLoad({ length: 12 })).toMatchObject({ permit: "belirsiz", items: [{ level: "info", topic: "Uzunluk" }] });
    expect(assessLoad({ length: 18 })).toMatchObject({ permit: "gerekli", items: [{ level: "warn", topic: "Uzunluk" }] });
  });

  it("dorse tipi önermez", () => {
    const result = assessLoad({ weight: 60, length: 12, height: 3.5, width: 3 });
    expect(result).not.toHaveProperty("trailer");
    expect(result?.items.map((i) => i.text).join(" ")).not.toMatch(/havuz|teleskop|dingilli dorse/i);
  });
});
