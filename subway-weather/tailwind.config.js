/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        // Custom colors for temperature visualization
        'temp-cold': '#0066cc',
        'temp-cool': '#33ccff',
        'temp-warm': '#ff6633',
        'temp-hot': '#cc0000',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
