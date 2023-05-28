import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionFive(props: { font: NextFont }) {
	return (
		<section className="flex flex-col responsiveWidth gap-y-4 sm:gap-y-8 items-center mt-44">
			<span className="text-lg sm:text-xl bg-[#EDF4EF] text-[#76B689] w-fit font-medium px-3 py-1 rounded-md">Testemonials</span>
			<h3 className={"text-[--text-rgb] text-3xl sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Users love Do It</h3>
			<p className="text-colorGray text-sm sm:text-lg md:text-xl max-w-3xl tracking-wide ">
				&quot;Do It helps keep me organized - I truly could not live without it! Allows me to prioritize my tasks in a super simple way. I definitely recommend Do It
				to everyone - I really think it&apos;s the best to-do list app available!&quot;
			</p>
			<span className={"text-[--text-rgb] text-base sm:text-xl md:text-2xl tracking-wider " + props.font.className}>- Andrew Cano</span>
		</section>
	);
}
