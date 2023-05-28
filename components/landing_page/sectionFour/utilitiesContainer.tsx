import { NextFont } from "next/dist/compiled/@next/font";
import Utility from "./utility";

export default function UtilitiesContainer(props: { font: NextFont }) {
	const utilities: Array<{ title: string; paragraph: string }> = [
		{
			title: "Beautiful animations",
			paragraph: "Everything you do in Do It is nicely animated for better experience.",
		},
		{
			title: "Quick find",
			paragraph: "All you need to do is start typing - and instantly you're taken there.",
		},
		{
			title: "Boards view",
			paragraph: "Help you see the big picture with Kanban-style cards.",
		},
	];

	return (
		<div className="flex flex-col gap-x-20 gap-y-8 lg:flex-row xl:gap-x-24 2xl:gap-x-60 QHD:gap-x-96">
			{utilities.map((utility, index) => (
				<Utility font={props.font} paragraph={utility.paragraph} title={utility.title} key={index} />
			))}
		</div>
	);
}
