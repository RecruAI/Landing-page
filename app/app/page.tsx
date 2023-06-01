import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
	const supabase = createServerComponentClient({
		cookies,
	});
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		redirect("/");
	}

	return <div className="ml-80 text-[--text-rgb] 2xl:ml-20vw"></div>;
}
