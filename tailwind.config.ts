import type { Config } from "tailwindcss";
import type { DefaultColors } from "tailwindcss/types/generated/colors";

const colors = {
  black: "#000000",
  paleLavender: "#DDD4FF",
  paleLavendarMedium: "#5945A6",
  paleLavendarDark: "#4A3695",
  darkSilver: "#6C6C70",
  violet: "#4A276D",
  indigo: "#211B68",
  lightBlack: "#0000001A",
  silverSand: "#C2C2C2",
  red: "#FB5959"
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      boxShadow: {
        lightBlack: "0px 1px 15px 2px #0000001A",
      },
    },
  },
  plugins: [],
};
export default config;

export type Colors = typeof colors & DefaultColors;