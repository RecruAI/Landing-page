import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionFive(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth mt-44 flex flex-col items-center gap-y-4 sm:gap-y-8">
			<span className="w-fit rounded-md bg-[#EDF4EF] px-3 py-1 text-lg font-medium text-[#76B689] sm:text-xl">Testemonials</span>
			<h3 className={"text-3xl text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Users love Do It</h3>
			<p className="max-w-3xl text-sm tracking-wide text-colorGray sm:text-lg md:text-xl ">
				&quot;Do It helps keep me organized - I truly could not live without it! Allows me to prioritize my tasks in a super simple way. I definitely recommend Do It
				to everyone - I really think it&apos;s the best to-do list app available!&quot;
			</p>
			<span className={"text-base tracking-wider text-[--text-rgb] sm:text-xl md:text-2xl " + props.font.className}>- Andrew Cano</span>
		</section>
	);
}
