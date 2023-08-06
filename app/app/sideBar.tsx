"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddListComponent from "@/components/app/sidebar/addListComponent";
import ListLinksContainer from "@/components/app/sidebar/listLinksContainer";
import AccountButton from "@/components/app/sidebar/accountButton";
import QuickActionsMenu from "@/components/app/sidebar/quickActionsMenu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function SideBar() {
	const [visible, setVisible] = useState<Boolean>(false);
	const [addListComponentVisible, setAddListComponentVisible] = useState<Boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [lists, setLists] = useState<DataListType[]>([]);
	const [dos, setDos] = useState<DataDoType[]>([]);

	const supabase = createClientComponentClient({});

	function handleDataChange(prevData: DataListType[] | DataDoType[], payload: any) {
		if (payload.eventType === "DELETE") {
			const arrFixed: Array<(typeof prevData)[number]> = prevData;
			return arrFixed.filter((item: DataListType | DataDoType) => item.id !== payload.old.id);
		} else if (payload.eventType === "INSERT") {
			return [payload.new, ...prevData];
		} else {
			return prevData.map((item) => (item.id === payload.old.id ? payload.new : item));
		}
	}

	useEffect(() => {
		async function fetchData() {
			let { data: lists }: PostgrestSingleResponse<DataListType[]> = await supabase.from("lists").select("*");
			let { data: dos }: PostgrestSingleResponse<DataDoType[]> = await supabase.from("dos").select("*");

			setLists(lists != undefined && lists != null ? lists : []);
			setDos(dos != undefined && dos != null ? dos : []);
			setLoading(false);
		}

		fetchData();

		const subscription = supabase
			.channel("sidebarSub")
			.on("postgres_changes", { event: "*", schema: "public", table: "lists" }, (payload) => setLists((prevData: DataListType[]) => handleDataChange(prevData, payload)))
			.on("postgres_changes", { event: "*", schema: "public", table: "dos" }, (payload) => setDos((prevData: DataDoType[]) => handleDataChange(prevData, payload)))
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase]);

	function hideAddListComponent() {
		setAddListComponentVisible(false);
	}
	function hideSidebar() {
		setVisible(false);
	}

	return (
		<>
			{addListComponentVisible ? <AddListComponent hideComponent={hideAddListComponent} /> : <></>}

			{/* Hamburger button */}
			<div
				className={`fixed z-50 m-2 rounded-md bg-[--sidebar-rgb] p-3 transition-all duration-500 ease-out xl:hidden ${
					visible ? "active left-64 sm:left-72 2xl:left-[20vw]" : "left-0"
				}`}
			>
				<div className={`menu-btn h-4 w-5 cursor-pointer ${visible ? "active" : ""}`} onClick={() => setVisible(!visible)}>
					<span></span>
				</div>
			</div>

			{/* Sidebar */}
			<aside
				className={`fixed z-20 h-screen w-64 overflow-y-auto border-r-1 border-colorGray/20 bg-[--sidebar-rgb] transition-all duration-500 ease-out sm:w-72 2xl:w-1/5 ${
					visible ? "left-0" : "-left-64 sm:-left-72 xl:left-0"
				}`}
			>
				<div className="flex flex-col gap-y-3 px-4 pb-5 pt-7">
					<AccountButton />

					<QuickActionsMenu dos={dos} />
				</div>

				<div className="border-t-1 border-colorGray/20">
					<div className="flex flex-col gap-y-1 px-4 py-5">
						<p className="select-none py-2.5 ps-2 text-lg font-semibold text-[--text-rgb]">Lists</p>

						<ListLinksContainer lists={lists} dos={dos} hideSidebar={() => hideSidebar()} loading={loading} />

						<button
							className="sidebarButton mt-1"
							onClick={() => {
								setAddListComponentVisible(!addListComponentVisible);
								if (!addListComponentVisible) setVisible(false);
							}}
						>
							<FontAwesomeIcon fixedWidth icon={faPlus} className="h-8 w-8 p-1 text-[#4F81E1]" />
							<p className="font-medium text-[--text-rgb]">Add list</p>
						</button>
					</div>
				</div>
			</aside>
		</>
	);
}
