export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63"
        },
        clinic: {
          500: "#14b8a6",
          600: "#0d9488"
        }
      },
      boxShadow: {
        soft: "0 20px 70px rgba(8, 145, 178, 0.14)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
