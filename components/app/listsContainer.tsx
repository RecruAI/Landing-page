"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Key, useEffect, useState } from "react";

export default function ListsContainer() {
	const [lists, setLists] = useState<any[]>();

	const supabase = createClientComponentClient({});

	useEffect(() => {
		async function fetchData() {
			let { data: lists, error } = await supabase.from("lists").select("*");

			setLists(lists != null ? lists : []);
		}

		fetchData();
	}, []);

	return (
		<>
			{lists != undefined ? (
				lists.map((list, index) => {
					return (
						<button className="listButton" key={index}>
							<span className="p-1 text-lg">{list.icon}</span>

							<p className="text-[--text-rgb]">{list.name}</p>

							{/* Indicator showing how many undone 'dos' are on that list (to do later) */}
							{/* <p className="ms-auto text-colorGray">2</p> */}
						</button>
					);
				})
			) : (
				// Showing loading before fetched data from db
				<button className="listButton">
					<FontAwesomeIcon fixedWidth icon={faSpinner} className="h-8 w-8 p-1.5 text-colorGray" />

					<p className="text-[--text-rgb]">Loading...</p>
				</button>
			)}
		</>
	);
}
