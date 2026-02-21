// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserratAlt: ["Montserrat Alternates", "sans-serif"],
    },
  },
  plugins: [nextui()],
};

