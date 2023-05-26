import { NextFont } from "next/dist/compiled/@next/font";

export default function Utility(props: { font: NextFont; title: String; paragraph: string }) {
	return (
		<div className="flex flex-col text-left gap-y-3 flex-1 border-2 border-colorGray/30 p-5 lg:p-7 rounded-2xl shadow-xl">
			<h5 className={"text-[--text-rgb] text-xl lg:text-2xl tracking-wider " + props.font.className}>{props.title}</h5>
			<p className="text-colorGray text-sm lg:text-md xl:text-base">{props.paragraph}</p>
		</div>
	);
}
