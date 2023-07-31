"Use client";

import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

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

export default function EditDo(props: { do: DataDoType; dateTileText: string; dateTileTense: number }) {
	const [name, setName] = useState(props.do.name);
	const [description, setDscription] = useState<string>(props.do.description ?? "Add description...");
	const [subTasks, setSubTasks] = useState(props.do.sub_tasks);
	const [newTaskInputVisible, setNewTaskInputVisible] = useState<Boolean>(false);
	const [taskName, setTaskName] = useState<string>("");

	return (
		<div className="z-50 mt-10 flex flex-col items-start gap-x-10 gap-y-7 rounded-lg bg-[--sidebar-rgb] px-7 py-6 font-medium shadow-md sm:px-10 md:flex-row">
			<div className="flex flex-col gap-y-3 md:w-1/2">
				<div className="flex flex-row items-center gap-x-7">
					<ContentEditable html={name} onChange={(e) => setName(e.target.value)} className="w-fit bg-transparent text-xs outline-none md:text-lg" />

					<div
						className={`w-fit rounded-md px-1.5 py-0.5 text-2xs md:px-2 md:py-1 md:text-sm ${
							props.dateTileTense == 0
								? "bg-green-500/10 text-green-500"
								: props.dateTileTense == 1
								? "bg-colorGray/10 text-colorGray"
								: "bg-red-500/10 text-red-500"
						}`}
					>
						{props.dateTileText}
					</div>
				</div>

				<ContentEditable
					html={description}
					className="-mx-3 rounded-lg bg-transparent p-3 text-2xs font-normal text-colorGray outline-none transition-all hover:bg-colorGray/20 hover:text-[--text-rgb] focus:bg-colorGray/20 focus:text-[--text-rgb] md:text-base"
					onChange={(e) =>
						setDscription(
							e.target.value
								.replace(/(<([^>]+)>)/gi, "")
								.replace(/\&nbsp;/g, " ")
								.trim()
						)
					}
					onFocus={() => setDscription((oldDescription) => (oldDescription == "Add description..." ? "" : oldDescription))}
					onBlur={() => setDscription((oldDescription) => (oldDescription == "" ? "Add description..." : oldDescription))}
				/>
			</div>

			<div className="flex flex-col gap-y-3 md:w-1/2">
				<p className="text-xs md:mb-2 md:text-lg">Sub tasks</p>

				{subTasks.map((sub_task, index) => (
					<div key={Math.random()} className="flex flex-row items-center gap-x-2 md:gap-x-4">
						<div
							onClick={() =>
								setSubTasks((subTasks) => {
									let newSubTasks = subTasks;
									newSubTasks[index].done = !newSubTasks[index].done;
									return newSubTasks.slice(0);
								})
							}
							className="relative z-30 flex cursor-pointer items-center transition-all duration-300 ease-bouncy-bezier"
						>
							<span className={`spanCheckbox !rounded-full ${sub_task.done ? "activeSpanCheckbox" : ""}`}></span>
						</div>

						<p className={`text-2xs md:text-sm ${sub_task.done ? "text-colorGray/50 line-through" : ""}`}>{sub_task.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
