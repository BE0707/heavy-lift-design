/**
 * Operasyon bölgesi: Diyarbakır üssü ve çevre iller.
 * Koordinatlar il merkezleridir; mesafeler kuş uçuşu (haversine) hesaplanır,
 * karayolu mesafesi değildir.
 */

export type Tier = "hub" | "core" | "extended";

export interface Province {
  plate: string;
  name: string;
  lat: number;
  lon: number;
  tier: Tier;
  /** Harita etiketi: işarete göre ofset (harita birimi) ve hizalama */
  label: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
}

export const TIER_LABEL: Record<Tier, string> = {
  hub: "Üs",
  core: "Güneydoğu Anadolu",
  extended: "Doğu Anadolu · komşu iller",
};

const right = { dx: 9, dy: 4, anchor: "start" } as const;
const left = { dx: -9, dy: 4, anchor: "end" } as const;

export const PROVINCES: readonly Province[] = [
  { plate: "21", name: "Diyarbakır", lat: 37.9144, lon: 40.2306, tier: "hub", label: { dx: 0, dy: -15, anchor: "middle" } },
  { plate: "72", name: "Batman", lat: 37.8812, lon: 41.1351, tier: "core", label: { dx: 0, dy: 19, anchor: "middle" } },
  { plate: "47", name: "Mardin", lat: 37.3212, lon: 40.7245, tier: "core", label: right },
  { plate: "56", name: "Siirt", lat: 37.9333, lon: 41.95, tier: "core", label: right },
  { plate: "73", name: "Şırnak", lat: 37.5164, lon: 42.4611, tier: "core", label: right },
  { plate: "63", name: "Şanlıurfa", lat: 37.1591, lon: 38.7969, tier: "core", label: right },
  { plate: "02", name: "Adıyaman", lat: 37.7648, lon: 38.2786, tier: "core", label: left },
  { plate: "27", name: "Gaziantep", lat: 37.0662, lon: 37.3833, tier: "core", label: right },
  { plate: "79", name: "Kilis", lat: 36.7184, lon: 37.1212, tier: "core", label: right },
  { plate: "23", name: "Elazığ", lat: 38.681, lon: 39.2264, tier: "extended", label: left },
  { plate: "44", name: "Malatya", lat: 38.3552, lon: 38.3095, tier: "extended", label: left },
  { plate: "62", name: "Tunceli", lat: 39.1079, lon: 39.5401, tier: "extended", label: right },
  { plate: "12", name: "Bingöl", lat: 38.8847, lon: 40.4939, tier: "extended", label: right },
  { plate: "49", name: "Muş", lat: 38.7432, lon: 41.5064, tier: "extended", label: right },
  { plate: "13", name: "Bitlis", lat: 38.4006, lon: 42.1095, tier: "extended", label: right },
  { plate: "65", name: "Van", lat: 38.4891, lon: 43.4089, tier: "extended", label: right },
  { plate: "30", name: "Hakkari", lat: 37.5744, lon: 43.7408, tier: "extended", label: right },
];

export const HUB = PROVINCES[0];

const EARTH_RADIUS_KM = 6371;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Kuş uçuşu mesafe (km), haversine */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export interface ProvinceWithDistance extends Province {
  /** Üsse kuş uçuşu mesafe, km (yuvarlanmış) */
  km: number;
}

export const PROVINCES_WITH_DISTANCE: readonly ProvinceWithDistance[] = PROVINCES.map((p) => ({
  ...p,
  km: Math.round(distanceKm(HUB, p)),
}));
