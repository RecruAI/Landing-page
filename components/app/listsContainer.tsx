"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import Link from "next/link";
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

	const supabase = createClientComponentClient({});

	useEffect(() => {
		async function fetchData() {
			let { data: lists }: PostgrestSingleResponse<dataType> = await supabase.from("lists").select("*");

			setLists(lists != undefined && lists != null ? lists : []);
		}

		fetchData();

		supabase
			.channel("any")
			.on("postgres_changes", { event: "*", schema: "public", table: "lists" }, (payload) => handleListsChange(payload))
			.subscribe();

		function handleListsChange(payload: any) {
			if (payload.eventType == "DELETE") {
				const newArray = lists.filter(function (item: any) {
					return item.id != payload.old.id;
				});
				setLists(newArray);
			} else if (payload.eventType == "INSERT") {
				let newArray = lists;
				newArray.unshift(payload.new);
				setLists(newArray);
			} else {
				let objIndex: number = lists.findIndex((obj) => obj.id == payload.old.id);
				let newArray = lists;
				newArray[objIndex] = payload.new;
				setLists(newArray);
			}
		}
	}, []);

	return (
		<>
			{lists.length != 0 ? (
				lists.map((list) => {
					return (
						<Link href={"/app/" + list.id} className="sidebarButton" key={list.id}>
							<span className="p-1 text-lg">{list.icon}</span>

							<p className="text-[--text-rgb]">{list.name}</p>

							{/* Indicator showing how many undone 'dos' are on that list (to do later) */}
							{/* <p className="ms-auto text-colorGray">2</p> */}
						</Link>
					);
				})
			) : (
				// Showing loading before fetched data from db
				<button className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faSpinner} className="h-8 w-8 p-1.5 text-colorGray" />

					<p className="text-[--text-rgb]">Loading...</p>
				</button>
			)}
		</>
	);
}
