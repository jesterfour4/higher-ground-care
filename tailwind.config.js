/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        app: 'hsl(180 33% 98%)',      // Light background
        'app-ink': 'hsl(210 25% 12%)', // Dark text
        'app-muted': 'hsl(210 10% 35%)', // Muted text
        'app-line': 'hsl(200 20% 90%)', // Light borders
        'app-soft': 'hsl(180 33% 96%)', // Soft backgrounds
        pink: 'hsl(340 70% 78%)',       // Pink accent
        orange: 'hsl(28 80% 76%)',      // Orange accent
        green: 'hsl(142 45% 68%)',      // Green accent
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 