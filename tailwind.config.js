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
        primary: "#0a433d",
        secondary: "#266f68",
        tertiary: "#000000",
      },
    },
  },
  plugins: [],
};
