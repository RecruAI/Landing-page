/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				mainColor: '#4D6CFA',
				mainText: '#1E1E1E',
				mediumText: '#2F3136',
				lightText: '#36393F',
				blue: '#007FE0',
				white: '#FFFFFF',
				red: '#F04242',
				green: '#42B380',
				lightGreen: '#44FFD2',
			},
			screens: {
				WQHD: '3840px',
				QHD: '2560px',
				'4xl': '2048px',
				'3xl': '1792px',
				xs: '512px',
				'2xs': '384px',
			},
			borderWidth: {
				1: '1px',
			},
			boxShadow: {
				button: '4px 4px 5px rgba(0, 0, 0, 0.25)',
			},
		},
	},
	plugins: [],
}
