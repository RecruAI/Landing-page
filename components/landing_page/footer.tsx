import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import Link from "next/link";

export default function Footer(props: { font: NextFont }) {
	return (
		<footer className="responsiveWidth flex flex-col sm:flex-row justify-between py-10 px-5 md:px-8 lg:px-10 bg-[--background-rgb] mt-60 items-center gap-y-1">
			<picture className="scale-75 sm:scale-90 md:scale-100">
				<source srcSet="/landing_page/Icon-Dark.svg" media="(prefers-color-scheme: dark)" />
				<Image src="/landing_page/Icon-Light.svg" width="150" height="0" alt="Logo image" />
			</picture>
			<p className="text-colorGray xl:text-md">&copy; 2023 All rights reserved</p>
			<Link
				href={"https://www.bartoszwiaderek.com"}
				className={"text-[--text-rgb] xl:text-xl tracking-widest hover:text-colorBlue transition-all " + props.font.className}
			>
				Bartosz Wiaderek
			</Link>
			{/* <StartButton /> */}
		</footer>
	);
}
