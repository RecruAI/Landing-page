import NewsletterButton from '@/components/startButton'
import { Prompt } from 'next/font/google'

const PromptFont700 = Prompt({
	weight: '700',
	subsets: ['latin'],
})
const PromptFont400 = Prompt({
	weight: '400',
	subsets: ['latin'],
})

export default function SectionOne() {
	return (
		<section className="relative flex h-screen w-screen flex-col items-center justify-center gap-y-16 px-10 pb-40 pt-28 text-center md:px-20 md:pt-32 lg:px-24 lg:py-40 xl:px-32">
			<h1
				className={`${PromptFont700.className} z-10 m-0 bg-gradient-to-b from-mainText via-mainText via-70% to-lightText/30 bg-clip-text py-2 text-8xl tracking-wide text-transparent`}
			>
				Lorem ipsum a adipisicing
			</h1>

			<p className={`${PromptFont400.className} text-md text z-10 text-3xl leading-relaxed text-mediumText`}>
				Used by some of the world's largest companies, you to create 
				<br className="hidden lg:block" />
				<b className="text-mainColor">high-quality applications </b>
				with the power of components.
			</p>

			<br />

			<NewsletterButton />

			<div className="absolute top-0 z-0 h-screen w-screen blur-[90px]">
				<div className="absolute left-[85%] top-[35%] -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mainColor"></div>
				<div className="absolute left-[20%] top-[65%] -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lightGreen"></div>
			</div>
		</section>
	)
}
