/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    borderRadius: {
      default: "4px",
      full: "100%",
    },
    colors: {
      background: "#FAFAFA",
      primary: {
        50: "#f3f2ff",
        100: "#eae7ff",
        200: "#d8d1ff",
        300: "#bcacff",
        400: "#9b7eff",
        500: "#7d4aff",
        600: "#6d25ff",
        700: "#6921ef",
        800: "#500fc8",
        900: "#430fa3",
        950: "#27066f",
      },
      secondary: {
        50: "#f6f8f9",
        100: "#ebf0f3",
        200: "#ccd8e0",
        300: "#acc0cd",
        400: "#7f9fb1",
        500: "#5f8398",
        600: "#4b6a7e",
        700: "#3e5666",
        800: "#364956",
        900: "#303f4a",
        950: "#202931",
      },
      accent: {
        50: "#f3f7f8",
        100: "#e0e9ed",
        100: "#c5d4dc",
        100: "#9db5c3",
        100: "#6d8ea3",
        100: "#54758c",
        100: "#475f73",
        100: "#3e5060",
        100: "#384552",
        100: "#323b47",
        100: "#1e252e",
      },
      neutral: {
        50: "#fafafa",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#010101",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
      green: {
        50: "#f0fdf5",
        100: "#dcfce8",
        200: "#bbf7d1",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55d",
        600: "#16a349",
        700: "#15803c",
        800: "#166533",
        900: "#14532b",
        950: "#052e14",
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
