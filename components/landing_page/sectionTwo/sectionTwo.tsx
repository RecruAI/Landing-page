import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionTwo(props: { font: NextFont }) {
	return (
		<section className="flex flex-col lg:flex-row justify-evenly responsiveWidth items-center">
			<div className="flex flex-col basis-5/12 text-start gap-y-4 sm:gap-y-8">
				<span className="text-lg sm:text-xl bg-[#F9F1EC] text-[#C3995D] w-fit font-medium px-3 py-1 rounded-md">Headings</span>
				<h3 className={"text-[--text-rgb] text-3xl sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Divide and conquer</h3>
				<p className="text-colorGray text-sm  sm:text-lg text-justify">
					Use headings to create categories, milestones, or whatever you need - just give each one a name and drag your to-dos underneath. Instantly you've got a
					nice, clean structure for your list, and the plan becomes perfectly clear.
				</p>
			</div>

			<div className="flex overflow-hidden relative basis-7/12">
				{/* <picture className="translate-y-8 translate-x-10 lg:translate-x-0">
					<source srcSet="/landing_page/images/SectionThreeDark-1.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionThreeLight-1.png" width="300" height="300" alt="Moble app image" />
				</picture>
				<picture className="translate-y-40 -translate-x-10 lg:-translate-x-20">
					<source srcSet="/landing_page/images/SectionThreeDark-2.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionThreeLight-2.png" width="300" height="300" alt="Moble app image" />
				</picture> */}
			</div>
		</section>
	);
}
