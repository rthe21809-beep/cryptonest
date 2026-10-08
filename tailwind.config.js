/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        ink: { 950: '#070C14', 900: '#0B1220', 800: '#111A2B' },
        pine: { 700: '#1B4450', 600: '#245A68' },
        amber: { glow: '#F5B544', soft: '#FFD79A' },
        pastel: { mint: '#A8E6CF', lavender: '#C7B9FF', peach: '#FFD3B6', sky: '#A8D8EA', blush: '#FFAAA5' }
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,0.28)', glow: '0 12px 40px -12px rgba(245,181,68,0.35)' }
    }
  },
  plugins: []
}
