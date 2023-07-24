"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddListComponent from "@/components/app/sidebar/addListComponent";
import ListsContainer from "@/components/app/sidebar/listsContainer";
import AccountButton from "@/components/app/sidebar/accountButton";
import QuickActionsMenu from "@/components/app/sidebar/quickActionsMenu";
import { useState } from "react";

export default function SideBar() {
	const [visible, setVisible] = useState<Boolean>(false);
	const [addListComponentVisible, setAddListComponentVisible] = useState<Boolean>(false);

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

					<QuickActionsMenu />
				</div>

				<div className="border-t-1 border-colorGray/20">
					<div className="flex flex-col gap-y-1 px-4 py-5">
						<p className="select-none py-2.5 ps-2 text-lg font-semibold text-[--text-rgb]">Lists</p>

						<ListsContainer hideSidebar={() => hideSidebar()} />

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
