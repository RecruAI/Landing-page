import Image from "next/image";

type userData = {
	id: string;
	email?: string;
	phone?: string;
};

export default function GetAccountData(props: { user: userData }) {
	return (
		<div className="flex h-screen w-full flex-col justify-center gap-y-2 p-10 px-32 text-sm text-colorGray lg:w-1/2">
			<div className="mb-10 flex flex-col gap-y-3">
				<h3 className={"text-6xl font-bold text-[--text-rgb]"}>Fill form</h3>

				<p className={" text-lg text-[--text-rgb]"}>Fill all missing informations to starting using DoIt app.</p>
			</div>

			<label htmlFor="nickname">Nickname</label>
			<input id="nickname" name="nickname" type="text" className="input mb-6" />

			<label htmlFor="name">First name</label>
			<input id="name" name="name" type="text" className="input mb-6" />

			<label htmlFor="last_name">Last name</label>
			<input id="last_name" name="last_name" type="text" className="input mb-6" />

			{props.user.email != null && props.user.email != "" ? (
				<>
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="text" className="disabledInput mb-6" disabled value={props.user.email} />
				</>
			) : (
				<></>
			)}

			{props.user.phone != null && props.user.phone != "" ? (
				<>
					<label htmlFor="phoneNumber">Phone number</label>
					<input id="phoneNumber" name="phoneNumber" type="text" className="disabledInput mb-6" disabled value={props.user.phone} />
				</>
			) : (
				<></>
			)}

			<button className="text-md w-full rounded-lg bg-colorBlue py-5 font-medium text-white md:text-lg">Continue</button>
		</div>
	);
}
