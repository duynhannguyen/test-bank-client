/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Grandstander: ['Grandstander', 'cursive']
      },
      boxShadow: {
        'input-blue': '0 0 0 1px rgba(5,145,255,.1)',
        'input-red': '0 0 0 1px rgba(255,38,5,.08)',
        'user-profile': '0 1px 2px 0 rgba(0,0,0,0.2), 0 0 1px 0 rgba(0,0,0,0.2)',
        'as-card': '0px 1px 1px #091e4240, 0px 0px 1px #091e424f'
      },
      animation: {
        'head-section-bg-fade-in': 'fade-in 2s ease-in-out',
        'get-code-success-bg-fade-in': 'fade-in 1s ease-in-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' }
        }
      },
      backgroundImage: {
        banner: 'url(../../../assets/bannerBackground/bannerbg.jpg)'
      }
    }
  },
  variants: {
    extend: { opacity: ['disabled'] }
  },
  plugins: ['@tailwindcss/forms'],
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false
  }
};
