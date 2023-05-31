"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import AuthUi from "./authUi";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const supabase = createClientComponentClient();

export default function Header(props: { font: NextFont }) {
	const [authUiShowed, toggleAuthUi] = useState(false);
	const [signedIn, setSignIn] = useState(false);

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
			<header className="responsiveWidth fixed left-1/2 z-30 flex -translate-x-1/2 content-center items-center justify-between px-5 py-3 backdrop-blur-md sm:py-5 md:px-8 lg:px-10">
				<picture>
					<source srcSet="/landing_page/Icon-Dark.svg" media="(prefers-color-scheme: dark)" />
					<Image
						src="/landing_page/Icon-Light.svg"
						width="150"
						height="0"
						alt="Logo image"
						className="-translate-x-1/4 scale-50 md:-translate-x-0 md:scale-75 lg:scale-100"
					/>
				</picture>

				<div className={"flex items-center gap-x-5 " + props.font.className}>
					{!signedIn ? (
						<button className={"h-fit text-sm tracking-wider text-colorBlue md:text-lg lg:text-xl"} onClick={() => toggleAuthUi(true)}>
							Sign In
						</button>
					) : (
						<>
							<button className={"md:text-md invisible h-fit text-sm tracking-wider text-colorGray md:visible lg:text-lg"} onClick={() => signOut()}>
								Log Out
							</button>

							<button className={"rounded-lg bg-colorBlue px-5 py-2 text-sm tracking-widest text-white md:text-lg lg:px-8 lg:py-3 lg:text-xl"}>Start</button>

							<FontAwesomeIcon icon={faSignOut} onClick={() => signOut()} className="visible h-5 text-colorGray md:invisible" />
						</>
					)}
				</div>
			</header>

			{authUiShowed ? <AuthUi closeAuthUi={closeAuthUi} /> : <> </>}
		</>
	);
}
