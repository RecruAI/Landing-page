"use client";

import RevalidateListPage from "@/functions/revalidateListPage";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useState } from "react";

export default function ListHeading(props: { icon: string; name: string; id: string; tasks: string[] }) {
	const [name, setName] = useState<string>(props.name);
	const [icon, setIcon] = useState<string>(props.icon);
	const [taskName, setTaskName] = useState<string>("");
	const [nameEditing, setNameEditing] = useState<Boolean>(false);
	const [iconEditing, setIconEditing] = useState<Boolean>(false);
	const [newTaskInputVisible, setNewTaskInputVisible] = useState<Boolean>(false);

	const supabase = createClientComponentClient();

	async function insertTask() {
		if (taskName != "") {
			const newName = taskName.charAt(0).toUpperCase() + taskName.slice(1).toLowerCase();

			setNewTaskInputVisible(false);
			setTaskName("");

			let newTasks = [newName, ...props.tasks];
			let uniqueTasks = Array.from(new Set(newTasks));

			await supabase.from("lists").update({ tasks: uniqueTasks }).eq("id", props.id);

			RevalidateListPage();
		} else {
			setNewTaskInputVisible(false);
			setTaskName("");
		}
	}

	return (
		<>
			<div className="flex flex-col gap-y-3 md:gap-y-8">
				<div className={`flex ${iconEditing ? "flex-col" : "flex-row"} items-center gap-x-1 gap-y-8 md:flex-col md:items-start`}>
					{/* Icon */}
					<p
						onClick={() => setIconEditing(true)}
						className="w-fit cursor-pointer rounded-lg p-1 px-1.5 text-4xl transition-all hover:bg-colorGray/20 md:-ms-2 md:p-2 md:text-6xl"
					>
						{icon}
					</p>

					{/* Icon picker */}
					{iconEditing ? (
						<div className="absolute left-1/2 z-30 w-full -translate-x-1/2 px-5 sm:w-2/3 md:w-1/2 xl:w-1/3 2xl:w-1/4">
							<EmojiPicker
								onEmojiClick={async (e) => {
									setIconEditing(false);
									await supabase.from("lists").update({ icon: e.emoji }).eq("id", props.id);
									setIcon(e.emoji);

									RevalidateListPage();
								}}
								autoFocusSearch={false}
								theme={Theme.DARK}
								lazyLoadEmojis={true}
								searchPlaceHolder="Search"
								width={"100%"}
								emojiStyle={EmojiStyle.NATIVE}
							/>
						</div>
					) : (
						<></>
					)}

					{/* Name */}
					{nameEditing ? (
						<input
							autoFocus
							value={name}
							onBlur={async (e) => {
								await supabase.from("lists").update({ name: e.target.value }).eq("id", props.id);
								setNameEditing(false);

								RevalidateListPage();
							}}
							onChange={(e) => setName(e.target.value)}
							className="w-full cursor-pointer bg-transparent px-2 text-2xl font-semibold text-[--text-rgb] outline-none md:-ms-5 md:px-5 md:pb-[3px] md:pt-[2px] md:text-5xl"
						/>
					) : (
						<h1
							onClick={() => setNameEditing(true)}
							className="w-fit cursor-pointer rounded-lg px-2 py-1.5 text-2xl font-semibold text-[--text-rgb] transition-all hover:bg-colorGray/20 md:-ms-5 md:px-5 md:py-2 md:text-5xl"
						>
							{name}
						</h1>
					)}
				</div>

				{/* Add new task button */}
				<div
					onClick={() => {
						if (!newTaskInputVisible) setNewTaskInputVisible(true);
					}}
					className={`flex items-center gap-x-3 rounded-lg px-2 py-0 text-xs font-medium transition-all md:-mx-3 md:px-3 md:py-1 md:text-base ${
						newTaskInputVisible ? "bg-colorGray/20 text-[--text-rgb]" : "cursor-pointer text-colorGray/60 hover:bg-colorGray/20 hover:text-[--text-rgb]"
					}`}
				>
					<div
						onClick={insertTask}
						className={`my-1 flex rounded-lg transition duration-200 md:-mx-1 ${newTaskInputVisible ? "cursor-pointer hover:bg-colorGray/30" : ""}`}
					>
						<FontAwesomeIcon
							fixedWidth
							icon={faPlus}
							className={`h-7 w-7 px-1.5 text-[#4F81E1] transition-transform duration-700 md:h-8 md:w-8 md:px-2 md:py-0.5 ${
								newTaskInputVisible ? "" : "rotate-180"
							}`}
						/>
					</div>

					{newTaskInputVisible ? (
						<>
							<input
								onBlur={() => {
									if (taskName == "") setNewTaskInputVisible(false);
								}}
								autoFocus
								placeholder="Type name of new Task-Table"
								className="w-full bg-transparent outline-none"
								type="text"
								value={taskName}
								onChange={(e) => setTaskName(e.target.value)}
							/>
							<div
								onClick={() => {
									setNewTaskInputVisible(false);
									setTaskName("");
								}}
								className={`duration-200md:-mx-1 my-1 flex rounded-lg text-colorGray transition  ${
									taskName == "" ? "" : "cursor-pointer hover:bg-colorGray/30"
								}`}
							>
								<FontAwesomeIcon
									fixedWidth
									icon={faClose}
									className={`h-7 w-7 px-1.5 transition duration-700 md:h-8 md:w-8 md:px-2 md:py-0.5 ${
										taskName == "" ? "scale-50 opacity-0" : "scale-180 opacity-100"
									}`}
								/>
							</div>
						</>
					) : (
						<p>New Task-Table</p>
					)}
				</div>
			</div>
		</>
	);
}
