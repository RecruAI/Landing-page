/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				colorBlue: "rgb(51, 97, 227)",
				colorGray: "rgb(141, 141, 141)",
			},
			screens: {
				QHD: "2560px",
				WQHD: "3840px",
			},
			borderWidth: {
				1: "1px",
			},
			margin: {
				"20vw": "20vw",
			},
		},
	},
	plugins: [],
};
