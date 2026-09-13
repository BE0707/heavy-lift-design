import type { Config } from "tailwindcss";

/**
 * Endüstriyel tasarım sistemi.
 * Tek tema (koyu). Renk adları malzemeden gelir: asfalt, grafit, çizgi (rule),
 * iş güvenliği sarısı (signal) ve uyarı turuncusu (hazard).
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Barlow Condensed"', "system-ui", "sans-serif"],
        condensed: ['"Barlow Condensed"', '"Arial Narrow"', "system-ui", "sans-serif"],
        sans: ["Barlow", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        ink: "#0F1115",
        asphalt: "#121417",
        graphite: "#1A1D22",
        plate: "#22262D",
        rule: { DEFAULT: "#262B32", strong: "#363D47", subtle: "rgba(255, 255, 255, 0.07)" },
        bone: "#ECEDEF",
        steel: "#A7AFB8",
        dim: "#858D97",
        signal: { DEFAULT: "#FDB813", hover: "#FFC83D", press: "#E5A919" },
        hazard: { DEFAULT: "#E65100", text: "#FF7A1A" },
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        label: "0.08em",
      },
      keyframes: {
        "overlay-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "panel-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        "overlay-in": "overlay-in 150ms ease-out",
        "panel-in": "panel-in 180ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
