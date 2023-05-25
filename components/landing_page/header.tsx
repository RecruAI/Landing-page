import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

export default function Header(props: { font: NextFont }) {
	return (
		<header className="w-screen QHD:w-3/4 WQHD:w-2/3 mx-auto flex justify-between py-5 px-10 content-center items-center fixed">
			<Image src="/landing_page/Icon-Light.svg" width="150" height="0" alt="" />

			<div className={"flex gap-x-4 " + props.font.className}>
				<button className={"text-colorGray h-fit text-lg font-normal tracking-wider"}>Sign in</button>
				<button className={"text-colorBlue h-fit text-lg font-medium tracking-wider"}>Sign up</button>
			</div>
		</header>
	);
}
