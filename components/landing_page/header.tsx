"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import AuthUi from "./authUi";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

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

	useEffect(() => {
		async function checkIfLogged() {
			const { data, error } = await supabase.auth.getSession();

			if (data.session) setSignIn(true);
		}
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
			<header className="responsiveWidth left-1/2 -translate-x-1/2 flex z-30 justify-between py-5 px-5 md:px-8 lg:px-10 content-center items-center fixed">
				<picture>
					<source srcSet="/landing_page/Icon-Dark.svg" media="(prefers-color-scheme: dark)" />
					<Image
						src="/landing_page/Icon-Light.svg"
						width="150"
						height="0"
						alt="Logo image"
						className="scale-50 lg:scale-100 md:scale-75 -translate-x-1/4  md:-translate-x-0"
					/>
				</picture>

				<div className={"flex gap-x-5 items-center " + props.font.className}>
					{!signedIn ? (
						<button className={"text-colorBlue h-fit text-sm md:text-lg lg:text-xl tracking-wider"} onClick={() => toggleAuthUi(true)}>
							Sign In
						</button>
					) : (
						<>
							<button className={"text-colorGray h-fit text-sm md:text-md lg:text-lg tracking-wider invisible md:visible"} onClick={() => signOut()}>
								Log Out
							</button>

							<button className={"text-white bg-colorBlue rounded-lg px-5 lg:px-8 py-2 lg:py-3 text-sm md:text-lg lg:text-xl tracking-widest"}>Start</button>

							<FontAwesomeIcon icon={faSignOut} onClick={() => signOut()} className="text-colorGray h-5 md:invisible visible" />
						</>
					)}
				</div>
			</header>

			{authUiShowed ? <AuthUi closeAuthUi={closeAuthUi} /> : <> </>}
		</>
	);
}
