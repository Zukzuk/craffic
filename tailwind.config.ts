import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'elastic-cards': 'repeat(auto-fit, minmax(140px, max-content))',
      },
      dropShadow: {
        'top': '0 -4px 3px rgb(0 0 0 / 0.07)',
      }
    },
  },
  plugins: [
    function ({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
      addBase({
        '*': { WebkitFontSmoothing: 'auto', MozOsxFontSmoothing: 'auto' },
        'html': { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'antialiased' },
        'body': { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'antialiased' },
      });
    },
  ],
} satisfies Config);