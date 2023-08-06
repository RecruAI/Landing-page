"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DoComponent from "../listPage/doComponent";

export default function SearchBar(props: { dos: DataDoType[] }) {
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
		<div className="mx-auto my-20 flex max-w-7xl flex-col items-stretch rounded-xl bg-[--sidebar-rgb] shadow-md outline outline-2 outline-colorGray/50">
			<div className="mx-7 my-4 flex items-center gap-x-5">
				<FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} className="h-8 w-8 p-2 text-colorGray" />
				<input
					type="text"
					className="w-full bg-transparent text-xl outline-none"
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
						className={`h-7 w-7 px-1.5 transition duration-700 md:h-8 md:w-8 md:px-2 md:py-0.5 ${
							searchPhrase == "" ? "scale-50 opacity-0" : "scale-180 opacity-100"
						}`}
					/>
				</div>
			</div>

			{visibleDos.length != 0 ? (
				<>
					<div className="h-0.5 bg-colorGray/50"></div>
					<div className="mx-7 my-5 flex flex-col gap-y-1">
						{visibleDos.slice(0, 7).map((singleDo) => (
							<DoComponent do={singleDo} key={singleDo.id} />
						))}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
