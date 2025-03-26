
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
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
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our app
				"cycle-pink": {
					50: "#fff1f6",
					100: "#ffe4ee",
					200: "#ffcadf",
					300: "#ffa0c4",
					400: "#ff6aa0",
					500: "#ff357c",
					600: "#ff1166",
					700: "#df0054",
					800: "#b80047",
					900: "#98043f",
					950: "#560020",
				},
				"cycle-purple": {
					50: "#f5f1ff",
					100: "#ede5ff",
					200: "#dccaff",
					300: "#c3a4ff",
					400: "#a978fc",
					500: "#914cf7",
					600: "#8031ea",
					700: "#6b21cb",
					800: "#591ca4",
					900: "#491b85",
					950: "#2c0e5c",
				},
				"cycle-lavender": {
					50: "#f3f0ff",
					100: "#e9e5ff",
					200: "#d6cfff",
					300: "#b8a8ff",
					400: "#967aff",
					500: "#7a49ff",
					600: "#702cf7",
					700: "#5f20df",
					800: "#4e19b9",
					900: "#411797",
					950: "#260a65",
				},
				"cycle-blue": {
					50: "#f0f7ff",
					100: "#dfedff",
					200: "#c5e0ff",
					300: "#9bcaff",
					400: "#6aadff",
					500: "#488bff",
					600: "#276cff",
					700: "#1b59f5",
					800: "#1846cc",
					900: "#1b3da1",
					950: "#172758",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"fade-out": {
					"0%": {
						opacity: "1",
						transform: "translateY(0)"
					},
					"100%": {
						opacity: "0",
						transform: "translateY(10px)"
					}
				},
				"scale-in": {
					"0%": {
						transform: "scale(0.95)",
						opacity: "0"
					},
					"100%": {
						transform: "scale(1)",
						opacity: "1"
					}
				},
				"scale-out": {
					from: { transform: "scale(1)", opacity: "1" },
					to: { transform: "scale(0.95)", opacity: "0" }
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"slide-out-right": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(100%)" }
				},
				"pulse-subtle": {
					"0%, 100%": { 
						opacity: "1",
						transform: "scale(1)"
					},
					"50%": { 
						opacity: "0.85",
						transform: "scale(1.03)"
					}
				},
				"float": {
					"0%, 100%": { 
						transform: "translateY(0)" 
					},
					"50%": { 
						transform: "translateY(-10px)" 
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				"scale-out": "scale-out 0.3s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"slide-out-right": "slide-out-right 0.3s ease-out",
				"enter": "fade-in 0.5s ease-out, scale-in 0.3s ease-out",
				"exit": "fade-out 0.5s ease-out, scale-out 0.3s ease-out",
				"pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
				"float": "float 6s ease-in-out infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
