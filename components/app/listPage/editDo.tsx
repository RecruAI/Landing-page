"Use client";

type DataDoType = {
	due_date: string;
	name: string;
	description: string;
	task: string;
	id: string;
	list: string;
	sub_tasks: SubTaskType[];
	done: boolean;
};
type SubTaskType = { id: number; name: string; done: boolean };

export default function EditDo(props: { do: DataDoType; dateTileText: string; dateTileTense: number }) {
	return (
		<div className="z-50 mt-10 flex flex-col items-start gap-x-10 gap-y-7 rounded-lg bg-[--sidebar-rgb] px-7 py-6 font-medium shadow-md sm:px-10 md:flex-row">
			<div className="flex flex-col gap-y-3 md:w-1/2">
				<div className="flex flex-row items-center gap-x-7">
					<p className="text-xs md:text-base">{props.do.name}</p>

					<div
						className={`w-fit rounded-md px-1.5 py-0.5 text-2xs md:px-2 md:py-1 md:text-sm ${
							props.dateTileTense == 0
								? "bg-green-500/10 text-green-500"
								: props.dateTileTense == 1
								? "bg-colorGray/10 text-colorGray"
								: "bg-red-500/10 text-red-500"
						}`}
					>
						{props.dateTileText}
					</div>
				</div>

				<p className="text-2xs font-normal text-colorGray md:text-sm">{props.do.description}</p>
			</div>

			<div className="flex flex-col gap-y-3 md:w-1/2">
				<p className="text-xs md:mb-2 md:text-base">Sub tasks</p>

				{props.do.sub_tasks.map((sub_task) => (
					<div key={sub_task.id} className="flex flex-row items-center gap-x-2 md:gap-x-4">
						<div className="relative z-30 flex cursor-pointer items-center transition-all duration-300 ease-bouncy-bezier">
							<span className={`spanCheckbox !rounded-full ${sub_task.done ? "activeSpanCheckbox" : ""}`}></span>
						</div>

						<p className={`text-2xs md:text-sm ${sub_task.done ? "text-colorGray/50 line-through" : ""}`}>{sub_task.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
