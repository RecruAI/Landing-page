"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import AuthUi from "./authUi";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Header(props: { font: NextFont }) {
	const [authUiShowed, toggleAuthUi] = useState(false);
	const [signedIn, setSignIn] = useState(false);

	const supabase = createClientComponentClient();

	function closeAuthUi() {
		toggleAuthUi(false);
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		setSignIn(false);
		toggleAuthUi(false);
	}

	async function checkIfLogged() {
		const { data, error } = await supabase.auth.getSession();

		if (data.session) setSignIn(true);
	}

	useEffect(() => {
		checkIfLogged();

		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event == "SIGNED_IN") {
				setSignIn(true);
				toggleAuthUi(false);
			}
		});
	}, []);

	return (
		<>
			<header className="w-screen QHD:w-3/4 WQHD:w-2/3 mx-auto flex justify-between py-5 px-10 content-center items-center left-1/2 -translate-x-1/2 fixed">
				<Image src="/landing_page/Icon-Light.svg" width="150" height="0" alt="" />

				<div className={"flex gap-x-5 items-center " + props.font.className}>
					{!signedIn ? (
						<button className={"text-colorBlue h-fit text-xl tracking-wider"} onClick={() => toggleAuthUi(true)}>
							Sign In
						</button>
					) : (
						<>
							<button className={"text-colorGray h-fit text-lg tracking-wider"} onClick={() => signOut()}>
								Log Out
							</button>
							<button className={"text-white bg-colorBlue rounded-md px-8 py-3 text-xl tracking-widest"}>Start</button>
						</>
					)}
				</div>
			</header>

			{authUiShowed ? <AuthUi closeAuthUi={closeAuthUi} /> : <> </>}
		</>
	);
}
