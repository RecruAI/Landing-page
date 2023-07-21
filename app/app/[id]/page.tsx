import ListHeading from "@/components/app/listPage/listHeading";
import TasksList from "@/components/app/listPage/tasksList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] };

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient({
		cookies,
	});

	let { data }: any = await supabase.from("lists").select().eq("id", params.id);

	if (data == null || data.lenght == 0) redirect("/app");

	let dataList: DataListType = data[0];

	return (
		<article className="mx-4 mb-10 mt-20 text-[--text-rgb] md:mx-20 md:mb-20 md:mt-28">
			<ListHeading icon={dataList.icon} name={dataList.name} id={params.id} />

			<TasksList listData={dataList} />
		</article>
	);
}
