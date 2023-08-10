"use client";

import SortAndCompareDos from "@/functions/sortAndCompareDos";
import TaskTable from "./taskTable";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function TaskTablesContainer(props: { listData: DataListType; dosData: DataDoType[] }) {
	const [tasks, setTasks] = useState<string[]>(props.listData.tasks);
	const [dos, setDos] = useState<DataDoType[]>(props.dosData);
	const supabase = createClientComponentClient({});

	function handleDosChange(payload: any) {
		if (payload.eventType === "DELETE") {
			setDos((prevDoes) => prevDoes.filter((doData: DataDoType) => doData.id !== payload.old.id));
		} else if (payload.eventType === "INSERT") {
			setDos((prevDoes) => [payload.new, ...prevDoes]);
		} else {
			setDos((prevDoes) => prevDoes.map((doData: DataDoType) => (doData.id === payload.old.id ? payload.new : doData)).sort((doA, doB) => SortAndCompareDos(doA, doB)));
		}
	}

	useEffect(() => {
		const subscription = supabase
			.channel("taskListSub")
			.on("postgres_changes", { event: "UPDATE", schema: "public", table: "lists", filter: `id=eq.${props.listData.id}` }, (payload: any) => setTasks(payload.new.tasks))
			.on("postgres_changes", { event: "*", schema: "public", table: "dos" }, (payload: any) => handleDosChange(payload))
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, props.listData]);

	return (
		<div className="mt-8 flex flex-col gap-y-10 md:mt-16 md:gap-y-20">
			{/* Task table */}

			{tasks.map((task: string, index: number) => {
				const dosForTable: DataDoType[] = dos.filter((singleDo: DataDoType) => singleDo.task == task);

				return <TaskTable task={task} dos={dosForTable} id={props.listData.id} tasks={tasks} index={index} key={task} />;
			})}
		</div>
	);
}
