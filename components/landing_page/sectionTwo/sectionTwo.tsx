import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionTwo(props: { font: NextFont }) {
	return (
		<section className="flex flex-col lg:flex-row justify-evenly responsiveWidth items-center">
			<div className="flex flex-col lg:basis-5/12 text-start gap-y-4 sm:gap-y-8">
				<span className="text-lg sm:text-xl bg-[#F9F1EC] text-[#C3995D] w-fit font-medium px-3 py-1 rounded-md">Headings</span>
				<h3 className={"text-[--text-rgb] text-3xl sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Divide and conquer</h3>
				<p className="text-colorGray text-sm  sm:text-lg text-justify">
					Use headings to create categories, milestones, or whatever you need - just give each one a name and drag your to-dos underneath. Instantly you&apos;ve got
					a nice, clean structure for your list, and the plan becomes perfectly clear.
				</p>
			</div>

			<div className="flex  flex-col items-end relative lg:basis-7/12 gap-y-5 scale-75 sm:scale-100 lg:scale-75 xl:scale-100">
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
