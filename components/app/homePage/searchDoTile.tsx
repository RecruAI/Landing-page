"use client";

import { faArrowUpRightFromSquare, faDiagramProject, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkDateRelativeTime from "@/functions/checkDateRelativeTime";
import returnDateTileText from "@/functions/returnDateTileText";
import Link from "next/link";

export default function DoTileSearch(props: { do: DataDoType; list: DataListType }) {
	// Function returs 0 if present, -1 if past and 1 if future
	const dateRelativeTime = checkDateRelativeTime(props.do.due_date);

	// Function returns formatted date text
	const dateTitleText = returnDateTileText(props.do.due_date);

	return (
		<Link
			className="flex w-full items-center gap-x-3 text-clip px-3 transition hover:bg-colorGray/20 md:gap-x-4 md:px-9 md:py-3 lg:gap-x-5"
			href={"/app/" + props.do.list}
		>
			{/* Icon */}
			<FontAwesomeIcon fixedWidth icon={faArrowUpRightFromSquare} className="h-5 w-5 p-2 text-colorGray md:h-7 md:w-7" />

			{/* Title */}
			<p className="truncate text-xs md:text-base">{props.do.name}</p>

			{/* List tile */}
			<div className="flex gap-x-2 rounded-md bg-colorGray/20 px-1.5 py-0.5 text-2xs text-[--text-rgb] md:px-2 md:py-1 md:text-sm">
				{props.list.icon} <p className="hidden md:block">{props.list.name}</p>
			</div>

			{/* Date tile */}
			<div
				className={`whitespace-nowrap rounded-md px-1.5 py-0.5 text-2xs md:px-2 md:py-1 md:text-sm ${
					dateRelativeTime == 0 ? "bg-green-500/10 text-green-500" : dateRelativeTime == 1 ? "bg-colorGray/10 text-colorGray" : "bg-red-500/10 text-red-500"
				}`}
			>
				{dateTitleText}
			</div>

			{/* Amount of subtasks */}
			{props.do.sub_tasks.length != 0 ? (
				<>
					{/* Spacer */}
					<div className="grow" />

					<div className="flex flex-row items-center gap-x-2 text-2xs text-colorGray/50 md:text-sm">
						<FontAwesomeIcon fixedWidth icon={faDiagramProject} className="aspect-square h-3.5" />
						<p className="hidden md:block">
							{props.do.sub_tasks.filter((sub_task: SubTaskType) => sub_task.done == true).length}/{props.do.sub_tasks.length}
						</p>
					</div>
				</>
			) : (
				<></>
			)}
		</Link>
	);
}
