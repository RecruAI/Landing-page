import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function SectionFive(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth mt-44 flex flex-col items-center gap-y-4 sm:gap-y-8">
			<span className="w-fit rounded-md bg-[#EDF4EF] px-3 py-1 text-lg font-medium text-[#76B689] sm:text-xl">Testemonials</span>
			<h3 className={'text-3xl text-mainText sm:text-6xl lg:text-5xl xl:text-7xl ' + props.font.className}>Users love Do It</h3>

			<div className="my-16 flex justify-center sm:gap-x-10 md:gap-x-16 lg:gap-x-20 xl:my-20">
				<Image
					src="/images/SectionFive-1.png"
					width="100"
					height="100"
					alt="User profile picture"
					className="scale-75 rounded-full border-4 border-lightText opacity-70 shadow-2xl blur-sm md:scale-90 lg:scale-100"
				/>
				<Image
					src="/images/SectionFive-2.png"
					width="100"
					height="100"
					alt="User profile picture"
					className="-translate-y-10 scale-75 rounded-full border-4 border-lightText shadow-2xl md:scale-90 lg:scale-100"
				/>
				<Image
					src="/images/SectionFive-3.png"
					width="100"
					height="100"
					alt="User profile picture"
					className="scale-75 rounded-full border-4 border-lightText opacity-70 shadow-2xl blur-sm md:scale-90 lg:scale-100"
				/>
			</div>

			<p className="max-w-3xl text-sm tracking-wide text-lightText sm:text-lg md:text-xl">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut repellendus iusto recusandae expedita amet voluptates atque nemo deserunt cumque? Aperiam.
			</p>
			<span className={'text-base tracking-wider text-mainText sm:text-xl md:text-2xl ' + props.font.className}>- Lorem, ipsum.</span>
		</section>
	)
}
