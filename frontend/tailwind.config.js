/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F172A', // Slate 900
                    light: '#334155', // Slate 700
                    dark: '#020617', // Slate 950
                },
                secondary: '#64748B', // Slate 500
                accent: '#0EA5E9', // Sky 500
                neutral: {
                    100: '#F1F5F9', // Slate 100
                    200: '#E2E8F0', // Slate 200
                    800: '#1E293B', // Slate 800
                    900: '#0F172A', // Slate 900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
