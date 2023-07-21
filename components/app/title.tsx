"use client";

import RevalidateListPage from "@/app/app/[id]/revalidateListPage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useState } from "react";

export default function Title(props: { icon: string; name: string; id: string }) {
	const [title, setTitle] = useState<string>(props.name);
	const [icon, setIcon] = useState<string>(props.icon);
	const [titleEditing, setTitleEditing] = useState<Boolean>(false);
	const [iconEditing, setIconEditing] = useState<Boolean>(false);

	const supabase = createClientComponentClient();

	return (
		<>
			<div className="flex flex-col gap-y-3 md:gap-y-8">
				<div className={`flex ${iconEditing ? "flex-col" : "flex-row"}  gap-x-1 gap-y-8 md:flex-col md:items-start`}>
					<p
						onClick={() => setIconEditing(true)}
						className="w-fit cursor-pointer rounded-lg p-1 text-4xl transition-all hover:bg-colorGray/20 md:-ms-2 md:p-2 md:text-6xl"
					>
						{icon}
					</p>

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

					{titleEditing ? (
						<input
							autoFocus
							value={title}
							onBlur={async (e) => {
								await supabase.from("lists").update({ name: e.target.value }).eq("id", props.id);
								setTitleEditing(false);

								RevalidateListPage();
							}}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full cursor-pointer bg-transparent px-2 pb-[4px] text-2xl font-semibold text-[--text-rgb] outline-none md:-ms-5 md:px-5 md:pb-[3px] md:pt-[2px] md:text-5xl"
						/>
					) : (
						<h1
							onClick={() => setTitleEditing(true)}
							className="w-fit cursor-pointer rounded-lg px-2 py-1.5 text-2xl font-semibold text-[--text-rgb] transition-all hover:bg-colorGray/20 md:-ms-5 md:px-5 md:py-2 md:text-5xl"
						>
							{title}
						</h1>
					)}
				</div>

				<button className="flex items-center gap-x-3 rounded-lg px-2 text-xs font-medium text-colorGray/60 transition-all hover:bg-colorGray/20 hover:text-[--text-rgb] md:-mx-3 md:px-3 md:py-1 md:text-base">
					<FontAwesomeIcon fixedWidth icon={faPlus} className="h-7 p-1 text-[#4F81E1] md:h-8" />
					<p>New table</p>
				</button>
			</div>
		</>
	);
}
