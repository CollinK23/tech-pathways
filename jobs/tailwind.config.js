/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1f1f22",
        secondary: "#292930",
        blue: "#267dff",
        dimWhite: "#1a1a1a",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        grey: "#282930",
        red: "#ff6676",
        darkGrey: "#131315",
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
