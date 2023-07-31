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

				<div
					onClick={() => {
						if (!newTaskInputVisible) setNewTaskInputVisible(true);
					}}
					className={`-mx-3 flex cursor-pointer items-center gap-x-2 rounded-lg p-3 text-xs font-medium transition-all md:gap-x-4 md:text-sm ${
						newTaskInputVisible ? "bg-colorGray/20 text-[--text-rgb]" : "text-colorGray/60 hover:bg-colorGray/20 hover:text-[--text-rgb]"
					}`}
				>
					<div
						// onClick={insertTask}
						className={`-m-2 flex rounded-lg transition duration-200 ${newTaskInputVisible ? "hover:bg-colorGray/30" : ""}`}
					>
						<FontAwesomeIcon
							fixedWidth
							icon={faPlus}
							className={`h-5 w-5 p-2 text-[#4F81E1] transition-transform duration-700 ${newTaskInputVisible ? "" : "rotate-180"}`}
						/>
					</div>

					{newTaskInputVisible ? (
						<>
							<input
								onBlur={() => {
									if (taskName == "") setNewTaskInputVisible(false);
								}}
								autoFocus
								placeholder="Type name of new Sub-Task"
								className="w-full bg-transparent outline-none"
								type="text"
								value={taskName}
								onSubmit={() => console.log("s")}
								onChange={(e) => setTaskName(e.target.value)}
							/>
							<div
								onClick={() => {
									setNewTaskInputVisible(false);
									setTaskName("");
								}}
								className={`-m-2 flex rounded-lg text-colorGray/50 transition duration-200  ${
									taskName == "" ? "" : "hover:bg-colorGray/30 hover:text-colorGray"
								}`}
							>
								<FontAwesomeIcon
									fixedWidth
									icon={faClose}
									className={`${taskName == "" ? "scale-50 opacity-0" : "scale-180 opacity-100"} h-5 w-5 p-2 transition duration-700`}
								/>
							</div>
						</>
					) : (
						<p>New Sub-Task</p>
					)}
				</div>
			</div>
		</div>
	);
}
