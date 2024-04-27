/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "rgba(var(--background))",
                "list-background": "rgba(var(--list-background))",
                primary: "rgba(var(--primary))",
                warn: "rgba(var(--warn))",
                absent: "rgba(var(--absent))",
            },
            transitionProperty: {
                dimensions: "height, width",
                animation: "transform, opacity",
            },
        },
    },
    plugins: [],
};
