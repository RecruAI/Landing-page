import { Prompt } from 'next/font/google'

const PromptFont600 = Prompt({
	weight: '600',
	subsets: ['latin'],
})
export default function NewsletterButton() {
	return (
		<button
			className={`${PromptFont600.className} text-md z-10 w-fit rounded-xl bg-mainColor px-6 py-4 font-medium tracking-wide text-white shadow-button sm:px-7 md:text-lg`}
		>
			Sign up for newsletter
		</button>
	)
}
