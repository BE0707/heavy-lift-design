import type { Config } from "tailwindcss";

/**
 * Endüstriyel editoryal tasarım sistemi.
 * Tek tema (koyu). Nötr kömür zeminler, sıcak kırık beyaz metin; sarı (signal)
 * yalnızca hassas vurgu: ana eylem, aktif durum, ölçü ve bölüm işareti.
 * Yazı: IBM Plex Sans (başlık + metin) ve IBM Plex Mono (ölçü, kod, teknik etiket).
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        display: ['"IBM Plex Sans"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        /** Yalnızca logo yazısı (BUMERANG); marka görünümü korunur */
        brand: ['"Barlow Condensed"', '"Arial Narrow"', "sans-serif"],
      },
      colors: {
        ink: "#0E0E0D",
        asphalt: "#131312",
        graphite: "#1B1B19",
        plate: "#242421",
        rule: { DEFAULT: "#2C2B28", strong: "#3E3C38" },
        bone: "#ECE8DF",
        steel: "#A9A59C",
        dim: "#8B877F",
        signal: { DEFAULT: "#FDB813", hover: "#FFC83D", press: "#E5A919" },
        hazard: { DEFAULT: "#E65100", text: "#FF7A1A" },
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "display-xl": ["clamp(2.375rem, 1.35rem + 3.3vw, 4.625rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2rem, 1.35rem + 2.1vw, 3.375rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.5rem, 1.2rem + 0.9vw, 2.125rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "figure-lg": ["clamp(2.75rem, 2rem + 2.4vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        label: "0.08em",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        "overlay-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "panel-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        "spec-in": { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        "overlay-in": "overlay-in 150ms ease-out",
        "panel-in": "panel-in 180ms ease-out",
        "spec-in": "spec-in 420ms cubic-bezier(0.25, 1, 0.5, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
