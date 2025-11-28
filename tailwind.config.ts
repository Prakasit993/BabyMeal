import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // <-- อย่าลืมบรรทัดนี้นะครับ!
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baby: {
          blue: "#E3F2FD",
          green: "#E8F5E9",
          pink: "#FCE4EC",
          text: "#1F2937",
        },
        primary: {
          DEFAULT: "#4ADE80",
          hover: "#22C55E",
        },
        secondary: {
          DEFAULT: "#F472B6",
        }
      },
      fontFamily: {
        sans: ["var(--font-kanit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;