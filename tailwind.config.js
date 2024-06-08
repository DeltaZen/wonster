module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 714px)' },
        xshort: { raw: '(max-height: 624px)' },
        xxshort: { raw: '(max-height: 540px)' },
      },
      colors: {
        'correct': '#99c23e',
        'present': '#6646cc',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
