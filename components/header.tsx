import { NextFont } from "next/dist/compiled/@next/font";
import { Prompt } from 'next/font/google'
import Image from "next/image";

const PromptFont600 = Prompt({
	weight: '600',
	subsets: ['latin'],
})

export default function Header(props: { font: NextFont }) {
	return (
		<header className="responsiveWidth fixed left-1/2 z-30 flex -translate-x-1/2 content-center items-center justify-between px-7 py-3 backdrop-blur-md sm:py-5 md:px-10 lg:px-16">
			<Image src="/Icon-Light.svg" width="150" height="0" alt="Logo image" className="-translate-x-1/4 scale-50 md:-translate-x-0 md:scale-75 lg:scale-100" />

			<div className={`${PromptFont600.className} flex items-center gap-x-5`}>
				<button className={'h-fit text-sm tracking-wider text-mainColor md:text-lg lg:text-xl'}>Newsletter</button>
			</div>
		</header>
	)
}
