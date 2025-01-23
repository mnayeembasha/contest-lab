/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-layer-1": "rgb(40,40,40)",
        "dark-layer-2": "rgb(26,26,26)",
        "dark-label-2": "rgba(239, 241, 246, 0.75)",
        "dark-divider-border-2": "rgb(61, 61, 61)",
        "dark-fill-2": "hsla(0,0%,100%,.14)",
        "dark-fill-3": "hsla(0,0%,100%,.1)",
        "dark-gray-6": "rgb(138, 138, 138)",
        "dark-gray-7": "rgb(179, 179, 179)",
        "gray-8": "rgb(38, 38, 38)",
        "dark-gray-8": "rgb(219, 219, 219)",
        "brand-orange": "rgb(255 161 22)",
        "brand-orange-s": "rgb(193, 122, 15)",
        "dark-yellow": "rgb(255 192 30)",
        "dark-pink": "rgb(255 55 95)",
        olive: "rgb(0, 184, 163)",
        "dark-green-s": "rgb(44 187 93)",
        "dark-blue-s": "rgb(10 132 255)",

        // "dark-layer-1": "rgb(30, 30, 40)", // Slightly deeper and cooler slate-like shade
        // "dark-layer-2": "rgb(20, 20, 30)", // Darker slate shade for deeper backgrounds
        // "dark-label-2": "rgba(220, 223, 230, 0.75)", // Softer light gray for text
        // "dark-divider-border-2": "rgb(50, 50, 60)", // Subtle slate-gray divider
        // "dark-fill-2": "hsla(0, 0%, 100%, 0.18)", // Slightly brighter fill
        // "dark-fill-3": "hsla(0, 0%, 100%, 0.12)", // Muted fill for components
        // "dark-gray-6": "rgb(120, 120, 140)", // Cool gray for less contrast
        // "dark-gray-7": "rgb(160, 160, 180)", // Slightly lighter for better readability
        // "gray-8": "rgb(48, 48, 58)", // Deeper slate for neutral elements
        // "dark-gray-8": "rgb(200, 200, 220)", // Softer light gray
        // "brand-orange": "rgb(255, 150, 20)", // Muted orange for highlights
        // "brand-orange-s": "rgb(190, 115, 10)", // Softer secondary orange
        // "dark-yellow": "rgb(245, 185, 25)", // Warm yellow with a hint of slate harmony
        // "dark-pink": "rgb(245, 65, 105)", // Slightly desaturated pink
        // olive: "rgb(0, 170, 150)", // Muted olive green
        // "dark-green-s": "rgb(40, 170, 85)", // Softer dark green for accents
        // "dark-blue-s": "rgb(15, 115, 240)", // Muted blue for better blending with slate
      },
    },
  },
  plugins: [],
};
