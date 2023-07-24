"use client";

import { faBoxArchive, faCalendar, faCalendarCheck, faHome, faInbox, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuickActionsMenu() {
	return (
		<>
			<div className="flex flex-col gap-y-1">
				<button className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} className="h-8 w-8 p-1.5 text-colorGray" />
					<p className="text-[--text-rgb]">Quick find</p>
				</button>
				<button className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faHome} className="h-8 w-8 p-1.5 text-[#4B81EB]" />
					<p className="text-[--text-rgb]">Home</p>
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
		</>
	);
}
