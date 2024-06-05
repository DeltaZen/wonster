module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 700px)' },
        xshort: { raw: '(max-height: 600px)' },
        xxshort: { raw: '(max-height: 500px)' },
      },
      colors: {
        'correct': '#99c23e',
        'present': '#6646cc',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
