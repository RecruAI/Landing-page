"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faMagnifyingGlass, faCalendarCheck, faCalendar, faBoxArchive, faBarChart } from "@fortawesome/free-solid-svg-icons";
import AccountButton from "./accountButton";
import AddListButton from "./addListButton";
import ListsContainer from "./listsContainer";
import { useState } from "react";

export default function SideBar() {
	const [visible, setVisible] = useState<Boolean>(false);

	return (
		<>
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
				className={`absolute z-40 h-screen w-64 overflow-y-auto border-r-1 border-colorGray/20 bg-[--sidebar-rgb] transition-all duration-500 ease-out sm:w-72 2xl:w-1/5 ${
					visible ? "left-0" : "-left-64 sm:-left-72 xl:left-0"
				}`}
			>
				<div className="flex flex-col gap-y-3 px-4 pb-5 pt-7">
					<AccountButton />

					<div className="flex flex-col gap-y-1">
						<button className="sidebarButton">
							<FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} className="h-8 w-8 p-1.5 text-colorGray" />
							<p className="text-[--text-rgb]">Quick find</p>
						</button>
						<button className="sidebarButton">
							<FontAwesomeIcon fixedWidth icon={faInbox} className="h-8 w-8 p-1.5 text-[#4B81EB]" />
							<p className="text-[--text-rgb]">Inbox</p>
						</button>
					</div>

					<div className="flex flex-col gap-y-1">
						<button className="sidebarButton">
							<FontAwesomeIcon fixedWidth icon={faCalendarCheck} className="h-8 w-8 p-1.5 text-[#46BF77]" />
							<p className="text-[--text-rgb]">Today</p>
							<p className="ms-auto text-colorGray">21</p>
						</button>

						<button className="sidebarButton">
							<FontAwesomeIcon fixedWidth icon={faCalendar} className="h-8 w-8 p-1.5 text-[#9D59DF]" />
							<p className="text-[--text-rgb]">Upcoming</p>
							<p className="ms-auto text-colorGray">9</p>
						</button>

						<button className="sidebarButton">
							<FontAwesomeIcon fixedWidth icon={faBoxArchive} className="h-8 w-8 p-1.5 text-[#DF8637]" />
							<p className="text-[--text-rgb]">Someday</p>
							<p className="ms-auto text-colorGray">2</p>
						</button>
					</div>
				</div>

				<div className="border-t-1 border-colorGray/20">
					<div className="flex flex-col gap-y-1 px-4 py-5">
						<p className="py-2.5 ps-2 text-lg font-semibold text-[--text-rgb]">Lists</p>

						<ListsContainer />

						<AddListButton />
					</div>
				</div>
			</aside>
		</>
	);
}
