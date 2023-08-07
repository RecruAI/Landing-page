"use client";

import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RevalidateListPage from "../../../functions/revalidateListPage";
import EditDo from "./editDo";
import checkDateRelativeTime from "@/functions/checkDateRelativeTime";
import returnDateTileText from "@/functions/returnDateTileText";

export default function DoComponent(props: { do: DataDoType }) {
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
				className={`taskTile text-clip ${checkbox ? "taskTileDone" : "taskTileUndone"} ${settingsVisible ? "z-40 scale-[1.02] !outline-colorGray/50" : ""}`}
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
					className="relative z-20 my-2.5 flex items-center transition-all duration-300 ease-bouncy-bezier"
				>
					<span className={`spanCheckbox ${checkbox ? "activeSpanCheckbox" : ""}`}></span>
				</div>

				{/* Title */}
				<p className={`truncate text-xs md:text-base ${checkbox ? "line-through" : ""}`}>{doData.name}</p>

				{/* Date tile */}
				<div
					className={`rounded-md px-1.5 py-0.5 text-2xs md:px-2 md:py-1 md:text-sm ${
						dateRelativeTime == 0 ? "bg-green-500/10 text-green-500" : dateRelativeTime == 1 ? "bg-colorGray/10 text-colorGray" : "bg-red-500/10 text-red-500"
					}`}
				>
					{dateTitleText}
				</div>

				{/* Amount of subtasks */}
				{doData.sub_tasks.length != 0 ? (
					<>
						{/* Spacer */}
						<div className="grow" />

						<div className="flex flex-row items-center gap-x-2 text-2xs text-colorGray/50 md:text-sm">
							<FontAwesomeIcon fixedWidth icon={faDiagramProject} className="aspect-square h-3.5" />
							<p className="hidden md:block">
								{doData.sub_tasks.filter((sub_task: SubTaskType) => sub_task.done == true).length}/{doData.sub_tasks.length}
							</p>
						</div>
					</>
				) : (
					<></>
				)}

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
