import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import UtilitiesContainer from "./utilitiesContainer";
import StartButton from "../startButton";

export default function SectionOne(props: { font: NextFont }) {
	return (
		<section className="px-10 md:px-20 lg:px-24 xl:px-32 w-screen relative gap-y-8 pb-40 pt-28 md:pt-32 lg:py-40 bg-gradient-to-br text-center justify-center items-center flex flex-col from-[--background-rgb] to-[--background-rgb-darker] ">
			<h1 className={"m-0 text-[--text-rgb] text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wider " + props.font.className}>
				Get it done for REAL with <br className="hidden lg:block" />
				Powerful To-do list
			</h1>
			<p className="text-colorGray text-md md:text-lg lg:text-xl xl:text-2xl">
				Become focused, organized, and calm with DoIt. <br className="hidden lg:block" />
				Top #1 task manager and to-do list app in the world.
			</p>

			<StartButton />

			<div className="overflow-hidden bg-gradient-to-b from-transparent  to-[--background-rgb-darker] rounded-3xl border-b-1 px-8 md:px-12 lg:px-16 xl:px-20 border-colorGray/30 ">
				<picture>
					<source srcSet="/landing_page/images/SectionOneDark-Mobile.png" media="(hover: none) and (pointer: coarse) and (prefers-color-scheme: dark)" />
					<source srcSet="/landing_page/images/SectionOneLight-Mobile.png" media="(hover: none) and (pointer: coarse) and (prefers-color-scheme: light)" />
					<source srcSet="/landing_page/images/SectionOneDark.png" media="(prefers-color-scheme: dark)" />
					<source srcSet="/landing_page/images/SectionOneLight.png" media="(prefers-color-scheme: light)" />
					<Image src="" width="1300" height="1000" alt="Web app image" className="mt-20 drop-shadow-2xl rounded-t-3xl" />
				</picture>
			</div>
			<UtilitiesContainer font={props.font} />
		</section>
	);
}
