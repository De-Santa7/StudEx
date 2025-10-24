// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",   // PURPLE — inactive, text, borders
        accent: "#14B8A6",    // TEAL — active, highlights, success
        background: "#FFFFFF", // White
        surface: "#F9FAFB",   // Light gray (cards)
        border: "#E5E7EB",    // Subtle borders
        text: "#1F2937",      // Dark gray (body text)
        muted: "#6B7280",     // Muted text
        // NO BLACK — REMOVED
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;