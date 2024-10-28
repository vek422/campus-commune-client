/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Oswald", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        "accent-rosewater": "hsl(6, 45%, 91%)",
        "accent-flamingo": "hsl(0, 59%, 86%)",
        "accent-pink": "hsl(320, 71%, 86%)",
        "accent-mauve": "hsl(264, 83%, 81%)",
        "accent-red": "hsl(354, 76%, 75%)",
        "accent-maroon": "hsl(350, 62%, 77%)",
        "accent-peach": "hsl(30, 92%, 75%)",
        "accent-yellow": "hsl(48, 87%, 83%)",
        "accent-green": "hsl(120, 49%, 76%)",
        "accent-teal": "hsl(168, 57%, 74%)",
        "accent-sky": "hsl(192, 70%, 73%)",
        "accent-sapphire": "hsl(198, 69%, 69%)",
        "accent-blue": "hsl(220, 88%, 80%)",
        "accent-lavender": "hsl(228, 87%, 90%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
