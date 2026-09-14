/**
 * Teknik çizimlerin (SVG) ortak paleti ve yazı tipi. Çizimler açık (kâğıt)
 * zemin üzerinde kullanılır; değerler tailwind.config.ts / index.css
 * tokenlarıyla aynıdır.
 */
export const INK = {
  /** çizgi ve ana metin (fg) */
  line: "#121211",
  /** yardımcı çizgi, etiket (fg-subtle) */
  muted: "#6B6B65",
  /** ölçü çizgisi ve oku (signal) */
  dim: "#237F52",
  /** yasal sınır (hazard) */
  limit: "#C2410C",
  /** gövde dolgusu (surface-alt) */
  body: "#F4F4F1",
  /** tekerlek içi / kâğıt (surface) */
  paper: "#FFFFFF",
} as const;

export const MONO = "'IBM Plex Mono', ui-monospace, monospace";
