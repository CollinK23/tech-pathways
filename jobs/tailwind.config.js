/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f4f4fb",
        secondary: "#e1e6eb",
        blue: "#267dff",
        dimWhite: "#EFF4F8",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        grey: "#43474c",
        red: "#d00000",
        pink: "#5c57b7",
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
