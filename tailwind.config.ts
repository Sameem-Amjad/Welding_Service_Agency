import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: "#ff6b00",
                    orangeHover: "#e66000",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                heading: ['var(--font-oswald)', 'sans-serif'],
            }
        },
    },
    plugins: [],
};
export default config;