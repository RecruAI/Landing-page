import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionFive(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth mt-44 flex flex-col items-center gap-y-4 sm:gap-y-8">
			<span className="w-fit rounded-md bg-[#EDF4EF] px-3 py-1 text-lg font-medium text-[#76B689] sm:text-xl">Testemonials</span>
			<h3 className={"text-3xl text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-7xl " + props.font.className}>Users love Do It</h3>

			<div className="my-16 flex justify-center sm:gap-x-10 md:gap-x-16 lg:gap-x-20 xl:my-20">
				<Image
					src="/images/SectionFive-1.png"
					width="100"
					height="100"
					alt="User profile picture"
					className="scale-75 rounded-full border-4 border-[--text-rgb] opacity-70 shadow-2xl blur-sm md:scale-90 lg:scale-100"
				/>
				<Image
					src="/images/SectionFive-2.png"
					width="100"
					height="100"
					alt="User profile picture"
					className="-translate-y-10 scale-75 rounded-full border-4 border-[--text-rgb] shadow-2xl md:scale-90 lg:scale-100"
				/>
				<Image
					src="/images/SectionFive-3.png"
					width="100"
					height="100"
					alt="User profile picture"
					className="scale-75 rounded-full border-4 border-[--text-rgb] opacity-70 shadow-2xl blur-sm md:scale-90 lg:scale-100"
				/>
			</div>

			<p className="max-w-3xl text-sm tracking-wide text-colorGray sm:text-lg md:text-xl">
				&quot;Do It helps keep me organized - I truly could not live without it! Allows me to prioritize my tasks in a super simple way. I definitely recommend Do It
				to everyone - I really think it&apos;s the best to-do list app available!&quot;
			</p>
			<span className={"text-base tracking-wider text-[--text-rgb] sm:text-xl md:text-2xl " + props.font.className}>- Andrew Cano</span>
		</section>
	);
}
