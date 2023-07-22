"use client";

import { faArrowsRotate, faDiagramProject, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function TaskTable(props: { task: string; id: string; tasks: string[]; index: number }) {
	const [name, setName] = useState<string>(props.task);
	const [oldName, setOldName] = useState<string>(props.task);
	const [nameEditing, setNameEditing] = useState<Boolean>(false);

	const supabase = createClientComponentClient();

	useEffect(() => {
		setOldName(props.task);
	}, [props.task]);

	async function updateTask() {
		if (name != "") {
			const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

			setOldName(newName);
			setName(newName);

			setNameEditing(false);

			let newTasks = props.tasks;
			newTasks[props.index] = newName;

			await supabase.from("lists").update({ tasks: newTasks }).eq("id", props.id);
		} else {
			setName(oldName);
			setNameEditing(false);
		}
	}

	const checkbox = true;

	return (
		<div className="flex flex-col gap-y-1">
			{/* Task table title row */}
			<div className="flex flex-row items-center gap-x-1.5 md:gap-x-3">
				{nameEditing ? (
					<input
						className="w-full bg-transparent text-lg font-bold text-[--text-rgb] outline-none md:text-2xl"
						value={name}
						onBlur={updateTask}
						autoFocus
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				) : (
					<>
						<h2
							className="-ms-1.5 cursor-pointer truncate rounded-md px-1.5 py-0.5 text-lg font-bold text-[--text-rgb] hover:bg-colorGray/50 md:-ms-3 md:px-3 md:py-1 md:text-2xl"
							onClick={() => setNameEditing(true)}
						>
							{oldName}
						</h2>
						<p className="text-sm font-medium text-colorGray md:text-base">4</p>

						{/* Spacer */}
						<div className="grow" />
					</>
				)}

				<div className="flex rounded-lg transition-all hover:bg-colorGray/20">
					<FontAwesomeIcon fixedWidth icon={faPlus} className="h-4 cursor-pointer p-1 py-1.5 text-[#4F81E1] md:h-8 md:px-2.5" />
				</div>
			</div>

			{/* Spacer */}
			<div className="my-1 h-px w-full bg-colorGray/20" />

			{/* Tasks */}
			<div className="flex flex-col gap-y-1">
				{/* Example of task */}
				<button className={`taskTile text-clip ${checkbox ? "taskTileDone" : "taskTileUndone"}`}>
					{/* Checkbox */}
					<div
						// onClick={() => setCheckbox(!checkbox)}
						className="relative my-2.5 flex items-center transition-all duration-300 ease-bouncy-bezier"
					>
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
			</div>
		</div>
	);
}
