import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionThree(props: { font: NextFont }) {
	return (
		<section className="flex flex-col-reverse lg:flex-row justify-evenly responsiveWidth items-center ">
			<div className="flex overflow-hidden relative basis-7/12">
				<picture className="translate-y-8 translate-x-10">
					<source srcSet="/landing_page/images/SectionThreeDark-1.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionThreeLight-1.png" width="300" height="300" alt="Moble app image" />
				</picture>
				<picture className="translate-y-40 -translate-x-10">
					<source srcSet="/landing_page/images/SectionThreeDark-2.png" media="(prefers-color-scheme: dark)" />
					<Image src="/landing_page/images/SectionThreeLight-2.png" width="300" height="300" alt="Moble app image" />
				</picture>
			</div>

			<div className="flex flex-col basis-5/12 2xl:basis-1/3 text-start gap-y-4 sm:gap-y-8">
				<span className="text-lg sm:text-xl bg-[#EFEAF6] text-[#7448AC] w-fit font-medium px-3 py-1 rounded-md">Mobile device</span>
				<h3 className={"text-[--text-rgb] text-3xl sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Stay organized on your mobile device</h3>
				<p className="text-colorGray text-sm  sm:text-lg text-justify">
					With mobile app, you&apos;ll be able to review your upcoming tasks - and jot down new ones - no matter where you happen to be. Everything stays in perfect
					sync across all your smartphone.
				</p>
			</div>
		</section>
	);
}
