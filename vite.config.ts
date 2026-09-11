import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { PAGES, SITE_URL } from "./src/data/seo";

const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/**
 * GitHub Pages SPA rotalarını bilmez: /bilgi doğrudan açılınca 404 döner.
 * Build sonunda index.html'den rota bazlı kopyalar üretilir:
 *  - bilgi.html → GitHub Pages /bilgi isteğine 200 ile sunar; başlık, açıklama,
 *    canonical ve og:url rotaya özeldir (JS çalıştırmayan tarayıcılar/önizlemeler için).
 *  - 404.html  → bilinmeyen adreslerde SPA yüklenir ve NotFound sayfası görünür (noindex).
 */
function staticRoutes(): Plugin {
  return {
    name: "static-routes",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") return;
      const html = String(index.source);

      const withMeta = (page: { path: string; title: string; description: string }) => {
        const url = `${SITE_URL}${page.path}`;
        const title = escapeAttr(page.title);
        const description = escapeAttr(page.description);
        return html
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${description}`);
      };

      this.emitFile({ type: "asset", fileName: "bilgi.html", source: withMeta(PAGES.bilgi) });
      this.emitFile({
        type: "asset",
        fileName: "404.html",
        source: html
          .replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex"')
          .replace(/\s*<link rel="canonical"[^>]*>/, ""),
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  // Özel alan adında (www.bumerangagirnakliyat.website) base "/" olmalı
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), staticRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
