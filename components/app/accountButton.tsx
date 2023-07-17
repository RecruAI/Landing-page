"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSignOut } from "@fortawesome/free-solid-svg-icons";

const supabase = createClientComponentClient();

export default function AccountButton() {
	const [visible, setVisible] = useState<boolean>(false);
	const [name, setName] = useState<String>("Loading...");
	const [nickname, setNickname] = useState<String>();
	const { push } = useRouter();

	useEffect(() => {
		async function fetch() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			const { data: user_name }: any = await supabase.from("users").select().eq("user_id", session?.user.id);
			setNickname(user_name[0].nickname);
			setName(user_name[0].name + " " + user_name[0].last_name);
		}
		fetch();
	}, []);

	return (
		<>
			<div className="relative z-50">
				<div
					onClick={() => setVisible(!visible)}
					className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg px-3 py-2 transition-all hover:bg-colorGray/30"
				>
					<div className="flex h-9 w-9 items-center justify-center rounded-md bg-[--text-rgb] text-lg font-bold text-[--background-rgb]">
						{nickname != undefined ? nickname.slice(0, 1).toLocaleUpperCase() : "*"}
					</div>

					<div className="flex flex-col">
						<p className="text-md font-semibold text-[--text-rgb]">{nickname}</p>
						<p className="text-xs font-medium text-[--text-rgb] opacity-70">{name}</p>
					</div>
				</div>

				{/* Tiles opened if 'visible' is true */}
				{visible ? (
					<div className="absolute -bottom-3 left-0 flex w-full translate-y-full flex-col gap-y-1 rounded-lg bg-[--background-rgb] px-2 py-3 shadow-md">
						<button className="sidebarButton" onClick={async () => push("/")}>
							<FontAwesomeIcon fixedWidth icon={faHouse} className="h-8 w-8 p-0.5 text-[--text-rgb]" />

							<p className="font-bold text-[--text-rgb]">Go to landing page</p>
						</button>
						<button
							className="sidebarButton"
							onClick={async () => {
								await supabase.auth.signOut();
								push("/");
							}}
						>
							<FontAwesomeIcon fixedWidth icon={faSignOut} className="h-8 w-8 p-0.5 text-red-500" />
							<p className="font-bold text-red-500">Log out</p>
						</button>
					</div>
				) : (
					<></>
				)}
			</div>

			{visible ? <div className="fixed left-0 top-0 z-30 h-screen w-screen" onClick={() => setVisible(false)}></div> : <></>}
		</>
	);
}
