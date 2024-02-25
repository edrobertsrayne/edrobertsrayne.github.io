/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hugo_stats.json"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      heading: ["Signika", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#8839ef",
          secondary: "04a5e5",
          accent: "#ea76cb",
          neutral: "#7c7f93",
          "base-100": "#eff1f5",
          "base-200": "#e6e9ef",
          "base-300": "#dce0e8",
          info: "#1e66f5",
          success: "#40a02b",
          warning: "#df8e1d",
          error: "#d20f39",
        },
      },
      {
        dark: {
          primary: "#cba6f7",
          secondary: "#89dceb",
          accent: "#f5c2ef",
          neutral: "#313244",
          "neutral-content": "#000000",
          "accent-content": "#11111b",
          "base-100": "#1e1e2e",
          info: "#89b4fa",
          success: "#a6e3a1",
          warning: "#f9e2af",
          error: "#f38ba8",
        },
      },
    ],
  },
};
