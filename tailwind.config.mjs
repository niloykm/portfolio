/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          bg: "var(--bg-primary)",
          text: "var(--text-primary)",
        },
        bg: {
          DEFAULT: "var(--bg-primary)",
          primary: "var(--bg-primary)",
          sunken: "var(--bg-sunken)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          2: "var(--ink-2)",
        },
        muted: "var(--text-muted)",
        faint: "var(--faint)",
        border: {
          DEFAULT: "var(--border-subtle)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          ink: "var(--accent-ink)",
          soft: "var(--accent-soft)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        ring: "var(--ring)",
      },
      fontFamily: {
        display: ["var(--font-sans)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        none: "0px",
        strict: "var(--radius-strict)",
        tag: "0px",
        sm: "0px",
        control: "0px",
        DEFAULT: "0px",
        md: "0px",
        panel: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      boxShadow: {
        none: "none",
        DEFAULT: "none",
        palette: "none",
      },
      transitionDuration: {
        DEFAULT: "100ms",
      },
      maxWidth: {
        container: "1152px",
        measure: "64ch",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default tailwindConfig;
