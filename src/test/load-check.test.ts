import { describe, expect, it } from "vitest";
import { assessLoad } from "@/lib/load-check";

describe("assessLoad", () => {
  it("veri yokken değerlendirme üretmez", () => {
    expect(assessLoad({})).toBeNull();
    expect(assessLoad({ weight: 0, width: Number.NaN })).toBeNull();
  });

  it("hafif yükte standart lowbed önerir, izin gerekmeyebilir", () => {
    const result = assessLoad({ weight: 15 });
    expect(result?.trailer).toBe("standart");
    expect(result?.permit).toBe("gerekmeyebilir");
    expect(result?.items[0].level).toBe("ok");
  });

  it("20 t üzerinde toplam ağırlık sınırı nedeniyle izin ister", () => {
    const result = assessLoad({ weight: 38 });
    expect(result?.trailer).toBe("standart");
    expect(result?.permit).toBe("gerekli");
    expect(result?.items[0].text).toContain("40 t");
  });

  it("ağırlığa göre çok dingilli ve proje bazlı çözüme geçer", () => {
    expect(assessLoad({ weight: 60 })?.trailer).toBe("havuzlu");
    expect(assessLoad({ weight: 90 })?.trailer).toBe("proje");
  });

  it("2,55 m üzeri genişlikte izin ister", () => {
    const result = assessLoad({ width: 3.2 });
    expect(result?.items[0]).toMatchObject({ level: "warn", topic: "Genişlik" });
    expect(result?.permit).toBe("gerekli");
  });

  it("yüksek yükte havuzlu dorseyi hesaplayarak önerir (Türkçe ondalık)", () => {
    const result = assessLoad({ height: 3.2 });
    expect(result?.trailer).toBe("havuzlu");
    expect(result?.items[0].level).toBe("info");
    expect(result?.items[0].text).toContain("4,2 m");
    expect(result?.items[0].text).toContain("3,65 m");
  });

  it("havuzlu dorsede de 4,00 m aşılırsa izin ve yükseklik etüdü ister", () => {
    const result = assessLoad({ height: 3.8 });
    expect(result?.items[0].level).toBe("warn");
    expect(result?.permit).toBe("gerekli");
  });

  it("uzun yükte teleskopik dorse, çok uzunda izin ister", () => {
    expect(assessLoad({ length: 12 })).toMatchObject({ trailer: "teleskopik", permit: "belirsiz" });
    expect(assessLoad({ length: 15 })).toMatchObject({ trailer: "teleskopik", permit: "gerekli" });
  });

  it("ağır ve havuza sığmayan uzun yükte proje bazlı çözüm önerir", () => {
    const result = assessLoad({ weight: 60, length: 12 });
    expect(result?.trailer).toBe("proje");
  });
});
