import { cn } from "@/lib/utils";

/**
 * Pahlı geometrik "B" monogramı. public/favicon.svg ile aynı glif;
 * değiştirilirse `node scripts/build-icons.mjs` ile ikon seti yeniden üretilmeli.
 */
export const BRAND_GLYPH_PATH =
  "M14 10H39L46 17V25L42 29L49 36V47L42 54H14Z M24 18H34L37 21V24L34 27H24Z M24 36H37L40 39V42L37 45H24Z";

export const BrandMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden="true" focusable="false">
    <rect width="64" height="64" fill="#0F1115" />
    <path d={BRAND_GLYPH_PATH} transform="translate(0.5 0)" fill="#FDB813" fillRule="evenodd" />
  </svg>
);

export const Wordmark = ({ className }: { className?: string }) => (
  <span className={cn("flex items-center gap-3", className)}>
    <BrandMark className="h-9 w-9 outline outline-1 outline-rule-strong" />
    <span className="flex flex-col leading-none">
      <span className="font-display text-[1.375rem] font-bold uppercase tracking-[0.06em] text-bone">Bumerang</span>
      <span className="mt-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-steel">
        Ağır Nakliyat · Lowbed
      </span>
    </span>
  </span>
);
