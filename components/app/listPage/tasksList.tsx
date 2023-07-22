"use client";

import TaskTable from "./taskTable";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] };
type DataDoType = { due_date: string; name: string; description: string; task: string; id: string; list: string; sub_tasks: []; done: boolean };

export default function TasksList(props: { listData: DataListType; dosData: DataDoType[] }) {
	const [tasks, setTasks] = useState<string[]>(props.listData.tasks);
	const [dos, setDos] = useState<DataDoType[]>(props.dosData);
	const supabase = createClientComponentClient({});

	function handleListsChange(payload: any) {
		if (payload.eventType === "DELETE") {
			setDos((prevDoes) => prevDoes.filter((doData: DataDoType) => doData.id !== payload.old.id));
		} else if (payload.eventType === "INSERT") {
			setDos((prevDoes) => [payload.new, ...prevDoes]);
		} else {
			setDos((prevDoes) => prevDoes.map((doData: DataDoType) => (doData.id === payload.old.id ? payload.new : doData)));
		}
	}

	useEffect(() => {
		const subscriptionList = supabase
			.channel("taskListSub")
			.on("postgres_changes", { event: "UPDATE", schema: "public", table: "lists", filter: `id=eq.${props.listData.id}` }, (payload: any) => setTasks(payload.new.tasks))
			.subscribe();

		const subscriptionDos = supabase
			.channel("taskListSub")
			.on("postgres_changes", { event: "*", schema: "public", table: "dos" }, (payload: any) => handleListsChange(payload))
			.subscribe();

		return () => {
			subscriptionList.unsubscribe();
			subscriptionDos.unsubscribe();
		};
	}, [supabase]);

	return (
		<div className="mt-8 flex flex-col gap-y-10 md:mt-16 md:gap-y-20">
			{/* Task table */}

			{tasks.map((task: string, index: number) => {
				const dosForTable: DataDoType[] = dos.filter((singleDo: DataDoType) => singleDo.task == task);

				return <TaskTable task={task} dos={dosForTable} id={props.listData.id} tasks={tasks} index={index} key={index} />;
			})}
		</div>
	);
}
