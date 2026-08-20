/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary brand: YAK Orange
        primary: "#fd511f",
        "on-primary": "#ffffff",
        "primary-container": "#e04308",
        "on-primary-container": "#ffffff",
        "inverse-primary": "#ffb59d",
        "primary-fixed": "#ffdbd0",
        "primary-fixed-dim": "#ffb59d",
        "on-primary-fixed": "#390c00",
        "on-primary-fixed-variant": "#832700",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        unit: "8px",
        gutter: "24px",
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        "bento-gap": "24px",
      },
      fontFamily: {
        "headline-xl": ["Montserrat", "sans-serif"],
        "headline-lg": ["Montserrat", "sans-serif"],
        "headline-lg-mobile": ["Montserrat", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
      },
      fontSize: {
        "headline-xl": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "headline-lg-mobile": [
          "24px",
          { lineHeight: "32px", fontWeight: "700" },
        ],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-sm": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" },
        ],
      },
      maxWidth: {
        "screen-2xl": "1440px",
      },
    },
  },
  plugins: [],
};
