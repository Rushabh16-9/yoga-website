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
                // Dopamine Color Palette - Modern Restorative Minimalism
                sage: {
                    50: "#f6f8f6",
                    100: "#e3ebe3",
                    200: "#c7d7c7",
                    300: "#a1bda1",
                    400: "#7a9f7a",
                    500: "#5d8a5d", // Primary sage green
                    600: "#4a6f4a",
                    700: "#3d5a3d",
                    800: "#334933",
                    900: "#2b3d2b",
                },
                terracotta: {
                    50: "#fdf6f4",
                    100: "#f9e8e3",
                    200: "#f4d4c9",
                    300: "#ebb8a5",
                    400: "#e09376",
                    500: "#d67456", // Primary terracotta
                    600: "#c45a3f",
                    700: "#a44834",
                    800: "#873d2f",
                    900: "#6f362a",
                },
                cream: {
                    50: "#fdfcfb",
                    100: "#faf8f5",
                    200: "#f5f1eb",
                    300: "#ede7dd",
                    400: "#e3d9ca",
                    500: "#d9cab7", // Off-white/cream
                    600: "#c4b09a",
                    700: "#a8927a",
                    800: "#8a7762",
                    900: "#726250",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.5s ease-out",
                "scale-in": "scaleIn 0.4s ease-out",
                "float": "float 3s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(93, 138, 93, 0.5)" },
                    "100%": { boxShadow: "0 0 20px rgba(93, 138, 93, 0.8)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            },
        },
    },
    plugins: [],
};

export default config;
