import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import UtilitiesContainer from "./utilitiesContainer";
import Button from "./button";

export default function SectionOne(props: { font: NextFont }) {
	return (
		<section className="px-10 md:px-20 lg:px-24 xl:px-32 w-screen relative gap-y-8 py-40 bg-gradient-to-br text-center justify-center items-center flex flex-col from-[--background-rgb] to-[--background-rgb-darker] ">
			<h1 className={"m-0 text-[--text-rgb] text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wider " + props.font.className}>
				Get it done for REAL with <br className="hidden lg:block" />
				Powerful To-do list
			</h1>
			<p className="text-colorGray text-md md:text-lg lg:text-xl xl:text-2xl">
				Become focused, organized, and calm with DoIt. <br className="hidden lg:block" />
				Top #1 task manager and to-do list app in the world.
			</p>

			<Button />

			<picture>
				<source srcSet="/landing_page/images/SectionOneDark.png" media="(prefers-color-scheme: dark)" />
				<Image src="/landing_page/images/SectionOneLight.png" width="1300" height="1000" alt="Web app image" className="mt-20 rounded-xl drop-shadow-2xl" />
			</picture>

			<UtilitiesContainer font={props.font} />
		</section>
	);
}
