/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["wireframe", "dark"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};

module.exports = config;
