import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import UtilitiesContainer from "./utilitiesContainer";
import StartButton from "../startButton";

export default function SectionOne(props: { font: NextFont }) {
	return (
		<section className="relative flex w-screen flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-[--background-rgb] to-[--background-rgb-darker] px-10 pb-40 pt-28 text-center md:px-20 md:pt-32 lg:px-24 lg:py-40 xl:px-32">
			<h1 className={"m-0 text-4xl tracking-wider text-[--text-rgb] md:text-5xl lg:text-6xl xl:text-7xl " + props.font.className}>
				Get it done for REAL with <br className="hidden lg:block" />
				Powerful To-do list
			</h1>
			<p className="text-md text-colorGray md:text-lg lg:text-xl xl:text-2xl">
				Become focused, organized, and calm with DoIt. <br className="hidden lg:block" />
				Top #1 task manager and to-do list app in the world.
			</p>

			<StartButton />

			<div className="overflow-hidden rounded-3xl border-b-1 border-colorGray/30 bg-gradient-to-b from-transparent to-[--background-rgb-darker] px-8 md:px-12 lg:px-16 xl:px-20">
				<picture>
					<source srcSet="/landing_page/images/SectionOneDark-Mobile.png" media="(hover: none) and (pointer: coarse) and (prefers-color-scheme: dark)" />
					<source srcSet="/landing_page/images/SectionOneLight-Mobile.png" media="(hover: none) and (pointer: coarse) and (prefers-color-scheme: light)" />
					<source srcSet="/landing_page/images/SectionOneDark.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionOneLight.png" width="1300" height="1000" alt="Web app image" className="mt-20 rounded-t-3xl drop-shadow-2xl" />
				</picture>
			</div>
			<UtilitiesContainer font={props.font} />
		</section>
	);
}
