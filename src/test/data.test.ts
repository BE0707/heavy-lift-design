import { describe, expect, it } from "vitest";
import manifest from "@/assets/photos/photos.json";
import { HUB, PROVINCES, distanceKm } from "@/data/coverage";
import { FLEET } from "@/data/fleet";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { getPhoto } from "@/lib/photos";

describe("proje arşivi verisi", () => {
  it("her kayıt var olan bir fotoğrafa ve geçerli kategoriye bağlı", () => {
    const categories = new Set(PROJECT_CATEGORIES.map((c) => c.id));
    for (const project of PROJECTS) {
      expect(manifest).toHaveProperty(project.slug);
      expect(categories.has(project.category)).toBe(true);
      expect(project.alt.length).toBeGreaterThan(40);
    }
  });

  it("fotoğraflar tekrarlanmaz ve her kategoride kayıt var", () => {
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(PROJECTS.length);
    for (const category of PROJECT_CATEGORIES) {
      expect(PROJECTS.some((p) => p.category === category.id)).toBe(true);
    }
  });

  it("türevler çözümlenir; ızgara srcset'i 960 px ile sınırlanır", () => {
    const photo = getPhoto("sany-sy385h-ekskavator", 960);
    expect(photo.srcSet).toContain("480w");
    expect(photo.srcSet).toContain("960w");
    expect(photo.srcSet).not.toContain("1600w");
    expect(photo.src).toMatch(/\.jpg/);
    expect(photo.large).toMatch(/1600\.webp/);
  });
});

describe("filo ve kapsama verisi", () => {
  it("filo kimlikleri benzersiz ve spec satırları dolu", () => {
    expect(new Set(FLEET.map((f) => f.id)).size).toBe(FLEET.length);
    for (const item of FLEET) expect(item.specs.length).toBeGreaterThanOrEqual(5);
  });

  it("plakalar benzersiz; kuş uçuşu mesafeler makul", () => {
    expect(new Set(PROVINCES.map((p) => p.plate)).size).toBe(PROVINCES.length);
    const urfa = PROVINCES.find((p) => p.name === "Şanlıurfa")!;
    const van = PROVINCES.find((p) => p.name === "Van")!;
    expect(distanceKm(HUB, urfa)).toBeGreaterThan(140);
    expect(distanceKm(HUB, urfa)).toBeLessThan(165);
    expect(distanceKm(HUB, van)).toBeGreaterThan(270);
    expect(distanceKm(HUB, van)).toBeLessThan(300);
  });
});
