import QuickAddList from "@/components/app/homePage/quickAddList";
import SearchBar from "@/components/app/homePage/searchBar";
import checkIfPastDate from "@/functions/checkIfPastDate";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const supabase = createServerComponentClient({
		cookies,
	});

	// Fetching users with user id of user
	let { data: users }: PostgrestSingleResponse<UserDataType[]> = await supabase.from("users").select("*");

	let { data: lists }: PostgrestSingleResponse<DataListType[]> = await supabase.from("lists").select("*");
	let { data: dos }: PostgrestSingleResponse<DataDoType[]> = await supabase.from("dos").select("*");

	if (lists == null || dos == null) redirect("/");

	return (
		<section className="mx-4 mb-10 mt-20 text-[--text-rgb] md:mx-20 md:mb-20 md:mt-28 2xl:mx-36">
			<h1 className="mb-4 text-center text-6xl font-extrabold sm:text-7xl md:mb-8 md:text-8xl">📋</h1>
			<h1 className="text-center text-2xl font-extrabold text-[--text-rgb] md:mb-3 md:text-5xl">Welcome back {users![0].name}!</h1>
			<h3 className="mb-6 text-center text-xl font-normal text-colorGray/70 md:mb-20 md:text-3xl">Have a nice productive day!</h3>

			<SearchBar dos={dos.filter((singleDo) => !singleDo.done || (!checkIfPastDate(singleDo.due_date) && singleDo.done))} />

			<h3 className="mb-4 text-xl font-bold md:mb-7 md:text-4xl">Your lists</h3>

			<QuickAddList />

			<div className="mt-5 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 2xl:grid-cols-3">
				{lists!.map((list) => {
					const dosForList: DataDoType[] = dos!.filter((singleDo: DataDoType) => singleDo.list == list.id && !singleDo.done);

					return (
						<Link
							key={list.id}
							href={`/app/${list.id}`}
							className="flex items-center gap-x-3 rounded-lg px-5 py-2 outline outline-2 outline-colorGray/50 transition-all hover:bg-colorGray/10 md:gap-x-4 md:py-4"
						>
							<p className="sm:text-xl md:text-2xl">{list.icon}</p>

							<p className="text-sm font-semibold md:text-base">{list.name}</p>

							<div className="grow" />

							<p className="ms-auto text-xs text-colorGray sm:text-sm md:text-base">{dosForList.length != 0 ? dosForList.length : ""}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
