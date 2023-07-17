"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type dataType = {
	id: string;
	user_id: string;
	name: string;
	icon: string;
	date_created: string;
}[];

export default function ListsContainer() {
	const [lists, setLists] = useState<dataType>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const supabase = createClientComponentClient({});

	function handleListsChange(payload: any) {
		if (payload.eventType === "DELETE") {
			setLists((prevLists) => prevLists.filter((item) => item.id !== payload.old.id));
		} else if (payload.eventType === "INSERT") {
			setLists((prevLists) => [payload.new, ...prevLists]);
		} else {
			setLists((prevLists) => prevLists.map((item) => (item.id === payload.old.id ? payload.new : item)));
		}
	}

	useEffect(() => {
		async function fetchData() {
			let { data: lists }: PostgrestSingleResponse<dataType> = await supabase.from("lists").select("*");

			setLists(lists != undefined && lists != null ? lists : []);
			setLoading(false);
		}

		fetchData();

		supabase
			.channel("any")
			.on("postgres_changes", { event: "*", schema: "public", table: "lists" }, (payload) => handleListsChange(payload))
			.subscribe();
	}, []);

	return (
		<>
			{loading ? (
				// Showing loading before fetched data from db
				<button className="listButton">
					<FontAwesomeIcon fixedWidth icon={faSpinner} className="h-8 w-8 p-1.5 text-colorGray" />

					<p className="text-[--text-rgb]">Loading...</p>
				</button>
			) : (
				lists.map((list) => {
					return (
						<button className="listButton" key={list.id}>
							<span className="p-1 text-lg">{list.icon}</span>

							<p className="text-[--text-rgb]">{list.name}</p>

							{/* Indicator showing how many undone 'dos' are on that list (to do later) */}
							{/* <p className="ms-auto text-colorGray">2</p> */}
						</button>
					);
				})
			)}
		</>
	);
}
