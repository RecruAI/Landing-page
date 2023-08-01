"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RevalidateListPage from "./revalidateListPage";
import DoComponent from "./doComponent";

export default function TaskTable(props: { task: string; id: string; tasks: string[]; index: number; dos: DataDoType[] }) {
	const [name, setName] = useState<string>(props.task);
	const [oldName, setOldName] = useState<string>(props.task);
	const [dos, setDos] = useState<DataDoType[]>(props.dos);
	const [nameEditing, setNameEditing] = useState<Boolean>(false);

	const supabase = createClientComponentClient();

	useEffect(() => {
		setOldName(props.task);
		setName(props.task);
	}, [props.task]);

	useEffect(() => {
		setDos(props.dos);
	}, [props.dos]);

	async function updateTask() {
		if (name != "") {
			const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
			const prevName = oldName;
			setOldName(newName);
			setName(newName);

			setNameEditing(false);

			let newTasks = props.tasks;
			newTasks[props.index] = newName;

			let uniqueTasks = Array.from(new Set(newTasks));

			await supabase.from("lists").update({ tasks: uniqueTasks }).eq("id", props.id);
			await supabase.from("dos").update({ task: newName }).eq("task", prevName);
			RevalidateListPage();
		} else {
			setName(oldName);
			setNameEditing(false);
		}
	}

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
						<p className="text-sm font-medium text-colorGray md:text-base">{props.dos.length}</p>

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
				{dos.map((singleDo) => (
					<DoComponent do={singleDo} key={singleDo.id} />
				))}
			</div>
		</div>
	);
}
