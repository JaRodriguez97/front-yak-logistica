/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand: YAK Orange
        primary: '#fa5409',
        'on-primary': '#ffffff',
        'primary-container': '#d14300',
        'on-primary-container': '#fffbff',
        'inverse-primary': '#ffb59d',
        'primary-fixed': '#ffdbd0',
        'primary-fixed-dim': '#ffb59d',
        'on-primary-fixed': '#390c00',
        'on-primary-fixed-variant': '#832700',
        'surface-tint': '#ab3500',
        // Secondary
        secondary: '#5d5e61',
        'on-secondary': '#ffffff',
        'secondary-container': '#e2e2e5',
        'on-secondary-container': '#636467',
        'secondary-fixed': '#e2e2e5',
        'secondary-fixed-dim': '#c6c6c9',
        'on-secondary-fixed': '#1a1c1e',
        'on-secondary-fixed-variant': '#454749',
        // Tertiary
        tertiary: '#595c5f',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#727578',
        'on-tertiary-container': '#fbfcff',
        'tertiary-fixed': '#e0e3e6',
        'tertiary-fixed-dim': '#c4c7ca',
        'on-tertiary-fixed': '#191c1e',
        'on-tertiary-fixed-variant': '#44474a',
        // Surface
        surface: '#f9f9ff',
        'surface-dim': '#d0daf2',
        'surface-bright': '#f9f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f0f3ff',
        'surface-container': '#e8eeff',
        'surface-container-high': '#dfe8ff',
        'surface-container-highest': '#d9e3fb',
        'surface-variant': '#d9e3fb',
        'on-surface': '#111c2d',
        'on-surface-variant': '#362621',
        'inverse-surface': '#273143',
        'inverse-on-surface': '#ecf0ff',
        // Background
        background: '#f9f9ff',
        'on-background': '#111c2d',
        // Outline
        outline: '#907066',
        'outline-variant': '#e4beb2',
        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        unit: '8px',
        gutter: '24px',
        'margin-mobile': '16px',
        'margin-desktop': '64px',
        'bento-gap': '24px',
      },
      fontFamily: {
        'headline-xl': ['Montserrat', 'sans-serif'],
        'headline-lg': ['Montserrat', 'sans-serif'],
        'headline-lg-mobile': ['Montserrat', 'sans-serif'],
        'headline-md': ['Montserrat', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': [
          '48px',
          { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'headline-lg': [
          '32px',
          { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        'headline-lg-mobile': [
          '24px',
          { lineHeight: '32px', fontWeight: '700' },
        ],
        'headline-md': [
          '24px',
          { lineHeight: '32px', fontWeight: '600' },
        ],
        'body-lg': [
          '18px',
          { lineHeight: '28px', fontWeight: '400' },
        ],
        'body-md': [
          '16px',
          { lineHeight: '24px', fontWeight: '400' },
        ],
        'label-sm': [
          '14px',
          { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' },
        ],
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
    },
  },
  plugins: [],
};
