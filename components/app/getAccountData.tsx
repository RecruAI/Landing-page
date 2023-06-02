"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

type userData = {
	id: string;
	email?: string;
	phone?: string;
};

export default function GetAccountData(props: { user: userData }) {
	const [error, setError] = useState("");

	const [nickname, setNickname] = useState("");
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");

	const supabase = createClientComponentClient();
	const router = useRouter();

	async function handleDataUpload() {
		if (nickname != "" && name != "" && lastName != "") {
			setError("");

			const { error } = await supabase.from("users").insert({ user_id: props.user.id, name: name, last_name: lastName, nickname: nickname, email: props.user.email });

			if (!error) {
				router.reload();
			} else {
				setError("Error occured! Try again later.");
			}
		} else {
			setError("Fill all fields!");
		}
	}

	return (
		<div className="flex h-screen w-full flex-col justify-center gap-y-2 p-10 px-32 text-sm text-colorGray lg:w-1/2">
			<div className=" mb-8 flex flex-col gap-y-3">
				<h3 className={"text-6xl font-bold text-[--text-rgb]"}>Fill form</h3>

				<p className={" text-lg text-[--text-rgb]"}>Fill all missing informations to starting using DoIt app.</p>
			</div>

			<label htmlFor="nickname">Nickname</label>
			<input id="nickname" name="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="input mb-4" />

			<label htmlFor="name">First name</label>
			<input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input mb-4" />

			<label htmlFor="lastName">Last name</label>
			<input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input mb-4" />

			{props.user.email != null && props.user.email != "" ? (
				<>
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="text" className="disabledInput mb-4" disabled value={props.user.email} />
				</>
			) : (
				<></>
			)}

			{props.user.phone != null && props.user.phone != "" ? (
				<>
					<label htmlFor="phoneNumber">Phone number</label>
					<input id="phoneNumber" name="phoneNumber" type="text" className="disabledInput mb-4" disabled value={props.user.phone} />
				</>
			) : (
				<></>
			)}

			<p className="text-lg font-bold text-red-500">{error}</p>

			<button className="text-md mt-4 w-full rounded-lg bg-colorBlue py-5 font-medium text-white md:text-lg" onClick={() => handleDataUpload()}>
				Continue
			</button>
		</div>
	);
}
