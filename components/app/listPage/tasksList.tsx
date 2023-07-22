"use client";

import TaskTable from "./taskTable";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] };

export default function TasksList(props: { listData: DataListType }) {
	const [tasks, setTasks] = useState<string[]>(props.listData.tasks);
	const supabase = createClientComponentClient({});

	useEffect(() => {
		const subscription = supabase
			.channel("taskListSub")
			.on("postgres_changes", { event: "UPDATE", schema: "public", table: "lists" }, (payload: any) => setTasks(payload.new.tasks))
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase]);

	return (
		<div className="mt-8 flex flex-col gap-y-10 md:mt-16 md:gap-y-20">
			{/* Task table */}
			{tasks.map((task: string, index: number) => (
				<>
					<TaskTable task={task} id={props.listData.id} tasks={tasks} index={index} key={index} />
				</>
			))}
		</div>
	);
}
