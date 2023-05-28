import { NextFont } from "next/dist/compiled/@next/font";

export default function Utility(props: { font: NextFont; title: String; paragraph: string }) {
	return (
		<div className="flex flex-1 flex-col gap-y-3 rounded-2xl p-5 text-left shadow-xl outline outline-1 outline-colorGray/20 lg:p-7">
			<h5 className={"text-xl tracking-wider text-[--text-rgb] lg:text-2xl " + props.font.className}>{props.title}</h5>
			<p className="lg:text-md text-sm text-colorGray xl:text-base">{props.paragraph}</p>
		</div>
	);
}
