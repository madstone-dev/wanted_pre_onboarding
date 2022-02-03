module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        "15px": "15px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
