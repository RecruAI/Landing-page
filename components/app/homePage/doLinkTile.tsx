"use client";

import { faArrowUpRightFromSquare, faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RevalidateListPage from "../../../functions/revalidateListPage";
import EditDo from "../listPage/editDo";
import checkDateRelativeTime from "@/functions/checkDateRelativeTime";
import returnDateTileText from "@/functions/returnDateTileText";
import { list } from "postcss";
import Link from "next/link";

export default function DoLinkTile(props: { do: DataDoType; list: DataListType }) {
	const [checkbox, setCheckbox] = useState<boolean>(props.do.done);
	const [doData, setDoData] = useState<DataDoType>(props.do);
	const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

	const supabase = createClientComponentClient();

	useEffect(() => {
		setCheckbox(props.do.done);
		setDoData(props.do);
	}, [props]);

	// Function returs 0 if present, -1 if past and 1 if future
	const dateRelativeTime = checkDateRelativeTime(props.do.due_date);

	// Function returns formatted date text
	const dateTitleText = returnDateTileText(props.do.due_date);

	return (
		<>
			<button
				className={`-ms-1 flex items-center gap-x-3 text-clip rounded-lg px-4 font-medium transition-all md:-mx-3 md:gap-x-5 md:px-5
				md:py-0.5 ${checkbox ? "taskTileDone" : "taskTileUndone"} ${settingsVisible ? "scale-[1.02] !outline-colorGray/50" : ""}`}
				onClick={() => setSettingsVisible((prevState) => !prevState)}
			>
				{/* Checkbox */}
				<div
					onClick={async (e) => {
						setSettingsVisible(true);
						setCheckbox(!checkbox);
						await supabase.from("dos").update({ done: !checkbox }).eq("id", props.do.id);
						RevalidateListPage();
					}}
					className="relative my-3 flex items-center transition-all duration-300 ease-bouncy-bezier"
				>
					<span className={`spanCheckbox ${checkbox ? "activeSpanCheckbox" : ""}`}></span>
				</div>

				{/* Title */}
				<p className={`truncate text-xs md:text-base ${checkbox ? "line-through" : ""}`}>{doData.name}</p>

				{/* List tile */}
				<div className="flex gap-x-2 rounded-md bg-colorGray/20 px-1.5 py-0.5 text-2xs text-[--text-rgb] md:px-2 md:py-1 md:text-sm">
					{props.list.icon} <p className="hidden md:block">{props.list.name}</p>
				</div>

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
				{doData.sub_tasks.length != 0 ? (
					<div className="flex flex-row items-center gap-x-2 text-2xs text-colorGray/50 md:text-sm">
						<FontAwesomeIcon fixedWidth icon={faDiagramProject} className="aspect-square h-3.5" />
						<p className="hidden md:block">
							{doData.sub_tasks.filter((sub_task: SubTaskType) => sub_task.done == true).length}/{doData.sub_tasks.length}
						</p>
					</div>
				) : (
					<></>
				)}

				{/* Icon */}
				<Link href={"/app/list/" + props.list.id} className="flex">
					<FontAwesomeIcon fixedWidth icon={faArrowUpRightFromSquare} className="h-3 w-3 text-colorGray hover:text-[--text-rgb] md:h-4 md:w-4" />
				</Link>
			</button>

			{settingsVisible ? (
				<>
					<EditDo do={doData} />
					<div
						className={`fixed left-0 top-0 z-30 h-full w-full bg-[--background-rgb] opacity-50 transition-all duration-700`}
						onClick={() => setSettingsVisible(false)}
					></div>
				</>
			) : (
				<></>
			)}
		</>
	);
}
