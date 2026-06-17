import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        dark: {
          50:  "#1e1e2e",
          100: "#181825",
          200: "#11111b",
          300: "#080810",
        },
      },
      animation: {
        marquee:        "marquee 35s linear infinite",
        "fade-up":      "fadeUp .7s cubic-bezier(.22,1,.36,1) both",
        "fade-in":      "fadeIn .6s ease both",
        float:          "float 5s ease-in-out infinite",
        blink:          "blink 1s step-end infinite",
        "spin-slow":    "spin 25s linear infinite",
        "glow-pulse":   "glowPulse 4s ease-in-out infinite",
        "slide-up":     "slideUp .5s cubic-bezier(.22,1,.36,1) both",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":     { opacity: "0.9", transform: "scale(1.06)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
