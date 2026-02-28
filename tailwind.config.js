/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display', serif"],
        body: ["'Lato', sans-serif"],
        script: ["'Dancing Script', cursive"],
      },
      colors: {
        rose: {
          950: "#29010d",
        },
      },
    },
  },
  animation: {
    float: "float 6s ease-in-out infinite",
    "fade-in": "fade-in 1.2s ease forwards",
    "slide-up": "slide-up 0.8s ease forwards",
    "pulse-slow": "pulse 3s ease-in-out infinite",
    "spin-slow": "spin 20s linear infinite",
  },
  keyframes: {
    float: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-20px)" },
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  },
  slideUp: {
    from: { opacity: "0", transform: "translateY(40px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  plugins: []
};
