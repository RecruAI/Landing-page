import GetAccountData from "@/components/app/getAccountData";
import SideBar from "@/components/app/sideBar";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	// Creating connection with supabase
	const supabase = createServerComponentClient({
		cookies,
	});
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// If session is null (user isnt logged in) redirect to landing page
	if (!session) {
		redirect("/");
	} else {
		// Fetching users with user id of user
		let { data: users, error } = await supabase.from("users").select().eq("user_id", session.user.id);

		// Checking if there is record in db with user id
		if (users?.length! > 0) {
			return (
				<main>
					<SideBar />
					<div className="absolute xl:ms-80 2xl:ms-20vw">{children}</div>
				</main>
			);

			// If there is no user with that id show form
			// In the form user provide name, last name, etc
			// After that record in db is created
		} else return <GetAccountData user={session.user} />;
	}
}
