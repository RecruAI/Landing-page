import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faMagnifyingGlass, faCalendarCheck, faCalendar, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import AccountButton from "./accountButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddListButton from "./addListButton";
import ListsContainer from "./listsContainer";

export default async function SideBar() {
	// Creating supabase connection
	const supabase = createServerComponentClient({
		cookies,
	});
	const {
		data: { session },
	} = await supabase.auth.getSession();

const userSessionId: String | undefined = session?.user.id;

// Fetching user data from db
let { data: users, error } = await supabase.from("users").select().eq("user_id", userSessionId);

	return (
		<aside className="absolute -left-full h-screen w-80 overflow-y-auto scroll-smooth border-r-1 border-colorGray/20 bg-[--sidebar-rgb] xl:left-0 2xl:w-1/5">
			<div className="flex flex-col gap-y-3 px-4 pb-5 pt-7">
				{/* Mapping over returned users (always one) */}
				{/* Returning account tile with name from db */}
				{users?.map((user) => {
					return <AccountButton name={`${user?.name} ${user?.last_name}`} key={user.id} />;
				})}

				<div className="flex flex-col gap-y-1">
					<button className="sidebarButton">
						<FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} className="h-8 w-8 p-1.5 text-colorGray" />
						<p className="font-medium text-[--text-rgb]">Quick find</p>
					</button>
					<button className="sidebarButton">
						<FontAwesomeIcon fixedWidth icon={faInbox} className="h-8 w-8 p-1.5 text-[#4B81EB]" />
						<p className="font-medium text-[--text-rgb]">Inbox</p>
					</button>
				</div>

				<div className="flex flex-col gap-y-1">
					<button className="sidebarButton">
						<FontAwesomeIcon fixedWidth icon={faCalendarCheck} className="h-8 w-8 p-1.5 text-[#46BF77]" />
						<p className="font-medium text-[--text-rgb]">Today</p>
						<p className="ms-auto font-medium text-colorGray">21</p>
					</button>

					<button className="sidebarButton">
						<FontAwesomeIcon fixedWidth icon={faCalendar} className="h-8 w-8 p-1.5 text-[#9D59DF]" />
						<p className="font-medium text-[--text-rgb]">Upcoming</p>
						<p className="ms-auto font-medium text-colorGray">9</p>
					</button>

					<button className="sidebarButton">
						<FontAwesomeIcon fixedWidth icon={faBoxArchive} className="h-8 w-8 p-1.5 text-[#DF8637]" />
						<p className="font-medium text-[--text-rgb]">Someday</p>
						<p className="ms-auto font-medium text-colorGray">2</p>
					</button>
				</div>
			</div>

			<div className="border-t-1 border-colorGray/20">
				<div className="flex flex-col gap-y-1  px-4 py-5">
					<p className="py-2.5 ps-2 text-xl font-semibold text-[--text-rgb]">Lists</p>

					<ListsContainer />

					<AddListButton userId={userSessionId} />
				</div>
			</div>
		</aside>
	);
}
