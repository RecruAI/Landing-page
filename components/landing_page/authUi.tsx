"use client";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthUi(props: { closeAuthUi: Function }) {
	const supabase = createClientComponentClient();

	const [theme, setTheme] = useState(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

	useEffect(() => {
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
			setTheme(event.matches);
		});
	}, []);

	return (
		<>
			<section className="absolute z-50 bg-[--background-rgb] border-2 border-colorGray p-8 rounded-2xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: "rgb(51, 97, 227)",
									brandAccent: "rgb(41, 87, 217)",
								},
							},
						},
					}}
					providers={["google", "facebook", "github"]}
					theme={theme ? "dark" : "default"}
				/>
			</section>
			<div className="w-screen h-screen z-40 bg-black/30" onClick={() => props.closeAuthUi()}></div>
		</>
	);
}
