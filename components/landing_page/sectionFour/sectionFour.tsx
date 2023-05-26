import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import UtilitiesContainer from "./utilitiesContainer";

export default function SectionFour(props: { font: NextFont }) {
	return (
		<section className="flex flex-col responsiveWidth items-center gap-y-24">
			<div className="flex w-full flex-col lg:flex-row lg:basis-5/12 text-start items-center gap-y-3 justify-between">
				<h3 className={"text-[--text-rgb] text-4xl sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-wider " + props.font.className}>
					And that&apos;s not all...
				</h3>

				<p className="text-colorGray text-md md:text-lg 2xl:text-2xl xl:text-xl max-w-md lg:max-w-lg xl:max-w-xl text-center lg:text-left">
					There&apos;s so much to enjoy in Do It. Here are a few more little touches we think you&apos;re going to love:
				</p>
			</div>

			<UtilitiesContainer font={props.font} />
		</section>
	);
}
