"use client";

import { faArrowsRotate, faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type DataDoType = { due_date: string; name: string; description: string; task: string; id: string; list: string; sub_tasks: []; done: boolean };

export default function DoComponent(props: { do: DataDoType }) {
	const [checkbox, setCheckbox] = useState<boolean>(false);

	return (
		<button className={`taskTile text-clip ${checkbox ? "taskTileDone" : "taskTileUndone"}`}>
			{/* Checkbox */}
			<div onClick={() => setCheckbox(!checkbox)} className="relative my-2.5 flex items-center transition-all duration-300 ease-bouncy-bezier">
				<span className={`spanCheckbox ${checkbox ? "activeSpanCheckbox" : ""}`}></span>
			</div>

			{/* Title */}
			<p className={`text-xs md:text-base ${checkbox ? "line-through" : ""}`}>Example task</p>

			{/* Date tile */}
			{/* Today */}
			<div className="rounded-md bg-green-500/10 px-1.5 py-0.5 text-2xs text-green-500 md:px-2 md:py-1 md:text-sm">Today</div>
			{/* Other */}
			{/* <div className="rounded-md bg-colorGray/10 px-2 py-1 text-sm text-colorGray">Tommorow</div> */}

			{/* Spacer */}
			<div className="grow" />

			{/* Amount of subtasks */}
			<div className="flex flex-row items-center gap-x-2 text-2xs text-colorGray/50 md:text-sm">
				<FontAwesomeIcon fixedWidth icon={faDiagramProject} className="aspect-square h-3.5" />
				<p className="hidden md:block">2/4</p>
			</div>

			<FontAwesomeIcon fixedWidth icon={faArrowsRotate} className="aspect-square h-3.5 text-2xs text-colorGray/50 md:text-sm" />
		</button>
	);
}
