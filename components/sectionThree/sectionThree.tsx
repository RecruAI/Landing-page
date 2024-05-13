import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionThree(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth flex flex-col-reverse items-center justify-evenly lg:flex-row">
			<div className="relative flex basis-7/12 overflow-hidden">
				<picture className="translate-x-10 translate-y-8">
					<Image src="/images/SectionThreeLight-1.png" width="300" height="300" alt="Moble app image" />
				</picture>
				<picture className="-translate-x-10 translate-y-40">
					<Image src="/images/SectionThreeLight-2.png" width="300" height="300" alt="Moble app image" />
				</picture>
			</div>

			<div className="flex basis-5/12 flex-col gap-y-4 text-start sm:gap-y-8 2xl:basis-1/3">
				<span className="w-fit rounded-md bg-[#EFEAF6] px-3 py-1 text-lg font-medium text-[#7448AC] sm:text-xl">Mobile device</span>
				<h3 className={"text-3xl text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-7xl" + props.font.className}>Stay organized on your mobile device</h3>
				<p className="text-justify text-sm text-colorGray sm:text-lg">
					With mobile app, you&apos;ll be able to review your upcoming tasks - and jot down new ones - no matter where you happen to be. Everything stays in perfect
					sync across all your smartphone.
				</p>
			</div>
		</section>
	);
}
