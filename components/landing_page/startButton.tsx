"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

const supabase = createClientComponentClient();

export default function StartButton() {
	const [signedIn, setSignIn] = useState(false);

	useEffect(() => {
		async function checkIfLogged() {
			const { data, error } = await supabase.auth.getSession();

			if (data.session) setSignIn(true);
		}

		checkIfLogged();

		supabase.auth.onAuthStateChange(async (event, session) => {

			if (event == "SIGNED_IN") setSignIn(true);
			else if (event == "SIGNED_OUT") setSignIn(false);

		});
	}, []);

	if (signedIn)
		return (
			<Link href="app">
				<button className="text-md w-fit rounded-lg bg-colorBlue px-6 py-4 font-medium text-white sm:px-7 md:text-lg">Start for free</button>
			</Link>
		);
	else return <></>;
}
