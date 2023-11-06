/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7856ff"
      },
      screens: {
        "max-lg": { max: "1200px" },
        "max-med": { max: "765px" },
        "max-md": { max: "658px" },
        "max-small": { max: "500px" },
        "max-sm": { max: "400px" },
      },    },
  },
  plugins: [],
}
