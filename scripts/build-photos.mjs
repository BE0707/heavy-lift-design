#!/usr/bin/env node
/**
 * Proje fotoğraflarının optimize, responsive türevlerini üretir.
 *
 *   Kaynak : assets-src/photos/<slug>.jpg   (WhatsApp çıkışı orijinaller; bazıları telefon ekran görüntüsü)
 *   Çıktı  : src/assets/photos/<slug>-<genişlik>.webp  (480 / 960 / 1600, kaynaktan büyük boyut üretilmez)
 *            src/assets/photos/<slug>-<genişlik>.jpg   (tek JPEG yedeği, WebP desteklemeyen tarayıcılar için)
 *            src/assets/photos/photos.json            (boyut + mevcut genişlikler; bileşenler bunu okur)
 *
 * Gereksinim: ImageMagick 7 (`magick`). Kullanım: `node scripts/build-photos.mjs`
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "assets-src/photos");
const OUT = join(root, "src/assets/photos");
const WIDTHS = [480, 960, 1600];
const FALLBACK_WIDTH = 960;

/**
 * slug -> ImageMagick ön işlem argümanları.
 * Ekran görüntülerinde siyah letterbox bantları, iPhone ana ekran çubuğu ve
 * telefon filigranı kırpılır; yan çekilmiş kare döndürülür.
 */
const PHOTOS = {
  "sany-sy385h-ekskavator": [],
  "sumitomo-sh300-dag-konvoyu": [],
  "hyundai-hx210-ekskavator": [],
  "hidromek-hmk220-actros": [],
  "hidromek-kazici-yukleyici": [],
  "traktor-balya-makinesi": [],
  "kleemann-mc110r-mobil-kirici": [],
  "mobil-kirici-eleme-tesisi": ["-crop", "738x587+0+506"],
  "fore-kazik-makinesi": [],
  "kamyon-ustu-sondaj-makinesi": [],
  "sondaj-destek-kamyonu": [],
  "uc-lowbed-konvoy": ["-crop", "738x410+0+595"],
  "boru-hatti-santiyesi": ["-crop", "738x554+0+311"],
  "ekskavator-silindir-kombine": ["-crop", "738x548+0+526"],
  "paletli-dozer-dag-yolu": ["-crop", "738x979+0+311", "+repage", "-rotate", "-90", "-crop", "895x738+0+0"],
  "man-tgx-3-dingil-lowbed": ["-crop", "1200x900+0+380"],
};

const magick = (...args) => execFileSync("magick", args, { encoding: "utf8" }).trim();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "photos-"));
const manifest = {};

for (const [slug, ops] of Object.entries(PHOTOS)) {
  const master = join(tmp, `${slug}.png`);
  magick(join(SRC, `${slug}.jpg`), "-auto-orient", ...ops, "+repage", "-strip", master);
  const [w, h] = magick("identify", "-format", "%w %h", master).split(" ").map(Number);

  const widths = [...new Set(WIDTHS.map((t) => Math.min(t, w)))];
  for (const width of widths) {
    magick(master, "-resize", `${width}x`, "-quality", "70", "-define", "webp:method=6", join(OUT, `${slug}-${width}.webp`));
  }
  const fallback = Math.min(FALLBACK_WIDTH, w);
  magick(
    master, "-resize", `${fallback}x`,
    "-quality", "80", "-interlace", "JPEG", "-sampling-factor", "4:2:0",
    join(OUT, `${slug}-${fallback}.jpg`),
  );

  manifest[slug] = { width: w, height: h, widths, fallback };
  console.log(`${slug.padEnd(32)} ${w}x${h}  webp:${widths.join("/")}  jpg:${fallback}`);
}

writeFileSync(join(OUT, "photos.json"), JSON.stringify(manifest, null, 2) + "\n");
rmSync(tmp, { recursive: true, force: true });
