import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
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
  		dropShadow: {
  			'text-white': '0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			lexend: ["var(--font-lexend)"],
  			bricolage: ["var(--font-bricolage)"],
  			poppins: ["var(--font-poppins)"]
  		},
  		backgroundImage: {
  			'blue-gradient-radial': 'radial-gradient(circle, #3E3183, #3B47BC)',
  			'green-gradient': 'radial-gradient(61.94% 48.96% at 49.96% 96.22%, #04C782 0%, #18D3A7 100%)',
  			'conic-blue': 'conic-gradient(from 177deg at 39.85% 40.01%, #00326C 262.9855942726135deg, #0B162D 319.3100953102112deg)',
  			'conic-purple': 'conic-gradient(from 114deg at 19.44% 28.89%, #110F22 0deg, #443D88 360deg)',
			'light-blue': 'linear-gradient(90deg, rgba(116, 163, 255, 0.30) 0.05%, #FFF 141.48%)'
  		},
  		boxShadow: {
  			'custom-inset': '0px 2.676px 3.842px -2.47px rgba(116, 163, 255, 0.30) inset, 0px 0.48px 0.755px -0.274px #FFF inset, 0px -5.626px 4.665px -4.391px rgba(96, 68, 144, 0.30) inset, 0px 6.724px 6.861px -3.293px rgba(202, 172, 255, 0.30) inset, 0px 0.274px 1.235px 2.058px rgba(154, 146, 210, 0.25) inset, 0px 0.069px 2.744px 0px rgba(227, 222, 255, 0.20) inset',
  			'custom-shadow-green-button': '0px 1.305px 81.553px 0px #D9E6FE, 0px 0px 0px 14.353px rgba(255, 255, 255, 0.07), 0px -1.305px 0px 3.262px rgba(0, 0, 0, 0.20) inset, 0px 1.305px 0px 3.262px rgba(255, 255, 255, 0.40) inset',
  			'custom-shadow-blue-button': '0px 1.079px 67.417px 0px #D9E6FE, 0px 0px 0px 11.865px rgba(255, 255, 255, 0.07), 0px -1.079px 0px 2.697px rgba(0, 0, 0, 0.20) inset, 0px 1.079px 0px 2.697px rgba(255, 255, 255, 0.40) inset'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
