/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)", // Default Background
        background: "#f9fafb", // Light Background Color
        foreground: "var(--foreground)", //Default Foreground Color
        primary: "#401E8A", // Deep Violet
        secondary: "#f97316", // Vivid Orange
        accent: "#10b981", // Emerald G
        lightGray: {
          100: "#f9fafb", // Very Light Gray
          200: "#f3f4f6", // Light Gray
        },
        mediumGray: {
          500: "#6b7280", // Medium Gray
        },
        darkGray: {
          800: "#1f2937", // Dark Gray
        },
      },

      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Montserrat", "sans-serif"],
        display: ["Shadows Into Light", "cursive"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
