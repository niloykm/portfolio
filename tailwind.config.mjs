// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         lightHover: "#fcf4ff",
//         darkHover: "#2a004a",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        surface: "var(--surface)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-fg)",
        },
        muted: {
          DEFAULT: "var(--fg-muted)",
          foreground: "var(--fg-muted)",
          subtle: "var(--bg-subtle)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--fg)",
        },
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-fg)",
        },
        secondary: {
          DEFAULT: "var(--bg-subtle)",
          foreground: "var(--fg)",
        },
        destructive: {
          DEFAULT: "var(--destructive, #ef4444)",
          foreground: "var(--destructive-foreground, #ffffff)",
        },
        input: "var(--border)",
        ring: "var(--accent)",
        // Legacy colors for backward compatibility
        lightHover: "var(--bg-subtle)",
        darkHover: "var(--bg-subtle)",
        darkTheme: "var(--bg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        black: "4px 4px 0 #000",
        white: "4px 4px 0 #fff",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-in": "bounceIn 0.8s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
        "auto-fit-300": "repeat(auto-fit, minmax(300px, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};

export default tailwindConfig;
