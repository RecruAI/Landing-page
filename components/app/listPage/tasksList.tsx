"use client";

import TaskTable from "./taskTable";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] };

export default function TasksList(props: { listData: DataListType }) {
	return (
		<div className="mt-8 flex flex-col gap-y-10 md:mt-16 md:gap-y-20">
			{/* Task table */}
			{props.listData.tasks.map((task: string, index: number) => (
				<TaskTable task={task} id={props.listData.id} tasks={props.listData.tasks} index={index} key={index} />
			))}
		</div>
	);
}
