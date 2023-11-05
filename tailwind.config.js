const { blackA, green, mauve, violet, blue } = require("@radix-ui/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
      body: "Poppins",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#00ADEF",
        secondary: "#54bbe4d2",
        tertiary: "#000000",
        ...blackA,
        ...green,
        ...mauve,
        ...violet,
        ...blue,
      },
    },
  },
  plugins: [],
};
