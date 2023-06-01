import GetAccountData from "@/components/app/getAccountData";
import SideBar from "@/components/app/sideBar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({
		cookies,
	});
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/");
	} else {
		let { data: users, error } = await supabase.from("users").select();

		if (!users) {
			return (
				<main>
					<SideBar />
					{children}
				</main>
			);
		} else return <GetAccountData />;
	}
}
