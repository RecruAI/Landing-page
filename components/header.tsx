import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function Header(props: { font: NextFont }) {
	return (
		<header className="responsiveWidth fixed left-1/2 z-30 flex -translate-x-1/2 content-center items-center justify-between px-5 py-3 backdrop-blur-md sm:py-5 md:px-8 lg:px-10">
			<Image src="/Icon-Light.svg" width="150" height="0" alt="Logo image" className="-translate-x-1/4 scale-50 md:-translate-x-0 md:scale-75 lg:scale-100" />

			<div className={'flex items-center gap-x-5 ' + props.font.className}>
				<button className={'h-fit text-sm tracking-wider text-mainColor md:text-lg lg:text-xl'}>Sign up for newsletter</button>
			</div>
		</header>
	)
}
