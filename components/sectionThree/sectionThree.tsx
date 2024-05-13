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
				<span className="w-fit rounded-md bg-[#EFEAF6] px-3 py-1 text-lg font-medium text-[#7448AC] sm:text-xl">Lorem, ipsum.</span>
				<h3 className={'text-3xl text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-7xl' + props.font.className}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				</h3>
				<p className="text-justify text-sm text-colorGray sm:text-lg">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, doloribus exercitationem ad aspernatur quasi aliquid sed. Provident tempora cupiditate,
					laborum perspiciatis ex enim vel minima blanditiis doloremque unde molestias sapiente obcaecati repellat nisi eaque ipsam! Id voluptas hic dolorum vitae.
				</p>
			</div>
		</section>
	)
}
