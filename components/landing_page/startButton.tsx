"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function StartButton() {
	const [signedIn, setSignIn] = useState(false);

	useEffect(() => {
		const supabase = createClientComponentClient();

		async function checkIfLogged() {
			const { data, error } = await supabase.auth.getSession();

			if (data.session) setSignIn(true);
		}

		checkIfLogged();

		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event == "SIGNED_IN") {
				setSignIn(true);
			}
		});
	}, []);

	if (signedIn) return <button className={"text-white bg-colorBlue rounded-lg px-6 sm:px-7 py-4 text-md md:text-lg font-medium w-fit"}>Start for free</button>;
	else return <></>;
}
