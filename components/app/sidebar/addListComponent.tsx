"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddListComponent(props: { hideComponent: Function }) {
	const [visibleIconPicker, setVisibleIconPicker] = useState<boolean>(false);

	const [selectedEmoji, setSelectedEmoji] = useState<string>("🗒️");
	const [listTitle, setListTitle] = useState<string>("");

	const supabase = createClientComponentClient({});

	async function getUserId(): Promise<string> {
		const {
			data: { session },
		}: any = await supabase.auth.getSession();
		return session.user.id;
	}

	async function insertNewListToDB() {
		await supabase.from("lists").insert([{ user_id: await getUserId(), name: listTitle, icon: selectedEmoji }]);

		props.hideComponent();
	}

	return (
		<>
			<div className="fixed left-0 top-0 flex h-screen w-screen">
				<div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-5 rounded-lg bg-[--sidebar-rgb] px-7 py-6 shadow-md sm:px-10">
					<div className="flex w-full items-center">
						<p className="me-auto text-lg font-bold text-[--text-rgb]">Add new list</p>
						<FontAwesomeIcon
							fixedWidth
							icon={faClose}
							className="h-8 w-8 cursor-pointer p-1 text-colorGray/30 transition-all hover:text-colorGray/50"
							onClick={() => props.hideComponent()}
						/>
					</div>

					{/* Icon button and title input */}
					<div className="flex gap-x-2 sm:gap-x-5">
						{/* Icon display */}
						<div
							onClick={() => setVisibleIconPicker(true)}
							className="sm:text-md m-auto aspect-square cursor-pointer rounded-md bg-colorGray/20 p-2 text-sm transition-all hover:bg-colorGray/30 sm:p-3"
						>
							{selectedEmoji}
						</div>

						{/* Text input */}
						<input
							id="nickname"
							name="nickname"
							type="text"
							maxLength={25}
							value={listTitle}
							placeholder="List title"
							onChange={(e) => setListTitle(e.target.value)}
							className="rounded-md border-1 border-colorGray/30 bg-transparent px-3 py-2 text-sm text-[--text-rgb] outline-none hover:border-colorGray/70"
						/>
					</div>

					<button
						className={`md:text-md mt-3 w-full rounded-lg px-5 py-3 text-sm font-medium text-white transition-all duration-500 sm:px-7 sm:py-4 ${
							listTitle != "" ? "bg-colorBlue" : "bg-red-700"
						}`}
						disabled={listTitle == ""}
						onClick={() => insertNewListToDB()}
					>
						{listTitle != "" ? 'Add "' + listTitle + '" list' : "Fill all of the fields!"}
					</button>

					{/* Icon picker */}
					{visibleIconPicker ? (
						<EmojiPicker
							onEmojiClick={(e) => {
								setVisibleIconPicker(false);
								setSelectedEmoji(e.emoji);
							}}
							autoFocusSearch={false}
							theme={Theme.DARK}
							lazyLoadEmojis={true}
							searchPlaceHolder="Search"
							emojiStyle={EmojiStyle.NATIVE}
						/>
					) : (
						<></>
					)}
				</div>

				<div className="fixed left-0 top-0 z-30 h-screen w-screen" onClick={() => props.hideComponent()}></div>
			</div>
		</>
	);
}
