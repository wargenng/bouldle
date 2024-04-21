/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "rgba(var(--background))",
                primary: "rgba(var(--primary))",
            },
        },
    },
    plugins: [],
};
