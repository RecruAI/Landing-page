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
				3: "3px",
				10: "10px",
			},
			margin: {
				"20vw": "20vw",
			},
			fontSize: { "2xs": "10px" },
			width: { xlFull: "calc(100vw - 18rem)" },
			animation: {
				"shrink-bounce": "shrink-bounce 200ms cubic-bezier(.4,.0,.23,1)",
				"checkbox-check": "checkbox-check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards",
			},
			transitionTimingFunction: { "bouncy-bezier": "cubic-bezier(.4,.0,.23,1)" },
			keyframes: {
				"shrink-bounce": {
					"0%": {
						transform: "scale(1)",
					},
					"33%": {
						transform: "scale(.85)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				"checkbox-check": {
					"0%": {
						transform: "translate3d(0, 0, 0) rotate(45deg)",
						width: 0,
						height: 0,
						"border-color": "white",
					},
					"33%": {
						height: 0,
						width: "0.5rem",
						transform: "translate3d(0,0,0) rotate(45deg)",
					},
					"100%": {
						height: "0.75rem",
						width: "0.5rem",
						"border-color": "white",
						transform: "translate3d(0, -0.75rem, 0) rotate(45deg)",
					},
				},
			},
		},
	},
	plugins: [],
};
