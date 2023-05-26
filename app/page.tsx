import Header from "@/components/landing_page/header";
import SectionOne from "@/components/landing_page/sectionOne/sectionOne";
import SectionThree from "@/components/landing_page/sectionThree/sectionThree";
import SectionTwo from "@/components/landing_page/sectionTwo/sectionTwo";
import localFont from "next/font/local";

const EuropaGrotesk = localFont({ src: "EuropaGrotesk.otf" });

export default function Home() {
	return (
		<main>
			<Header font={EuropaGrotesk} />
			<SectionOne font={EuropaGrotesk} />

			<div className="px-10 md:px-20 lg:px-24 xl:px-32 w-screen relative pt-40 bg-gradient-to-br gap-y-32 text-center justify-center items-center flex flex-col from-[--background-rgb] to-[--background-rgb-darker]">
				<SectionTwo font={EuropaGrotesk} />
				<SectionThree font={EuropaGrotesk} />
			</div>
		</main>
	);
}
