import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F06292', // Cor principal usada no cabeçalho
        secondary: '#BA68C8',
        accent: '#9575CD',
      },
    },
  },
  plugins: [],
};
export default config;
