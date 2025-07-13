import { plugin } from "twrnc";

/** @type {import('tailwindcss').Config} */
module.exports = {
	//content: []  -- no need to scan files for React Native, twrnc works differently
	theme: {
		extend: {
			colors: {
				good: '#0EBE7F',
				'primary-dark': '#176947',
				'dark': '#333333',
				'soft': '#677294E5',
			},
			fontSize: {
				'xs': '12px',
				'sm-': '.13px',
				'sm': '14px',
				'sm+': '15px',
				'base': '16px',
				'lg': '18px',
				'xl': '20px',
				'2xl': '24px',
				'3xl': '28px',
				'4xl': '32px',
				'5xl': '40px',
				'6xl': '48px',
				heading: '30px',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui'],
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				// 😎 similar to `@apply`
				'.centered': `items-center justify-center`,
				'.container': `px-5`,
			});
		}),
	],
}
