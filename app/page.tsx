import Header from "@/components/landing_page/header";
import SectionOne from "@/components/landing_page/sectionOne/sectionOne";
import localFont from "next/font/local";

const EuropaGrotesk = localFont({ src: "EuropaGrotesk.otf" });

export default function Home() {
	return (
		<main>
			<Header font={EuropaGrotesk} />
			<SectionOne font={EuropaGrotesk} />
		</main>
	);
}
