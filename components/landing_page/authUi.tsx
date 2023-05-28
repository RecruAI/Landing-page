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
			<section className="fixed left-1/2 top-1/2 z-50 w-fit -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-colorGray bg-[--background-rgb] p-8">
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
			<div className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/30" onClick={() => props.closeAuthUi()}></div>
		</>
	);
}
