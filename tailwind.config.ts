import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jersey: ['jersey_15', 'sans-serif'],
        poppins: ['Poppins', 'Tofu'],
      },
    },
    screens: {
      'sm': '640px',  // Small screens (phones)
      'md': '768px',  // Medium screens (tablets)
      'lg': '1024px', // Large screens (laptops)
      'xl': '1280px', // Extra large screens (desktops)
      '2xl': '1536px', // 2x extra large screens
    },
  },
  plugins: [],
} satisfies Config;
