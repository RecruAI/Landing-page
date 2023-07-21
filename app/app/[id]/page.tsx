import Title from "@/components/app/title";
import { faArrowsRotate, faDiagramProject, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] };

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient({
		cookies,
	});
	const checkbox = true;

	let { data }: any = await supabase.from("lists").select().eq("id", params.id);

	if (data == null) redirect("/app");

	let dataList: DataListType = data[0];

	return (
		<article className="mx-20 mt-28 text-[--text-rgb]">
			<Title icon={dataList.icon} name={dataList.name} id={params.id} />

			<div className="mt-16 flex flex-col gap-y-20">
				{/* Task table */}
				<div className="flex flex-col gap-y-1">
					{/* Task table title row */}
					<div className="flex flex-row items-center gap-x-3">
						<h2 className="text-2xl font-bold text-[--text-rgb]">Skincare</h2>
						<p className="text-md font-medium text-colorGray">4</p>

						{/* Spacer */}
						<div className="grow" />

						<div className="flex rounded-lg transition-all hover:bg-colorGray/20">
							<FontAwesomeIcon fixedWidth icon={faPlus} className="aspect-square h-8 cursor-pointer p-1 px-2.5 text-[#4F81E1]" />
						</div>
					</div>

					{/* Spacer */}
					<div className="my-1 h-px w-full bg-colorGray/20" />

					{/* Tasks */}
					<div className="flex flex-col gap-y-1">
						{/* Example of task */}
						<button className={`taskTile text-clip ${checkbox ? "taskTileDone" : "taskTileUndone"}`}>
							{/* Checkbox */}
							<div
								// onClick={() => setCheckbox(!checkbox)}
								className="relative my-2.5 flex items-center transition-all duration-300 ease-bouncy-bezier"
							>
								<span className={`spanCheckbox ${checkbox ? "activeSpanCheckbox" : ""}`}></span>
							</div>

							{/* Title */}
							<p className={checkbox ? "line-through" : ""}>Example task</p>

							{/* Date tile */}
							{/* Today */}
							<div className="rounded-md bg-green-500/10 px-2 py-1 text-sm text-green-500">Today</div>
							{/* Other */}
							<div className="rounded-md bg-colorGray/10 px-2 py-1 text-sm text-colorGray">Tommorow</div>

							{/* Spacer */}
							<div className="grow" />

							{/* Amount of subtasks */}
							<div className="flex flex-row items-center gap-x-2 text-sm text-colorGray/50">
								<FontAwesomeIcon fixedWidth icon={faDiagramProject} className="aspect-square h-3.5" />
								2/4
							</div>

							<FontAwesomeIcon fixedWidth icon={faArrowsRotate} className="aspect-square h-3.5 text-colorGray/50" />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}