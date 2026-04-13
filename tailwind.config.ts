import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#030303",
          card: "rgba(255, 255, 255, 0.03)",
          accent: "#0A0A0A",
        },
        brand: {
          yellow: "#FAFF00",
          cyan: "#22D3EE",
          blue: "#3B82F6",
        },
        text: {
          main: "#FFFFFF",
          muted: "#A1A1AA",
          dim: "#3F3F46",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
} satisfies Config;
