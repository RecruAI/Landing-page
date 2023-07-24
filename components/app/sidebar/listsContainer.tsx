"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] }[];

export default function ListsContainer(props: { hideSidebar: Function }) {
	const [lists, setLists] = useState<DataListType>([]);
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
			let { data: lists }: PostgrestSingleResponse<DataListType> = await supabase.from("lists").select("*");

			setLists(lists != undefined && lists != null ? lists : []);
			setLoading(false);
		}

		fetchData();

		const subscription = supabase
			.channel("listsContainerSub")
			.on("postgres_changes", { event: "*", schema: "public", table: "lists" }, (payload) => handleListsChange(payload))
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase]);

	return (
		<>
			{loading ? (
				<>
					{/* // Showing loading before fetched data from db */}
					<div className={`sidebarButton animate-pulse bg-colorGray/10`}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[40%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "75ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[85%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "150ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[75%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "225ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[25%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "300ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[65%] rounded bg-colorGray/50"></div>
					</div>
				</>
			) : (
				lists.map((list) => {
					return (
						<Link
							href={"/app/" + list.id}
							className="sidebarButton"
							key={list.id}
							onClick={() => {
								props.hideSidebar();
							}}
						>
							<span className="p-1 text-lg">{list.icon}</span>

							<p className="text-[--text-rgb]">{list.name}</p>

							{/* Indicator showing how many undone 'dos' are on that list (to do later) */}
							{/* <p className="ms-auto text-colorGray">2</p> */}
						</Link>
					);
				})
			)}
		</>
	);
}
	