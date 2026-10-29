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
        bg: {
          DEFAULT: "var(--bg)",
          sunken: "var(--bg-sunken)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
        },
        muted: "var(--muted)",
        faint: "var(--faint)",
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          ink: "var(--accent-ink)",
          soft: "var(--accent-soft)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        ring: "var(--ring)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        none: "0px",
        tag: "2px",
        sm: "2px",
        control: "6px",
        DEFAULT: "6px",
        md: "6px",
        panel: "10px",
        lg: "10px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        palette: "0 8px 40px -12px rgb(0 0 0 / .35)",
      },
      maxWidth: {
        container: "1200px",
        measure: "62ch",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default tailwindConfig;
