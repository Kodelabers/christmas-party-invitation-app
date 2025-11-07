// @ts-ignore
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

 const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: "#DC2626",
          green: "#16A34A",
          gold: "#D97706",
          dark: "#1F2937",
        },
        brand: {
          bg: "#0B1220",
          card: "#0E1626",
          border: "#122036",
          text: "#E6EEF8",
          muted: "#9FB3C8",
          primary: "#00BCAD",
          primaryDark: "#0AC7B5",
          accent: "#7CF3E6"
        },
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(0,230,210,0.25)",
        card: "0 10px 30px rgba(0,0,0,0.35)",
      },
      fontFamily: {
        festive: ["var(--font-festive)", "cursive"],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const brand = theme("colors.brand") as any;
      const shadows = theme("boxShadow") as any;

      addComponents({
        ".btn-primary": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          fontWeight: "600",
          color: "#ffffff",
          backgroundImage: `linear-gradient(90deg, ${brand?.primaryDark ?? "#0AC7B5"}, ${brand?.primary ?? "#00E6D2"})`,
          boxShadow: shadows?.card ?? "0 10px 30px rgba(0,0,0,0.35)",
          transitionProperty: "colors, filter, box-shadow",
          transitionDuration: "150ms",
          cursor: "pointer",
          "&:hover": {
            filter: "brightness(1.05)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: shadows?.glow ?? "0 0 0 3px rgba(0,230,210,0.25)",
          },
          "&:disabled": {
            opacity: "0.5",
            cursor: "not-allowed",
          },
        },
        ".btn-outline": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          fontWeight: "600",
          color: brand?.text ?? "#E6EEF8",
          backgroundColor: "transparent",
          borderWidth: "1px",
          borderColor: brand?.border ?? "#122036",
          transitionProperty: "colors, background-color, box-shadow",
          transitionDuration: "150ms",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: brand?.card ?? "#0E1626",
          },
          "&:disabled": {
            opacity: "0.5",
            cursor: "not-allowed",
          },
        },
        ".card": {
          borderRadius: "1rem",
          borderWidth: "1px",
          borderColor: brand?.border ?? "#122036",
          backgroundColor: brand?.card ?? "#0E1626",
          backdropFilter: "blur(8px)",
          boxShadow: shadows?.card ?? "0 10px 30px rgba(0,0,0,0.35)",
        },
        ".card-contrast": {
          borderRadius: "1rem",
          borderWidth: "1px",
          borderColor: brand?.border ?? "#122036",
          backgroundImage: `linear-gradient(180deg, rgba(5,10,18,0.95), rgba(10,16,27,0.95))`,
          backdropFilter: "blur(10px)",
          boxShadow: `${shadows?.card ?? "0 10px 30px rgba(0,0,0,0.35)"}, 0 0 0 1px rgba(18,32,54,0.6)`,
        },
      });
    }),
  ],
};
export default config;

