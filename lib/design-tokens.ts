export const colors = {
    sage: {
        50: "#f6f8f6",
        100: "#e3ebe3",
        200: "#c7d7c7",
        300: "#a1bda1",
        400: "#7a9f7a",
        500: "#5d8a5d",
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
        500: "#d67456",
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
        500: "#d9cab7",
        600: "#c4b09a",
        700: "#a8927a",
        800: "#8a7762",
        900: "#726250",
    },
} as const;

export const spacing = {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
} as const;

export const typography = {
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
    },
    fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
    },
} as const;

export const borderRadius = {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
} as const;

export const shadows = {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
} as const;

export const animations = {
    durations: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
        slower: "800ms",
    },
    easings: {
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
} as const;

export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
} as const;
