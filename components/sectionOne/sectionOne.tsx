import NewsletterButton from "@/components/startButton";
import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import UtilitiesContainer from "./utilitiesContainer";

export default function SectionOne(props: { font: NextFont }) {
	return (
		<section className="relative flex w-screen flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-[--background-rgb] to-[--background-rgb-darker] px-10 pb-40 pt-28 text-center md:px-20 md:pt-32 lg:px-24 lg:py-40 xl:px-32">
			<h1 className={'m-0 text-4xl tracking-wider text-[--text-rgb] md:text-5xl lg:text-6xl xl:text-7xl ' + props.font.className}>
				Lorem ipsum, <br className="hidden lg:block" />
				dolor sit amet adipisicing.
			</h1>
			<p className="text-md text-colorGray md:text-lg lg:text-xl xl:text-2xl">
				Lorem ipsum dolor sit amet. <br className="hidden lg:block" />
				Lorem ipsum dolor sit amet consectetur.
			</p>

			<NewsletterButton />

			<div className="overflow-hidden rounded-3xl border-b-1 border-colorGray/30 bg-gradient-to-b from-transparent to-[--background-rgb-darker] px-8 md:px-12 lg:px-16 xl:px-20">
				<picture>
					<source srcSet="/images/SectionOneLight-Mobile.png" media="(hover: none) and (pointer: coarse) and (prefers-color-scheme: light)" />
					<Image src="/images/SectionOneLight.png" width="1300" height="1000" alt="Web app image" className="mt-20 rounded-t-3xl drop-shadow-2xl" />
				</picture>
			</div>
			<UtilitiesContainer font={props.font} />
		</section>
	)
}
