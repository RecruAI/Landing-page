"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Title(props: { icon: string; name: string }) {
	const [title, setTitle] = useState<string>(props.name);
	const [titleEditing, setTitleEditing] = useState<Boolean>(false);

	return (
		<div className="flex flex-col gap-y-8">
			<p className="-ms-2 w-fit cursor-pointer rounded-lg p-2 text-6xl transition-all hover:bg-colorGray/20">{props.icon}</p>
			{titleEditing ? (
				<input
					autoFocus
					value={title}
					onBlur={() => setTitleEditing(false)}
					onChange={(e) => setTitle(e.target.value)}
					className="-ms-5 w-fit cursor-pointer rounded-lg bg-transparent px-5 py-2 text-5xl font-semibold text-[--text-rgb] outline-none transition-all"
				/>
			) : (
				<h1
					onClick={() => setTitleEditing(true)}
					className="-ms-5 w-fit cursor-pointer rounded-lg px-5 py-2 text-5xl font-semibold text-[--text-rgb] transition-all hover:bg-colorGray/20"
				>
					{title}
				</h1>
			)}
			<button className="text-md -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-1 font-medium text-colorGray/60 transition-all hover:bg-colorGray/20 hover:text-[--text-rgb]">
				<FontAwesomeIcon fixedWidth icon={faPlus} className="h-8 w-8 p-1 text-[#4F81E1]" />
				<p>New table</p>
			</button>
		</div>
	);
}
