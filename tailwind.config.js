/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emiqen: {
          navy: '#071B3A',
          'navy-dark': '#040F22',
          'navy-light': '#0D274E',
          blue: '#1769F8',
          'blue-hover': '#1056CF',
          cyan: '#00D4E8',
          'cyan-dark': '#00B4C4',
          violet: '#6D28D9',
          'violet-light': '#8B5CF6',
          white: '#FFFFFF',
          'soft-bg': '#F5F8FF',
          'soft-border': '#DCE7F6',
          muted: '#475569',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1769F8 0%, #00D4E8 50%, #6D28D9 100%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(23, 105, 248, 0.18), rgba(0, 212, 232, 0.08), rgba(255, 255, 255, 0))',
        'navy-gradient': 'linear-gradient(180deg, #071B3A 0%, #040F22 100%)',
        'card-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #F5F8FF 100%)',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(7, 27, 58, 0.04), 0 10px 30px rgba(7, 27, 58, 0.05)',
        'elevated': '0 8px 30px rgba(23, 105, 248, 0.12), 0 2px 8px rgba(7, 27, 58, 0.04)',
        'glow-blue': '0 0 35px -5px rgba(23, 105, 248, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 212, 232, 0.35)',
      }
    },
  },
  plugins: [],
}

