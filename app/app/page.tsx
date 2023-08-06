import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
	const supabase = createServerComponentClient({
		cookies,
	});

	// Fetching users with user id of user
	let { data: users }: PostgrestSingleResponse<UserDataType[]> = await supabase.from("users").select("*");

	let { data: lists }: PostgrestSingleResponse<DataListType[]> = await supabase.from("lists").select("*");
	let { data: dos }: PostgrestSingleResponse<DataDoType[]> = await supabase.from("dos").select("*");
	return (
		<section className="mx-4 mb-10 mt-20 text-[--text-rgb] md:mx-20 md:mb-20 md:mt-28">
			<h1 className="mb-3 text-center text-6xl font-extrabold text-[--text-rgb]">Welcome back {users![0].name}!</h1>
			<h3 className="mb-20 text-center text-3xl font-normal text-colorGray/70">Have a nice productive day!</h3>

			<h3 className="mb-7 text-4xl font-bold">Your lists</h3>

			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
				{lists!.map((list) => {
					const dosForList: DataDoType[] = dos!.filter((singleDo: DataDoType) => singleDo.list == list.id && !singleDo.done);

					return (
						<Link
							href={`/app/${list.id}`}
							className="flex items-center gap-x-3 rounded-lg px-5 py-2 outline outline-2 outline-colorGray/50 transition-all hover:bg-colorGray/10 md:gap-x-4 md:py-4"
						>
							<p className="text-2xl">{list.icon}</p>

							<p className="font-semibold	">{list.name}</p>

							<div className="grow" />

							<p className="ms-auto text-colorGray">{dosForList.length != 0 ? dosForList.length : ""}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
