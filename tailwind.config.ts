
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,         // Center the content horizontally within the container
      padding: "2rem",      // Apply 2rem (32px) padding on all sides of the container
      screens: {            // Define screen-specific maximum width for the container
        "2xl": "1400px",    // For screens larger than 2xl (1400px), set the maximum width to 1400px
      },
    },
    extend: {
      colors: {
        primary: {          // Custom primary colors
          500: "#FF7000",   // Main primary color
          100: "#FFF1E6",   // Lighter shade of primary color
        },
        dark: {             // Custom dark theme colors
          100: "#000000",   // Black
          200: "#0F1117",   // Dark background
          300: "#151821",   // Darker background
          400: "#212734",   // Very dark background
          500: "#101012",   // Main dark color
        },
        // light: {            // Custom light theme colors
        //   400: "#858EAD",   // Lighter shade of primary light color
        //   500: "#7B8EC8",   // Main light color
        //   700: "#DCE3F1",   // Darker shade of primary light color
        //   850: "#FDFDFD",   // Very light shade of primary light color
        //   800: "#F4F6F8",   // Background color for light theme
        //   900: "#FFFFFF",   // White
        // },
        light: {
          400: "#858EAD",
          500: "#7B8EC8",
          700: "#DCE3F1",
          800: "#F4F6F8",
          850: "#FDFDFD",
          900: "#E9EBED",
          950: "#FFFFFF",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        spaceGrotesk: ["var(--font-spaceGrotesk)"],
      },
      boxShadow: {
        // Light theme box shadow configurations
        "light-100": "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",

        // Dark theme box shadow configurations
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
        "dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
      },
      backgroundImage: {
        "auth-dark": "url('/assets/images/auth-dark.png')",
        "auth-light": "url('/assets/images/auth-light.png')",
      },
      screens: {
        xs: "420px",  // Custom screen size definition for extra small screens
      },
      keyframes: {
        'accordion-down': {
          from: { height: "0" },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config;

