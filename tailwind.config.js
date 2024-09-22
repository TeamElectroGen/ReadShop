/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
<<<<<<< HEAD
    extend: {
      colors: {
        // background: "var(--background)", // Default Background
        background: "#f9fafb", // Light Background Color
        foreground: "var(--foreground)", //Default Foreground Color
        primary: "#401E8A", // Deep Violet
        secondary: "#f97316", // Vivid Orange
        accent: "#10b981", // Emerald G
        lightGray: {
          100: "#f9fafb", // Very Light Gray
          200: "#f3f4f6", // Light Gray
          400: "#d1d5db", // Medium Light Gray
          500: "#9ca3af", // Medium Gray
          600: "#6b7280", // Darker Gray
          700: "#4b5563", // Even Darker Gray
          800: "#374151", // Very Dark Gray
          900: "#1f2937",
        },
        mediumGray: {
          500: "#6b7280", // Medium Gray
        },
        darkGray: {
          800: "#1f2937", // Dark Gray
        },
      },

      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Montserrat", "sans-serif"],
        display: ["Shadows Into Light", "cursive"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
=======
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			lightGray: {
  				'100': '#f9fafb',
  				'200': '#f3f4f6',
  				'400': '#d1d5db',
  				'500': '#9ca3af',
  				'600': '#6b7280',
  				'700': '#4b5563',
  				'800': '#374151',
  				'900': '#1f2937'
  			},
  			mediumGray: {
  				'500': '#6b7280'
  			},
  			darkGray: {
  				'800': '#1f2937'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			serif: ["Merriweather", "serif"],
  			sans: ["Montserrat", "sans-serif"],
  			display: ["Shadows Into Light", "cursive"],
  			mono: ["Roboto Mono", "monospace"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
>>>>>>> 8e2a3885272a49de7f766371dc74d00660afbad1
  },
  plugins: [require("tailwindcss-animate")],
};
