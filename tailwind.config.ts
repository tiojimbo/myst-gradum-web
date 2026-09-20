import type { Config } from "tailwindcss";

/**
 * Espelha os tokens de .claude/design-system/gradum-design-system.dc.html, secao 19.
 * Toda cor, medida e sombra aqui aponta para a custom property definida em globals.css:
 * o token e a fonte, o Tailwind e so o atalho.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: "var(--gr-graphite-50)",
          100: "var(--gr-graphite-100)",
          200: "var(--gr-graphite-200)",
          300: "var(--gr-graphite-300)",
          400: "var(--gr-graphite-400)",
          500: "var(--gr-graphite-500)",
          600: "var(--gr-graphite-600)",
          700: "var(--gr-graphite-700)",
          800: "var(--gr-graphite-800)",
          900: "var(--gr-graphite-900)",
        },
        blue: {
          50: "var(--gr-blue-50)",
          100: "var(--gr-blue-100)",
          200: "var(--gr-blue-200)",
          300: "var(--gr-blue-300)",
          400: "var(--gr-blue-400)",
          500: "var(--gr-blue-500)",
          600: "var(--gr-blue-600)",
          700: "var(--gr-blue-700)",
          800: "var(--gr-blue-800)",
          900: "var(--gr-blue-900)",
        },
        success: "var(--gr-success)",
        warning: "var(--gr-warning)",
        danger: "var(--gr-danger)",
        info: "var(--gr-info)",
        bg: "var(--gr-bg)",
        "bg-app": "var(--gr-bg-app)",
        surface: "var(--gr-surface)",
        "surface-muted": "var(--gr-surface-muted)",
        border: "var(--gr-border)",
        text: "var(--gr-text)",
        "text-secondary": "var(--gr-text-secondary)",
        action: "var(--gr-action)",
        "action-hover": "var(--gr-action-hover)",
        "action-soft": "var(--gr-action-soft)",
        "on-action": "var(--gr-on-action)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        display: ["var(--gr-text-display-size)", { lineHeight: "1.05" }],
        h1: ["var(--gr-text-h1-size)", { lineHeight: "1.15" }],
        h2: ["var(--gr-text-h2-size)", { lineHeight: "1.2" }],
        h3: ["var(--gr-text-h3-size)", { lineHeight: "1.3" }],
        "body-lg": ["var(--gr-text-body-lg-size)", { lineHeight: "1.6" }],
        body: ["var(--gr-text-body-size)", { lineHeight: "1.6" }],
        sm: ["var(--gr-text-sm-size)", { lineHeight: "1.5" }],
        overline: ["var(--gr-text-overline-size)", { lineHeight: "1.4" }],
      },
      spacing: {
        1: "var(--gr-space-1)",
        2: "var(--gr-space-2)",
        3: "var(--gr-space-3)",
        4: "var(--gr-space-4)",
        5: "var(--gr-space-5)",
        6: "var(--gr-space-6)",
        7: "var(--gr-space-7)",
        8: "var(--gr-space-8)",
      },
      borderRadius: {
        sm: "var(--gr-radius-sm)",
        md: "var(--gr-radius-md)",
        lg: "var(--gr-radius-lg)",
        xl: "var(--gr-radius-xl)",
        full: "var(--gr-radius-full)",
      },
      boxShadow: {
        sm: "var(--gr-shadow-sm)",
        md: "var(--gr-shadow-md)",
        lg: "var(--gr-shadow-lg)",
        action: "var(--gr-shadow-action)",
        focus: "var(--gr-focus-ring)",
      },
      transitionTimingFunction: {
        gradum: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      transitionDuration: {
        fast: "var(--gr-duration-fast)",
        base: "var(--gr-duration-base)",
        slow: "var(--gr-duration-slow)",
      },
      maxWidth: {
        shell: "1180px",
      },
      screens: {
        sm: "640px",
        md: "900px",
        lg: "1200px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
