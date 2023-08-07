"Use client";

import checkDateRelativeTime from "@/functions/checkDateRelativeTime";
import returnDateTileText from "@/functions/returnDateTileText";
import RevalidateListPage from "@/functions/revalidateListPage";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

export default function AddDo(props: { listId: string; task: string; hideAddDo: Function }) {
	const [name, setName] = useState<string | null>(null);
	const [description, setDscription] = useState<string | null>(null);
	const [subTasks, setSubTasks] = useState<SubTaskType[]>([]);
	const [dueDate, setDueDate] = useState<string>(new Date().toDateString());

	const [dataPickerVisible, setDataPickerVisible] = useState<Boolean>(false);

	const [newTaskInputVisible, setNewTaskInputVisible] = useState<Boolean>(false);
	const [newTaskName, setNewTaskName] = useState<string>("");

	const supabase = createClientComponentClient();

	return (
		<div className="z-50 mx-auto mt-6 flex w-full max-w-7xl flex-col items-start gap-x-12 gap-y-4 rounded-lg bg-[--sidebar-rgb] px-5 py-4 shadow-md md:mt-10 md:flex-row md:flex-wrap md:p-10 ">
			{/* Left half */}
			<div className="flex basis-full flex-col gap-y-3 md:basis-1/2">
				{/* Date and title */}
				<div className="flex flex-row items-center gap-x-4 md:gap-x-7">
					{/* Title */}
					<ContentEditable
						html={name ?? "Set name..."}
						onChange={(e) =>
							setName(
								e.target.value
									.replace(/(<([^>]+)>)/gi, "")
									.replace(/\&nbsp;/g, " ")
									.trim()
							)
						}
						onFocus={() => setName((oldName) => (oldName == null ? "" : oldName))}
						onBlur={() => setName((oldName) => (oldName == "" ? null : oldName))}
						className="-m-3 w-fit rounded-md bg-transparent px-3 py-2 font-semibold outline-none hover:bg-colorGray/10 focus:bg-colorGray/10 md:text-lg"
					/>

					{/* Date */}
					{!dataPickerVisible ? (
						<div
							className={`w-fit cursor-pointer rounded-md px-2 py-1 text-2xs sm:text-xs md:text-sm ${
								checkDateRelativeTime(dueDate) == 0
									? "bg-green-500/10 text-green-500"
									: checkDateRelativeTime(dueDate) == 1
									? "bg-colorGray/10 text-colorGray"
									: "bg-red-500/10 text-red-500"
							}`}
							onClick={() => setDataPickerVisible(true)}
						>
							{returnDateTileText(dueDate)}
						</div>
					) : (
						<input
							autoFocus
							type="date"
							onBlur={() => setDataPickerVisible(false)}
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="w-fit rounded-md bg-colorGray/10 px-2 py-1 text-2xs text-colorGray sm:text-xs md:text-sm"
						/>
					)}
				</div>

				{/* Description */}
				<ContentEditable
					html={description ?? "Add description..."}
					className="-mx-2.5 rounded-lg p-2.5 text-xs font-normal text-colorGray outline-none transition-all hover:bg-colorGray/10 hover:text-[--text-rgb] focus:bg-colorGray/10 focus:text-[--text-rgb] md:-mx-3 md:p-3 md:text-base"
					onChange={(e) =>
						setDscription(
							e.target.value
								.replace(/(<([^>]+)>)/gi, "")
								.replace(/\&nbsp;/g, " ")
								.trim()
						)
					}
					onFocus={() => setDscription((oldDescription) => (oldDescription == null ? "" : oldDescription))}
					onBlur={() => setDscription((oldDescription) => (oldDescription == "" ? null : oldDescription))}
				/>
			</div>

			{/* Right half */}
			<div className="flex w-full basis-full flex-col md:grow md:basis-2/5">
				{/* Title */}
				<p className="mb-1.5 cursor-default font-semibold md:mb-3 md:text-lg">Sub tasks</p>

				{/* List of subtasks */}
				{subTasks
					.sort((doA, doB) => {
						if (doB.done == doA.done) return 0;
						else if (!doB.done && doA.done) return 1;
						else if (doB.done && !doA.done) return -1;
						else return 0;
					})
					.map((sub_task, index) => (
						<div
							key={Math.random()}
							className="flex flex-row items-center gap-x-2 border-t-1 border-t-colorGray/30 py-2 first-of-type:border-t-0 md:gap-x-4 md:py-2.5"
						>
							{/* Checkbox */}
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

							{/* Name of sub task */}
							<p className={`w-full text-xs md:text-sm ${sub_task.done ? "text-colorGray/50 line-through" : ""}`}>{sub_task.name}</p>
							<div
								onClick={() =>
									setSubTasks((oldSubTasks) => {
										oldSubTasks.splice(index, 1);
										return oldSubTasks.slice(0);
									})
								}
								className="-my-1.5 flex rounded-lg px-1 py-1.5 transition duration-200 hover:bg-colorGray/30"
							>
								<FontAwesomeIcon fixedWidth icon={faClose} className="h-4 w-4 text-red-500" />
							</div>
						</div>
					))}

				<div
					onClick={() => {
						if (!newTaskInputVisible) setNewTaskInputVisible(true);
					}}
					className={`-ms-2 flex cursor-pointer items-center gap-x-2 rounded-lg p-2 text-xs transition-all md:-ms-3 md:gap-x-4 md:p-3 md:text-sm ${
						newTaskInputVisible ? "bg-colorGray/20 text-[--text-rgb]" : "text-colorGray/60 hover:bg-colorGray/20 hover:text-[--text-rgb]"
					}`}
				>
					{/* Plus icon */}
					<div
						onClick={() => {
							if (newTaskName != "") setSubTasks((oldSubTasks) => [...oldSubTasks, { id: Date.now(), done: false, name: newTaskName }]);
							setNewTaskName("");
							setNewTaskInputVisible(false);
						}}
						className={`-m-2 flex rounded-lg transition duration-200 ${newTaskInputVisible ? "hover:bg-colorGray/30" : ""}`}
					>
						<FontAwesomeIcon
							fixedWidth
							icon={faPlus}
							className={`h-5 w-5 p-2 text-[#4F81E1] transition-transform duration-700 ${newTaskInputVisible ? "" : "rotate-180"}`}
						/>
					</div>

					{/* If 'newTaskInputVisible' equals true show input field, otherwise show placeholer  */}
					{newTaskInputVisible ? (
						<>
							{/* Input field */}
							<input
								onBlur={() => {
									if (newTaskName == "") setNewTaskName("");
								}}
								autoFocus
								placeholder="Type name of new Sub-Task"
								className="w-full bg-transparent outline-none"
								type="text"
								value={newTaskName}
								onChange={(e) => setNewTaskName(e.target.value.trim())}
							/>

							{/* "X" button, to delete input and unfocus field, cancel adding new subtask */}
							{/* Button shows onfly when input fields isnt empty */}
							<div
								onClick={() => {
									setNewTaskInputVisible(false);
									setNewTaskName("");
								}}
								className={`-m-2 flex rounded-lg text-colorGray transition duration-200 ${newTaskName == "" ? "cursor-default" : "hover:bg-colorGray/30"}`}
							>
								<FontAwesomeIcon
									fixedWidth
									icon={faClose}
									className={`${newTaskName == "" ? "scale-50 opacity-0" : "scale-180 opacity-100"} h-5 w-5 p-2 transition duration-700`}
								/>
							</div>
						</>
					) : (
						// Placeholder if 'newTaskInputVisible' equals false
						<p>New Sub-Task</p>
					)}
				</div>
			</div>

			<button
				className={`ms-auto w-fit rounded-lg px-3 py-2.5 text-xs font-medium text-white transition-all duration-500 md:px-7 md:py-4 md:text-base
${name != null && name != "" ? "bg-colorBlue" : "bg-red-700"}
		 `}
				disabled={name == null || name == ""}
				onClick={async () => {
					await supabase
						.from("dos")
						.insert([{ name: name, description: description, sub_tasks: subTasks, due_date: dueDate, list: props.listId, task: props.task }]);
					props.hideAddDo();

					RevalidateListPage();
				}}
			>
				{name != null && name != "" ? 'Add "' + name + '" to Task Table' : "Fill all of the fields!"}
			</button>
		</div>
	);
}
