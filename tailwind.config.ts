import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
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
        // Custom game colors with increased opacity/visibility
        game: {
          background: "#f8f9ff",
          x: "#4a78ff", // Darker blue
          "x-light": "#d1e0ff", // More visible light blue
          o: "#ff6a8e", // Darker pink
          "o-light": "#ffd6e0", // More visible light pink
          active: "#fff8e6",
          "active-border": "#ffd88a",
          neutral: "#f0f2f5",
          "neutral-border": "#dde1e7",
        },
        // Ocean theme colors
        ocean: {
          deep: "#001440",
          medium: "#003580",
          light: "#0077cc",
          surface: "#e0f7ff",
          coral: "#ff7f50",
          teal: "#20b2aa",
          sand: "#f5deb3",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.7" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        wave: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0)" },
        },
        swim: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(10px) translateY(-5px)" },
          "50%": { transform: "translateX(20px) translateY(0)" },
          "75%": { transform: "translateX(10px) translateY(5px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        ripple: "ripple 0.8s ease-out",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
        swim: "swim 8s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
