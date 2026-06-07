import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Layered dark surfaces for depth
        ink: {
          DEFAULT: "#0A0A0A", // near-black charcoal background
          800: "#141414", // raised panel
          700: "#1C1C1C", // raised panel (lighter)
          600: "#242424", // borders / hairlines on dark
        },
        lime: {
          DEFAULT: "#C6FF00", // electric lime-green primary accent
          dim: "#A6D900",
        },
        bone: "#F5F5F5", // primary off-white text
        ash: "#8A8A8A", // muted secondary text
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(198,255,0,0.0), 0 10px 40px -10px rgba(198,255,0,0.35)",
        "glow-strong":
          "0 0 0 1px rgba(198,255,0,0.0), 0 18px 60px -12px rgba(198,255,0,0.55)",
        panel: "0 24px 60px -24px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "lime-fade":
          "linear-gradient(180deg, rgba(198,255,0,0.08) 0%, rgba(198,255,0,0) 60%)",
        "radial-spot":
          "radial-gradient(60% 50% at 50% 0%, rgba(198,255,0,0.12) 0%, rgba(198,255,0,0) 70%)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0.2" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "0.2" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
