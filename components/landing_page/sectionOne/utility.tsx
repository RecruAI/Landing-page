import { NextFont } from "next/dist/compiled/@next/font";

export default function Utility(props: { font: NextFont; title: String; paragraph: string }) {
	return (
		<div className="flex  gap-x-5">
			<div className="bg-[--background-rgb] border-2 border-colorGray w-12 h-12 rounded-lg mt-1"></div>
			<div className="flex flex-col max-w-xs text-left gap-y-2">
				<h5 className={"text-[--text-rgb] text-2xl tracking-wider " + props.font.className}>{props.title}</h5>
				<p className="text-colorGray text-md">{props.paragraph}</p>
			</div>
		</div>
	);
}
