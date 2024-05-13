import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionFive from "@/components/sectionFive/sectionFive";
import SectionFour from "@/components/sectionFour/sectionFour";
import SectionOne from "@/components/sectionOne/sectionOne";
import SectionSix from "@/components/sectionSix/sectionSix";
import SectionThree from "@/components/sectionThree/sectionThree";
import SectionTwo from "@/components/sectionTwo/sectionTwo";
import localFont from "next/font/local";

const EuropaGrotesk = localFont({ src: "EuropaGrotesk.otf" });

export default function Home() {
	return (
		<main>
			<Header font={EuropaGrotesk} />
			<SectionOne font={EuropaGrotesk} />

			<div className="relative flex w-screen flex-col items-center justify-center gap-y-32 bg-gradient-to-br from-[--background-rgb] to-[--background-rgb-darker] px-10 pt-40 text-center md:px-20 lg:px-24 xl:px-32">
				<SectionTwo font={EuropaGrotesk} />
				<SectionThree font={EuropaGrotesk} />
			</div>

			<div className="relative flex w-screen flex-col items-center justify-center bg-gradient-to-br from-[--background-rgb] to-[--background-rgb-darker] px-10 pt-40 text-center md:px-20 lg:px-24 xl:px-32">
				<SectionFour font={EuropaGrotesk} />
				<SectionFive font={EuropaGrotesk} />
				<SectionSix font={EuropaGrotesk} />
			</div>
			<Footer font={EuropaGrotesk} />
		</main>
	)
}
