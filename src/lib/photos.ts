import manifest from "@/assets/photos/photos.json";

/**
 * `scripts/build-photos.mjs` tarafından üretilen responsive fotoğraf türevleri.
 * Her fotoğraf için WebP srcset + tek JPEG yedeği döner; boyutlar manifestten
 * gelir, böylece <img> width/height ile yerleşim kayması (CLS) oluşmaz.
 */
const urls = import.meta.glob<string>("/src/assets/photos/*.{webp,jpg}", {
  eager: true,
  query: "?url",
  import: "default",
});

export type PhotoSlug = keyof typeof manifest;

export interface Photo {
  width: number;
  height: number;
  srcSet: string;
  /** JPEG yedeği (WebP desteklemeyen tarayıcılar) */
  src: string;
  /** En büyük WebP; lightbox görünümü için */
  large: string;
}

function fileUrl(file: string): string {
  const url = urls[`/src/assets/photos/${file}`];
  if (!url) throw new Error(`Fotoğraf türevi bulunamadı: ${file} — node scripts/build-photos.mjs çalıştırın`);
  return url;
}

/** @param maxWidth srcset'e girecek en büyük genişlik (ızgara küçük resimlerinde mobil veriyi korur) */
export function getPhoto(slug: PhotoSlug, maxWidth = Number.POSITIVE_INFINITY): Photo {
  const entry = manifest[slug];
  const widths = entry.widths.filter((w) => w <= maxWidth);
  const usable = widths.length ? widths : [entry.widths[0]];
  const largest = entry.widths[entry.widths.length - 1];

  return {
    width: entry.width,
    height: entry.height,
    srcSet: usable.map((w) => `${fileUrl(`${slug}-${w}.webp`)} ${w}w`).join(", "),
    src: fileUrl(`${slug}-${entry.fallback}.jpg`),
    large: fileUrl(`${slug}-${largest}.webp`),
  };
}
