import { NextFont } from "next/dist/compiled/@next/font";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Utility(props: { font: NextFont; title: String; paragraph: string; icon: any }) {
	return (
		<div className="flex gap-x-5">
			<div className="mt-1 aspect-square h-12 w-12 rounded-lg border-2 border-colorGray bg-[--background-rgb] p-2.5 text-colorBlue">
				<FontAwesomeIcon icon={props.icon} />
			</div>
			<div className="flex max-w-md flex-col gap-y-3 text-left xl:max-w-xs">
				<h5 className={"text-xl tracking-wider text-[--text-rgb] lg:text-2xl " + props.font.className}>{props.title}</h5>
				<p className="lg:text-md text-sm text-colorGray xl:text-base">{props.paragraph}</p>
			</div>
		</div>
	);
}
