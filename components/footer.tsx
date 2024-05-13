import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import Link from "next/link";

export default function Footer(props: { font: NextFont }) {
	return (
		<footer className="responsiveWidth mt-28 flex flex-col items-center justify-between gap-y-1 bg-[--background-rgb] px-5 py-10 sm:mt-36 sm:flex-row md:px-8 lg:mt-44 lg:px-10 xl:mt-56 2xl:mt-60">
			<picture className="scale-75 sm:scale-90 md:scale-100">
				<Image src="/Icon-Light.svg" width="150" height="0" alt="Logo image" />
			</picture>
			<p className="xl:text-md text-mediumText">&copy; 2024 All rights reserved</p>
			<Link href={'https://www.bartoszwiaderek.com'} className={'tracking-widest text-mainColor transition-all hover:text-blue xl:text-xl ' + props.font.className}>
				Bartosz Wiaderek
			</Link>
		</footer>
	)
}
