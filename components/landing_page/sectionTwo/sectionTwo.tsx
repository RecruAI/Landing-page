import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionTwo(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth flex flex-col items-center justify-evenly lg:flex-row">
			<div className="flex flex-col gap-y-4 text-start sm:gap-y-8 lg:basis-5/12">
				<span className="w-fit rounded-md bg-[#F9F1EC] px-3 py-1 text-lg font-medium text-[#C3995D] sm:text-xl">Headings</span>
				<h3 className={"text-3xl text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Divide and conquer</h3>
				<p className="text-justify text-sm text-colorGray sm:text-lg">
					Use headings to create categories, milestones, or whatever you need - just give each one a name and drag your to-dos underneath. Instantly you&apos;ve got
					a nice, clean structure for your list, and the plan becomes perfectly clear.
				</p>
			</div>

			<div className="relative flex scale-75 flex-col items-end gap-y-5 sm:scale-100 lg:basis-7/12 lg:scale-75 xl:scale-100">
				<picture className="-translate-x-14 translate-y-10 xl:-translate-x-24">
					<source srcSet="/landing_page/images/SectionTwoDark-1.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionTwoLight-1.png" width="500" height="500" alt="Moble app image" className="rounded-xl" />
				</picture>
				<picture className="z-10 -translate-y-10 translate-x-10 xl:translate-x-0">
					<source srcSet="/landing_page/images/SectionTwoDark-2.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionTwoLight-2.png" width="350" height="500" alt="Moble app image" className="rounded-xl" />
				</picture>
			</div>
		</section>
	);
}
