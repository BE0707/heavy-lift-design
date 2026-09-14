#!/usr/bin/env node
/**
 * Marka ikon seti ve paylaşım önizlemesi üretir (tek kaynak: aşağıdaki SVG glifi,
 * src/components/brand/BrandMark.tsx ile aynı).
 *
 *   public/favicon.svg            modern tarayıcılar + Google arama sonucu ikonu
 *   public/favicon.ico            16/32/48 px (eski tarayıcılar, /favicon.ico istekleri)
 *   public/favicon.png            512 px (eski bağlantılar önbellekte bu adresi tutuyor)
 *   public/apple-touch-icon.png   180 px, opak (iOS ana ekran)
 *   public/icon-192.png, icon-512.png, icon-maskable-512.png   (site.webmanifest)
 *   public/og-image.jpg           1200×630 WhatsApp / sosyal medya önizlemesi (< 300 KB)
 *
 * Gereksinim: ImageMagick 7 (`magick`) ve bir kondanse yazı tipi (varsayılan:
 * macOS "DIN Condensed Bold"; başka sistemde OG_FONT ortam değişkeniyle verin).
 * Kullanım: `npm run icons`
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(root, "public");
const INK = "#0F1115";
/** Marka yeşili (src/index.css --signal); ikon zemini ve ayırıcı çizgi */
const SIGNAL = "#237F52";
const WHITE = "#FFFFFF";
const BONE = "#F5F5F2";
const MUTED = "#B5B5AE";
const GLYPH =
  "M14 10H39L46 17V25L42 29L49 36V47L42 54H14Z M24 18H34L37 21V24L34 27H24Z M24 36H37L40 39V42L37 45H24Z";
/** 16 px ızgaraya oturtulmuş (hinted) varyant: sekme ikonunda 16/32/48 px'te net kenar */
const GLYPH_16 = "M4 3H10L12 5V7L11 8L12 9V11L10 13H4Z M6 5H9L10 6L9 7H6Z M6 9H9L10 10L9 11H6Z";
const FONT = process.env.OG_FONT ?? "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf";

const magick = (...args) => execFileSync("magick", args, { encoding: "utf8" });

const svg = (glyphTransform = "translate(0.5 0)") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
  `<title>Bumerang Ağır Nakliyat</title>` +
  `<rect width="64" height="64" fill="${SIGNAL}"/>` +
  `<path d="${GLYPH}" transform="${glyphTransform}" fill="${WHITE}" fill-rule="evenodd"/>` +
  `</svg>\n`;

const svgSmall = (px) =>
  `<svg xmlns="http://www.w3.org/2000/svg"${px ? ` width="${px}" height="${px}"` : ""} viewBox="0 0 16 16">` +
  `<title>Bumerang Ağır Nakliyat</title>` +
  `<rect width="16" height="16" fill="${SIGNAL}"/>` +
  `<path d="${GLYPH_16}" fill="${WHITE}" fill-rule="evenodd"/>` +
  `</svg>\n`;

const tmp = mkdtempSync(join(tmpdir(), "icons-"));
const master = join(tmp, "master.svg");
const maskable = join(tmp, "maskable.svg");
writeFileSync(join(PUBLIC, "favicon.svg"), svgSmall());
writeFileSync(master, svg());
// Maskable: glif güvenli alana (merkezden %40 yarıçap) sığacak şekilde küçültülür
writeFileSync(maskable, svg("translate(32 32) scale(0.72) translate(-31.5 -32)"));

const raster = (source, size, out) =>
  magick("-background", "none", "-density", "1152", source, "-resize", `${size}x${size}`, "-strip", out);

const sizes = { "favicon.png": 512, "apple-touch-icon.png": 180, "icon-192.png": 192, "icon-512.png": 512 };
for (const [file, size] of Object.entries(sizes)) raster(master, size, join(PUBLIC, file));
raster(maskable, 512, join(PUBLIC, "icon-maskable-512.png"));

// Küçük boyutlar: 16'lık ızgara, 32 katı büyüklükte çizilip kutu filtresiyle küçültülür (kenarlar piksele oturur)
const icoParts = [16, 32, 48].map((size) => {
  const source = join(tmp, `small-${size}.svg`);
  const out = join(tmp, `ico-${size}.png`);
  writeFileSync(source, svgSmall(size * 32));
  magick("-background", "none", source, "-filter", "box", "-resize", `${size}x${size}`, "-strip", out);
  return out;
});
magick(...icoParts, join(PUBLIC, "favicon.ico"));

// ---- Open Graph görseli: 1200×630, üstte marka bandı, altta gerçek saha fotoğrafı ----
if (!existsSync(FONT)) {
  throw new Error(`Yazı tipi bulunamadı: ${FONT} — OG_FONT ortam değişkeniyle bir .ttf yolu verin.`);
}
const photo = join(root, "assets-src/photos/sany-sy385h-ekskavator.jpg");
const band = 196;
const markSize = 116;
const mark = join(tmp, "mark.png");
raster(master, markSize, mark);

magick(
  "-size", "1200x630", `xc:${INK}`,
  // fotoğraf şeridi (makine + çekici + dorse)
  "(", photo, "-crop", "1600x571+0+440", "+repage", "-resize", "1200x428!", ")",
  "-geometry", `+0+${band + 6}`, "-composite",
  // yeşil ayırıcı çizgi
  "-fill", SIGNAL, "-draw", `rectangle 0,${band} 1200,${band + 5}`,
  // marka işareti
  mark, "-geometry", `+48+${(band - markSize) / 2}`, "-composite",
  "-font", FONT,
  "-fill", BONE, "-pointsize", "78", "-annotate", "+192+104", "BUMERANG AĞIR NAKLİYAT",
  "-fill", MUTED, "-pointsize", "37", "-annotate", "+194+154", "LOWBED · GABARİ DIŞI AĞIR TAŞIMACILIK · DİYARBAKIR",
  // telefon plakası
  "-fill", "#0F1115E6", "-draw", "rectangle 792,520 1164,606",
  "-fill", SIGNAL, "-draw", "rectangle 792,520 798,606",
  "-fill", MUTED, "-pointsize", "24", "-annotate", "+818+552", "7/24 OPERASYON HATTI",
  "-fill", BONE, "-pointsize", "46", "-annotate", "+818+596", "0532 745 98 43",
  "-strip", "-quality", "84", "-interlace", "JPEG", "-sampling-factor", "4:2:0",
  join(PUBLIC, "og-image.jpg"),
);

rmSync(tmp, { recursive: true, force: true });
const kb = (f) => `${(statSync(join(PUBLIC, f)).size / 1024).toFixed(1)} KB`;
for (const f of ["favicon.svg", "favicon.ico", "favicon.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "og-image.jpg"]) {
  console.log(`${f.padEnd(24)} ${kb(f)}`);
}
