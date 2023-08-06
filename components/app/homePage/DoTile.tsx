"use client";

import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RevalidateListPage from "../../../functions/revalidateListPage";
import checkDateRelativeTime from "@/functions/checkDateRelativeTime";
import returnDateTileText from "@/functions/returnDateTileText";
import Link from "next/link";

export default function DoTile(props: { do: DataDoType }) {
	const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

	const supabase = createClientComponentClient();

	// Function returs 0 if present, -1 if past and 1 if future
	const dateRelativeTime = checkDateRelativeTime(props.do.due_date);

	// Function returns formatted date text
	const dateTitleText = returnDateTileText(props.do.due_date);

	return (
		<Link className="flex items-center gap-x-3 text-clip px-2 transition hover:bg-colorGray/20 md:gap-x-6 md:px-9 md:py-3" href={"/app/" + props.do.list}>
			{/* Checkbox */}
			<div className="relative z-30 my-2.5 flex items-center transition-all duration-300 ease-bouncy-bezier">
				<span className="spanCheckbox"></span>
			</div>

			{/* Title */}
			<p className="text-xs md:text-base">{props.do.name}</p>

			{/* Date tile */}
			<div
				className={`rounded-md px-1.5 py-0.5 text-2xs md:px-2 md:py-1 md:text-sm ${
					dateRelativeTime == 0 ? "bg-green-500/10 text-green-500" : dateRelativeTime == 1 ? "bg-colorGray/10 text-colorGray" : "bg-red-500/10 text-red-500"
				}`}
			>
				{dateTitleText}
			</div>

			{/* Spacer */}
			<div className="grow" />

			{/* Amount of subtasks */}
			{props.do.sub_tasks.length != 0 ? (
				<div className="flex flex-row items-center gap-x-2 text-2xs text-colorGray/50 md:text-sm">
					<FontAwesomeIcon fixedWidth icon={faDiagramProject} className="aspect-square h-3.5" />
					<p className="hidden md:block">
						{props.do.sub_tasks.filter((sub_task: SubTaskType) => sub_task.done == true).length}/{props.do.sub_tasks.length}
					</p>
				</div>
			) : (
				<></>
			)}
		</Link>
	);
}
