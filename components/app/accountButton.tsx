"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSignOut } from "@fortawesome/free-solid-svg-icons";

const supabase = createClientComponentClient();

export default function AccountButton(props: { name: string }) {
	const [visible, setVisible] = useState<boolean>(false);
	const { push } = useRouter();

	return (
		<div className="relative">
			<div onClick={() => setVisible(!visible)} className="flex cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2.5 transition-all hover:bg-colorGray/30">
				<div className="flex h-8 w-8 items-center justify-center rounded bg-[--text-rgb] text-lg font-bold text-[--background-rgb]">
					{props.name.slice(0, 1).toLocaleUpperCase()}
				</div>
				<p className="text-lg font-semibold text-[--text-rgb]">{props.name}</p>
			</div>

			{visible ? (
				<div className="absolute -bottom-3 left-0  flex w-full translate-y-full flex-col gap-y-1 rounded-lg bg-[#444647] px-2 py-3">
					<button className="listButton" onClick={async () => push("/")}>
						<FontAwesomeIcon fixedWidth icon={faHouse} className="h-8 w-8 p-0.5 text-[--text-rgb]" />

						<p className="font-bold text-[--text-rgb]">Go to landing page</p>
					</button>
					<button
						className="listButton"
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
	);
}
