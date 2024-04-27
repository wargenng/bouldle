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
            keyframes: {
                pop: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                    "90%": { transform: "translateY(2px)" },
                    "100%": { transform: "translateY(0px)" },
                },
            },
            animation: {
                "pop-option": "pop .4s",
            },
        },
    },
    plugins: [],
};
