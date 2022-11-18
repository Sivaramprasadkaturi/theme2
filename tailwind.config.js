module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "main-seconday": "#f7f7f7",
        "main-primary": "#cc1821"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
