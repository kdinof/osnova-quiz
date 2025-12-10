import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        osnova: {
          lime: "#CCFF00",
          "lime-hover": "#B8E600",
          dark: "#0A0A0A",
          "dark-green": "#1A1A1A",
          white: "#FFFFFF",
          "gray-50": "#F9FAFB",
          "gray-100": "#F3F4F6",
          "gray-500": "#6B7280",
          "gray-900": "#111827",
        },
        app: {
          bg: "#0A0A0A",
          "card-bg": "#1A1A1A",
          "card-hover": "#242424",
        },
        lime: {
          DEFAULT: "#CCFF00",
          50: "#F5FFE6",
          100: "#EBFFCC",
          200: "#D6FF99",
          300: "#CCFF00",
          400: "#B8E600",
          500: "#A3CC00",
          600: "#8FB300",
          700: "#6B8500",
        },
        track: {
          visual: "hsl(var(--track-visual))",
          builder: "hsl(var(--track-builder))",
          productivity: "hsl(var(--track-productivity))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontSize: {
        hero: ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "lime-glow": "0 0 20px rgba(204, 255, 0, 0.15)",
      },
      backgroundImage: {
        "chart-gradient": "linear-gradient(to right, #CCFF00, #6B8500)",
        "lime-glow": "radial-gradient(circle, rgba(204,255,0,0.15) 0%, transparent 70%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
