"use client";

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RevalidateListPage from "../../../functions/revalidateListPage";
import DoComponent from "./doComponent";
import AddDo from "./addDo";
import checkIfPastDate from "@/functions/checkIfPastDate";

export default function TaskTable(props: { task: string; id: string; tasks: string[]; index: number; dos: DataDoType[] }) {
	const [name, setName] = useState<string>(props.task);
	const [oldName, setOldName] = useState<string>(props.task);
	const [nameEditing, setNameEditing] = useState<Boolean>(false);
	const [addDoVisible, setAddDoVisible] = useState<Boolean>(false);

	// Adding only dos which aren't done
	const [dos, setDos] = useState<DataDoType[]>(props.dos.filter((singleDo) => !singleDo.done || (!checkIfPastDate(singleDo.due_date) && singleDo.done)));

	const supabase = createClientComponentClient();

	// Updating values on data change in parents data
	useEffect(() => {
		setOldName(props.task);
		setName(props.task);
	}, [props.task]);

	useEffect(() => {
		setDos(props.dos.filter((singleDo) => !singleDo.done || (!checkIfPastDate(singleDo.due_date) && singleDo.done)));
	}, [props.dos]);

	async function updateTask() {
		// Updating name if name fields isn't empty
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
						<p className="text-sm font-medium text-colorGray md:text-base">{dos.filter((singleDo) => !singleDo.done).length}</p>

						{/* Spacer */}
						<div className="grow" />
					</>
				)}

				{/* Add new 'do' button */}
				<div className="flex rounded-lg transition-all hover:bg-colorGray/20" onClick={() => setAddDoVisible(true)}>
					<FontAwesomeIcon fixedWidth icon={faPlus} className="h-4 cursor-pointer p-1 py-1.5 text-[#4F81E1] md:h-8 md:px-3" />
				</div>

				{/* Trash icon, to delete taskTable */}
				{/* Visible only if there are no more tasks in task table */}
				{dos.filter((singleDo) => !singleDo.done).length == 0 ? (
					<div
						className="flex rounded-lg transition-all hover:bg-colorGray/20"
						onClick={async () => {
							let newTasks = props.tasks;

							const index = newTasks.indexOf(name);
							newTasks.splice(index, 1);

							await supabase.from("lists").update({ tasks: newTasks }).eq("id", props.id);
						}}
					>
						<FontAwesomeIcon fixedWidth icon={faTrash} className="h-4 cursor-pointer p-1 py-1.5 text-red-500 md:h-8 md:px-3" />
					</div>
				) : (
					<></>
				)}
			</div>

			{/* Spacer */}
			<div className="my-1 h-px w-full bg-colorGray/20" />

			{/* Tasks */}
			<div className="flex flex-col gap-y-1">
				{!addDoVisible ? (
					dos.map((singleDo) => <DoComponent do={singleDo} key={singleDo.id} />)
				) : (
					<>
						<AddDo listId={props.id} task={name} hideAddDo={() => setAddDoVisible(false)} />
						<div
							className={`fixed left-0 top-0 z-30 h-full w-full bg-[--background-rgb] opacity-50 transition-all duration-700`}
							onClick={() => setAddDoVisible(false)}
						></div>
					</>
				)}
			</div>
		</div>
	);
}
