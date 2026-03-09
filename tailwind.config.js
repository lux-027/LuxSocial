/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lux-purple': '#6716DF',
        'lux-purple-light': '#8B3ADF',
        'lux-purple-dark': '#5512B3',
        'lux-plum': '#F3E8FF',
        'lux-plum-light': '#FAF5FF',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #6716DF 0%, #BE16DF 100%)',
        'gradient-purple-wave': 'linear-gradient(270deg, #6716DF, #8B3ADF, #BE16DF, #F3E8FF)',
      },
      animation: {
        'gradient-wave': 'gradientWave 8s ease infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        gradientWave: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
