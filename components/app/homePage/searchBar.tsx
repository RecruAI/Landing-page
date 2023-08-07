"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchDoTile from "./searchDoTile";
import SortAndCompareDos from "@/functions/sortAndCompareDos";

export default function SearchBar(props: { dos: DataDoType[]; lists: DataListType[] }) {
	const [dos, setDos] = useState<DataDoType[]>(props.dos);
	const [visibleDos, setVisibleDos] = useState<DataDoType[]>([]);
	const [searchPhrase, setSearchPhrase] = useState<string>("");

	useEffect(() => {
		setDos(props.dos);
	}, [props.dos]);

	useEffect(() => {
		if (searchPhrase != "") {
			const newVisibleDos = dos.filter((singleDo) => singleDo.name.toLocaleLowerCase().includes(searchPhrase.toLocaleLowerCase()));
			setVisibleDos(newVisibleDos);
		} else setVisibleDos([]);
	}, [searchPhrase, dos]);

	return (
		<div className="z-50 mx-auto my-10 flex max-w-6xl flex-col items-stretch rounded-lg bg-[--sidebar-rgb] shadow-md outline outline-2 outline-colorGray/50 md:my-20 md:rounded-xl">
			<div className="mx-1.5 my-1 flex items-center gap-x-2 md:mx-7 md:my-2 md:gap-x-5">
				<FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} className="h-4 w-4 p-2 text-colorGray md:h-8 md:w-8" />
				<input
					type="text"
					className="w-full bg-transparent outline-none md:text-xl"
					placeholder="Search..."
					value={searchPhrase}
					onChange={(e) => setSearchPhrase(e.target.value)}
				/>

				<div
					onClick={() => setSearchPhrase("")}
					className={`flex rounded-lg text-colorGray transition duration-200 ${searchPhrase == "" ? "" : "cursor-pointer hover:bg-colorGray/30"}`}
				>
					<FontAwesomeIcon
						fixedWidth
						icon={faClose}
						className={`h-4 w-4 px-0.5 py-1 transition duration-700 md:h-8 md:w-8 md:px-2 md:py-0.5 ${
							searchPhrase == "" ? "scale-50 opacity-0" : "scale-180 opacity-100"
						}`}
					/>
				</div>
			</div>

			{searchPhrase != "" ? (
				<>
					<div className="h-0.5 bg-colorGray/50"></div>
					<div className="flex flex-col">
						{visibleDos
							.slice(0, 7)
							.sort((doA, doB) => SortAndCompareDos(doA, doB))
							.map((singleDo) => (
								<SearchDoTile do={singleDo} key={singleDo.id} list={props.lists.filter((list) => list.id == singleDo.list)[0]} />
							))}

						<p
							className={`flex flex-col rounded-b-lg border-t-2 border-colorGray/50 bg-colorGray/5 py-2 text-center text-sm transition-none md:rounded-b-xl md:py-5 md:text-base ${
								visibleDos.length == 0 || visibleDos.length > 7 ? "block" : "hidden"
							}`}
						>
							{visibleDos.length > 7 ? "There is " + (visibleDos.length - 7) + " more results to show..." : "There are no results to show"}
						</p>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
