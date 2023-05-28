import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import StartButton from "../startButton";

export default function SectionSix(props: { font: NextFont }) {
	return (
		<section className="bg-[--background-rgb] border-1 border-colorGray rounded-3xl translate-y-28 lg:translate-y-32 xl:translate-y-36 md:p-12 xl:py-16 xl:px-20 2xl:px-24 2xl:py-20 w-full flex flex-col xl:items-center xl:flex-row justify-between p-6 sm:p-10 overflow-hidden ">
			<div className="flex flex-col items-center text-start gap-y-5 sm:gap-y-6 xl:gap-y-8 lg:items-start">
				<span className="text-sm sm:text-xl bg-[#F9F1EC] text-[#C3995D] w-fit font-medium px-3 py-1 rounded-md me-auto">Get started</span>
				<h3 className={"text-[--text-rgb] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl w-full " + props.font.className}>
					Achieve peace of mind with Do It
				</h3>
				<p className="mb-5 text-sm text-justify text-colorGray sm:text-lg">
					Become focused, organized, and calm with Do It. Top #1 task manager and to-do list app in the world.
				</p>
				<StartButton />
			</div>
			<picture className="hidden xl:translate-x-1/4 lg:block xl:translate-y-16 2xl:translate-y-20">
				<source srcSet="/landing_page/images/SectionSixDark.png" media="(prefers-color-scheme: dark)" />
				<source srcSet="/landing_page/images/SectionSixLight.png" media="(prefers-color-scheme: light)" />
				<Image src="" width="1300" height="1000" alt="Web app image" className="mt-16 xl:mt-0 drop-shadow-2xl rounded-3xl xl:rounded-none xl:rounded-tl-3xl" />
			</picture>
		</section>
	);
}
