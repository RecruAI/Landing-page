"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import AuthUi from "./authUi";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Header(props: { font: NextFont }) {
	const [authUiShowed, toggleAuthUi] = useState(false);
	const [signedIn, setSignIn] = useState(false);

	const [theme, setTheme] = useState(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

	useEffect(() => {
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
			setTheme(event.matches);
		});
	}, []);

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
			<header className="responsiveWidth left-1/2 -translate-x-1/2 flex z-30 justify-between py-5 px-10 content-center items-center  fixed">
				<Image src={!theme ? "/landing_page/Icon-Light.svg" : "/landing_page/Icon-Dark.svg"} width="150" height="0" alt="Logo image" />

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
							<button className={"text-white bg-colorBlue rounded-lg px-8 py-3 text-xl tracking-widest"}>Start</button>
						</>
					)}
				</div>
			</header>

			{authUiShowed ? <AuthUi closeAuthUi={closeAuthUi} /> : <> </>}
		</>
	);
}
