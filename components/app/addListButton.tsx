"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker, { Emoji, EmojiStyle, Theme } from "emoji-picker-react";

export default function AddListButton() {
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedEmoji, setSelectedEmoji] = useState<string>("1f5d2-fe0f");
	const [listTitle, setListTitle] = useState<string>("");
	const [visibleIconPicker, setVisibleIconPicker] = useState<boolean>(false);

	return (
		<>
			<button
				className="listButton mt-1"
				onClick={() => {
					setSelectedEmoji("1f5d2-fe0f");
					setVisibleIconPicker(false);
					setListTitle("");
					setVisible(true);
				}}
			>
				<FontAwesomeIcon fixedWidth icon={faPlus} className="h-8 w-8 p-1 text-[#4F81E1]" />
				<p className="font-medium text-[--text-rgb]">Add list</p>
			</button>

			{visible ? (
				<div className="absolute left-0 top-0 flex h-screen w-screen">
					<div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-6 rounded-xl bg-[--sidebar-rgb] p-6">
						<div className="flex w-full items-center">
							<p className="me-auto text-xl font-bold text-[--text-rgb]">Add new list</p>
							<FontAwesomeIcon fixedWidth icon={faClose} className="h-8 w-8 p-1 text-colorGray/30" onClick={() => setVisible(false)} />
						</div>

						{/* Emoji button and title input */}
						<div className="flex gap-x-5">
							<div
								onClick={() => setVisibleIconPicker(true)}
								className="m-auto cursor-pointer rounded-md bg-colorGray/20 p-3 transition-all hover:bg-colorGray/30"
							>
								<Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.NATIVE} size={32} />
							</div>
							<input
								id="nickname"
								name="nickname"
								type="text"
								maxLength={25}
								value={listTitle}
								placeholder="List title"
								onChange={(e) => setListTitle(e.target.value)}
								className="rounded-md border-1 border-colorGray/30 bg-transparent px-3 py-2 text-lg text-[--text-rgb] outline-none hover:border-colorGray/70"
							/>
						</div>

						<button
							className={`text-md w-full rounded-lg px-6 py-4 font-medium text-white transition-all duration-500 sm:px-7 md:text-lg ${
								listTitle != "" ? "bg-colorBlue" : "bg-red-600"
							}`}
						>
							{listTitle != "" ? 'Add "' + listTitle + '" list' : "Fill all of the fields!"}
						</button>

						{/* Icon picker */}
						{visibleIconPicker ? (
							<EmojiPicker
								onEmojiClick={(e) => {
									setVisibleIconPicker(false);
									setSelectedEmoji(e.unified);
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

					<div className="absolute left-0 top-0 z-30 h-screen w-screen" onClick={() => setVisible(false)}></div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
