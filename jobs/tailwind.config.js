/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#141414",
        blue: "#267dff",
        dimWhite: "#1a1a1a",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        grey: "#383838",
        red: "#ff6676",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
