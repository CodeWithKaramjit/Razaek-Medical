/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Excellence Colors
        surface: '#f7fafc',
        'surface-dim': '#d7dadc',
        'surface-bright': '#f7fafc',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f1f4f6',
        'surface-container': '#ebeef0',
        'surface-container-high': '#e5e9eb',
        'surface-container-highest': '#e0e3e5',
        'on-surface': '#181c1e',
        'on-surface-variant': '#43474e',
        'inverse-surface': '#2d3133',
        'inverse-on-surface': '#eef1f3',
        outline: '#74777f',
        'outline-variant': '#c4c6cf',
        'surface-tint': '#455f88',
        
        primary: {
          DEFAULT: '#002045',
          container: '#1a365d',
          fixed: '#d6e3ff',
          'fixed-dim': '#adc7f7',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#86a0cd',
          fixed: '#001b3c',
          'fixed-variant': '#2d476f',
        },
        'inverse-primary': '#adc7f7',
        
        secondary: {
          DEFAULT: '#13696a',
          container: '#a2eded',
          fixed: '#a5eff0',
          'fixed-dim': '#89d3d4',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#1a6d6e',
          fixed: '#002020',
          'fixed-variant': '#004f50',
        },

        tertiary: {
          DEFAULT: '#1b2127',
          container: '#30363c',
          fixed: '#dde3eb',
          'fixed-dim': '#c1c7cf',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#989fa6',
          fixed: '#161c22',
          'fixed-variant': '#41474e',
        },

        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
        
        background: '#f7fafc',
        'on-background': '#181c1e',
        'surface-variant': '#e0e3e5',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
}
