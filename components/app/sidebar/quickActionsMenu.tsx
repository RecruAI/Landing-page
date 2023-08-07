"use client";

import checkIfPastDate from "@/functions/checkIfPastDate";
import { faBoxArchive, faCalendar, faCalendarCheck, faHome, faInbox, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuickActionsMenu(props: { dos: DataDoType[]; toggleComponent: Function }) {
	const [today, setToday] = useState<number | undefined>(undefined);
	const [nextWeek, setNextWeek] = useState<number | undefined>(undefined);
	const [forgotten, setForgotten] = useState<number | undefined>(undefined);

	useEffect(() => {
		setToday(
			props.dos.filter((singleDo: DataDoType) => {
				// Setting dates
				const dateToCheck = new Date(singleDo.due_date);
				const dateNow = new Date(new Date().toDateString());

				return dateToCheck.toDateString() == dateNow.toDateString();
			}).length
		);

		setNextWeek(
			props.dos.filter((singleDo: DataDoType) => {
				// Setting dates
				const dateToCheck = new Date(singleDo.due_date);
				const dateNow = new Date(new Date().toDateString());

				// Setting time to 00:00
				dateToCheck.setHours(0, 0, 0, 0);
				dateNow.setHours(0, 0, 0, 0);

				// Setting next weeks date
				const nextWeekDate = new Date();
				nextWeekDate.setDate(nextWeekDate.getDate() + 7);

				return dateToCheck.getTime() > dateNow.getTime() && dateToCheck.getTime() < nextWeekDate.getTime();
			}).length
		);

		setForgotten(props.dos.filter((singleDo: DataDoType) => checkIfPastDate(singleDo.due_date) && !singleDo.done).length);
	}, [props.dos]);

	return (
		<>
			<div className="flex flex-col gap-y-1">
				<button className="sidebarButton" onClick={() => props.toggleComponent()}>
					<FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} className="h-8 w-8 p-1.5 text-colorGray" />
					<p className="text-[--text-rgb]">Quick find</p>
				</button>
				<Link href={"/app"} className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faHome} className="h-8 w-8 p-1.5 text-[#4B81EB]" />
					<p className="text-[--text-rgb]">Home</p>
				</Link>
			</div>

			<div className="flex flex-col gap-y-1">
				<Link href={"/app/quick/today"} className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faCalendarCheck} className="h-8 w-8 p-1.5 text-[#46BF77]" />
					<p className="text-[--text-rgb]">Today</p>
					<p className="ms-auto text-colorGray">{today ?? ""}</p>
				</Link>

				<Link href={"/app/quick/nextweek"} className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faCalendar} className="h-8 w-8 p-1.5 text-[#9D59DF]" />
					<p className="text-[--text-rgb]">Next week</p>
					<p className="ms-auto text-colorGray">{nextWeek ?? ""}</p>
				</Link>

				<Link href={"/app/quick/forgotten"} className="sidebarButton">
					<FontAwesomeIcon fixedWidth icon={faBoxArchive} className="h-8 w-8 p-1.5 text-[#df3737]" />
					<p className="text-[--text-rgb]">Forgotten</p>
					<p className="ms-auto text-colorGray">{forgotten ?? ""}</p>
				</Link>
			</div>
		</>
	);
}
