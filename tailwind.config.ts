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
				'light': '#F9F8F8',
				// Medical color palette

				'medical': {
					'primary': '#5FA6E7',      // Calming blue (between #7EC3F7 and #4A90E2)

					'secondary': '#7ED321',     // Healing green
					'accent': '#F5A623',        // Warm orange
					'neutral': '#F8F9FA',       // Light background
					'surface': '#FFFFFF',       // Card background
					'text': '#2C3E50',          // Dark text
					'text-light': '#7F8C8D',    // Light text
					'border': '#E8ECF0',        // Subtle borders
					'success': '#27AE60',       // Success green
					'warning': '#F39C12',       // Warning orange
					'error': '#E74C3C',         // Error red
				},
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
				sans: ['Inter-Regular', 'system-ui'],
				'inter': ['Inter-Regular', 'system-ui'],
				'inter-medium': ['Inter-Medium', 'system-ui'],
				'inter-semibold': ['Inter-SemiBold', 'system-ui'],
				'inter-bold': ['Inter-Bold', 'system-ui'],
				'poppins': ['Poppins-Regular', 'system-ui'],
				'poppins-medium': ['Poppins-Medium', 'system-ui'],
				'poppins-semibold': ['Poppins-SemiBold', 'system-ui'],
				'poppins-bold': ['Poppins-Bold', 'system-ui'],
				'roboto': ['Roboto-Regular', 'system-ui'],
				'roboto-medium': ['Roboto-Medium', 'system-ui'],
				'roboto-bold': ['Roboto-Bold', 'system-ui'],
				'opensans': ['OpenSans-Regular', 'system-ui'],
				'opensans-semibold': ['OpenSans-SemiBold', 'system-ui'],
				'opensans-bold': ['OpenSans-Bold', 'system-ui'],
				// Medical specific fonts
				'medical-header': ['Poppins-Bold', 'system-ui'],
				'medical-title': ['Poppins-SemiBold', 'system-ui'],
				'medical-body': ['Inter-Regular', 'system-ui'],
				'medical-medium': ['Inter-Medium', 'system-ui'],
				'medical-semibold': ['Inter-SemiBold', 'system-ui'],
				'medical-bold': ['Inter-Bold', 'system-ui'],
				'medical-ui': ['Roboto-Regular', 'system-ui'],
				'medical-ui-medium': ['Roboto-Medium', 'system-ui'],
				'medical-ui-bold': ['Roboto-Bold', 'system-ui'],
			},
			borderRadius: {
				'xl': '16px',
				'2xl': '20px',
				'3xl': '24px',
				'4xl': '32px',
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				// 😎 similar to `@apply`
				'.centered': `items-center justify-center`,
				'.container': `px-5`,
				// Medical app utilities
				'.medical-card': `bg-medical-surface rounded-3xl`,
				'.medical-button': `bg-medical-primary rounded-2xl py-4 px-6`,
				'.medical-header': `bg-medical-primary rounded-b-4xl`,
				'.medical-text': `text-medical-text`,
				'.medical-text-light': `text-medical-text-light`,
				'.medical-safe': `pt-12`,
				// Medical font utilities
				'.font-medical-header': `font-medical-header`,
				'.font-medical-title': `font-medical-title`,
				'.font-medical-body': `font-medical-body`,
				'.font-medical-medium': `font-medical-medium`,
				'.font-medical-semibold': `font-medical-semibold`,
				'.font-medical-bold': `font-medical-bold`,
				'.font-medical-ui': `font-medical-ui`,
				'.font-medical-ui-medium': `font-medical-ui-medium`,
				'.font-medical-ui-bold': `font-medical-ui-bold`,
				// Font weight utilities
				'.font-normal': `font-medical-body`,
				'.font-medium': `font-medical-medium`,
				'.font-semibold': `font-medical-semibold`,
				'.font-bold': `font-medical-bold`,
			});
		}),
	],
}
