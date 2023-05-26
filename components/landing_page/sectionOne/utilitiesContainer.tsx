import { NextFont } from "next/dist/compiled/@next/font";
import Utility from "./utility";

export default function UtilitiesContainer(props: { font: NextFont }) {
	const utilities: Array<{ title: string; paragraph: string }> = [
		{
			title: "With you everywhere",
			paragraph: "Use Do It's apps, extensions and widgets on any device or platform",
		},
		{ title: "Make Do It yours", paragraph: "Customize your to-do list with filters, labels, prorities, and more." },
		{ title: "Connect with your other tools", paragraph: "Link Do it with vour calendar, voice assistant. and 30+ other tools" },
	];

	return (
		<div className="responsiveWidth flex-col xl:flex-row gap-y-10 items-center h-30 flex justify-around mt-20">
			{utilities.map((utility) => (
				<Utility font={props.font} paragraph={utility.paragraph} title={utility.title} />
			))}
		</div>
	);
}
