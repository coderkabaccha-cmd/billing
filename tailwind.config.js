/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Google Admin color palette
        'google-blue': '#1a73e8',
        'google-blue-hover': '#1765cc',
        'google-blue-light': '#e8f0fe',
        'google-green': '#137333',
        'google-green-light': '#e6f4ea',
        'google-red': '#d93025',
        'google-orange': '#f9ab00',
        'text-primary': '#202124',
        'text-secondary': '#5f6368',
        'text-muted': '#80868b',
        'bg-page': '#f8f9fa',
        'bg-card': '#ffffff',
        'border-default': '#dadce0',
        'border-light': '#e8eaed',
      },
      fontFamily: {
        'google': ["'Google Sans'", "'Roboto'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '14px',
        'md': '16px',
        'lg': '18px',
        'xl': '22px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
      },
      spacing: {
        '18': '72px',
        '65': '260px',
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'dropdown': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
        'elevated': '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
      },
      borderRadius: {
        'pill': '20px',
        'search': '24px',
      },
    },
  },
  plugins: [],
}
