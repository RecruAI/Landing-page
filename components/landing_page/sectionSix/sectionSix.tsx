import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import StartButton from "../startButton";

export default function SectionSix(props: { font: NextFont }) {
	return (
		<section className="flex w-full translate-y-28 flex-col justify-between overflow-hidden rounded-3xl border-1 border-colorGray bg-[--background-rgb] p-6 sm:p-10 md:p-12 lg:translate-y-32 xl:translate-y-36 xl:flex-row xl:items-center xl:px-20 xl:py-16 2xl:px-24 2xl:py-20 ">
			<div className="flex flex-col items-center gap-y-5 text-start sm:gap-y-6 lg:items-start xl:gap-y-8">
				<span className="me-auto w-fit rounded-md bg-[#F9F1EC] px-3 py-1 text-sm font-medium text-[#C3995D] sm:text-xl">Get started</span>
				<h3 className={"w-full text-3xl text-[--text-rgb] sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl " + props.font.className}>
					Achieve peace of mind with Do It
				</h3>
				<p className="mb-5 text-justify text-sm text-colorGray sm:text-lg">
					Become focused, organized, and calm with Do It. Top #1 task manager and to-do list app in the world.
				</p>
				<StartButton />
			</div>
			<picture className="hidden lg:block xl:translate-x-1/4 xl:translate-y-16 2xl:translate-y-20">
				<source srcSet="/landing_page/images/SectionSixDark.png" media="(prefers-color-scheme: dark)" />
				<source srcSet="/landing_page/images/SectionSixLight.png" media="(prefers-color-scheme: light)" />
				<Image src="" width="1300" height="1000" alt="Web app image" className="mt-16 rounded-3xl drop-shadow-2xl xl:mt-0 xl:rounded-none xl:rounded-tl-3xl" />
			</picture>
		</section>
	);
}
