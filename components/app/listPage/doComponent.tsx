"use client";

import { faArrowsRotate, faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RevalidateListPage from "./revalidateListPage";
import EditDo from "./editDo";

type DataDoType = {
	due_date: string;
	name: string;
	description: string;
	task: string;
	id: string;
	list: string;
	sub_tasks: SubTaskType[];
	done: boolean;
};
type SubTaskType = { id: number; name: string; done: boolean };

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
	function checkDate(): number {
		// Setting dates
		// Getting just date from both
		const dateToCheck = new Date(doData.due_date);
		const dateNow = new Date(new Date().toDateString());

		// Setting time to 00:00
		dateToCheck.setHours(0, 0, 0, 0);
		dateNow.setHours(0, 0, 0, 0);

		// Past
		if (dateToCheck.getTime() < dateNow.getTime()) return -1;
		// Future
		else if (dateToCheck.getTime() > dateNow.getTime()) return 1;
		// Present
		else return 0;
	}

	// Function returns formatted date text
	function returnDateTileText(): string {
		// Setting times
		var today = new Date();
		var taskData = new Date(doData.due_date);

		// Setting time var
		const dateTime = checkDate();

		// If dateTime equals 0 return "Today"
		if (dateTime == 0) return "Today";

		// Declaring months names
		const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

		// Setting tommorows and yeasterdays date
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		const tommorow = new Date();
		tommorow.setDate(tommorow.getDate() + 1);

		// Checking if date is tommorows or yeasterdays
		const isYesterday = yesterday.toDateString() === taskData.toDateString();
		const isTommorow = tommorow.toDateString() === taskData.toDateString();

		if (dateTime == -1) {
			// If isYesterday equals true, return "Yesterday"
			// Else return date
			if (isYesterday) return "Yesterday";
			else return taskData.getDate() + " " + monthsNames[today.getMonth() + 1];
		} else if (dateTime == 1) {
			// If isTommorows equals true, return "Tommorow"
			// Else return date
			if (isTommorow) return "Tommorow";
			else return taskData.getDate() + " " + monthsNames[today.getMonth() + 1];
		}
		// If dateTime is undefined return error
		else return "Error";
	}

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
					className="relative z-30 my-2.5 flex items-center transition-all duration-300 ease-bouncy-bezier"
				>
					<span className={`spanCheckbox ${checkbox ? "activeSpanCheckbox" : ""}`}></span>
				</div>

				{/* Title */}
				<p className={`text-xs md:text-base ${checkbox ? "line-through" : ""}`}>{doData.name}</p>

				{/* Date tile */}
				<div
					className={`rounded-md px-1.5 py-0.5 text-2xs md:px-2 md:py-1 md:text-sm ${
						checkDate() == 0 ? "bg-green-500/10 text-green-500" : checkDate() == 1 ? "bg-colorGray/10 text-colorGray" : "bg-red-500/10 text-red-500"
					}`}
				>
					{returnDateTileText()}
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

				{/* <FontAwesomeIcon fixedWidth icon={faArrowsRotate} className="aspect-square h-3.5 text-2xs text-colorGray/50 md:text-sm" /> */}
			</button>

			{settingsVisible ? (
				<>
					<EditDo dateTileText={returnDateTileText()} do={doData} dateTileTense={checkDate()} />
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
