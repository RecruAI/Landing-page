import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faMagnifyingGlass, faCalendarCheck, faCalendar, faBoxArchive } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
	return (
		<aside className="fixed top-0 flex h-screen w-80 flex-col gap-y-4 border-r-1 border-colorGray/20 bg-[--sidebar-rgb] px-4 py-7 2xl:w-1/5">
			<button className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 transition-all hover:bg-colorGray/30">
				<div className="flex h-8 w-8 items-center justify-center rounded bg-[--text-rgb] text-lg font-bold text-[--background-rgb]">A</div>
				<p className="text-lg font-semibold text-[--text-rgb]">Abram Vaccaro</p>
			</button>

			<div className="flex flex-col gap-y-1">
				<button className="sidebarButton">
					<FontAwesomeIcon icon={faMagnifyingGlass} className="h-8 w-8 p-1.5 text-colorGray" />
					<p className="font-medium text-[--text-rgb]">Quick find</p>
				</button>

				<button className="sidebarButton">
					<FontAwesomeIcon icon={faInbox} className="h-8 w-8 p-1.5 text-[#4B81EB]" />
					<p className="font-medium text-[--text-rgb]">Inbox</p>
				</button>
			</div>

			<div className="flex flex-col gap-y-1">
				<button className="sidebarButton">
					<FontAwesomeIcon icon={faCalendarCheck} className="h-8 w-8 p-1.5 text-[#46BF77]" />
					<p className="font-medium text-[--text-rgb]">Today</p>
					<p className="ms-auto font-medium text-colorGray">21</p>
				</button>

				<button className="sidebarButton">
					<FontAwesomeIcon icon={faCalendar} className="h-8 w-8 p-1.5 text-[#9D59DF]" />
					<p className="font-medium text-[--text-rgb]">Upcoming</p>
					<p className="ms-auto font-medium text-colorGray">9</p>
				</button>

				<button className="sidebarButton">
					<FontAwesomeIcon icon={faBoxArchive} className="h-8 w-8 p-1.5 text-[#DF8637]" />
					<p className="font-medium text-[--text-rgb]">Someday</p>
					<p className="ms-auto font-medium text-colorGray">2</p>
				</button>
			</div>
		</aside>
	);
}
