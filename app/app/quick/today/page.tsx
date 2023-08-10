import DoComponent from "@/components/app/listPage/doComponent";
import SortAndCompareDos from "@/functions/sortAndCompareDos";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function Page() {
	const supabase = createServerComponentClient({
		cookies,
	});

	let { data: dos }: PostgrestSingleResponse<DataDoType[]> = await supabase.from("dos").select("*");

	const dosToShow = dos
		?.filter((singleDo: DataDoType) => {
			// Setting dates
			const dateToCheck = new Date(singleDo.due_date);
			const dateNow = new Date(new Date().toDateString());

			return dateToCheck.toDateString() == dateNow.toDateString();
		})
		.sort((doA, doB) => SortAndCompareDos(doA, doB));

	return (
		<section className="mx-4 mb-10 mt-20 flex flex-col text-[--text-rgb] md:mx-20 md:mb-20 md:mt-28 2xl:mx-36">
			<FontAwesomeIcon icon={faCalendarCheck} className="mb-4 h-12 p-1 text-[#46BF77] md:mb-8 md:h-20" />

			<h1 className="text-center text-3xl font-extrabold text-[--text-rgb] md:mb-3 md:text-5xl">Today</h1>
			<h3 className="mb-6 text-center text-xl font-normal text-colorGray/70 md:mb-20 md:text-3xl">Let's see what you have to do today!</h3>

			<div className="flex flex-col gap-y-1">
				{/* Task table title row */}
				<div className="flex flex-row items-center gap-x-1.5 md:gap-x-3">
					<h2 className="-ms-1.5 cursor-pointer truncate rounded-md px-1.5 py-0.5 text-lg font-bold text-[--text-rgb] hover:bg-colorGray/50 md:-ms-3 md:px-3 md:py-1 md:text-2xl">
						Todays tasks
					</h2>
					<p className="text-sm font-medium text-colorGray md:text-base">{dosToShow?.filter((singleDo) => !singleDo.done).length}</p>

					{/* Spacer */}
					<div className="grow" />
				</div>

				{/* Spacer */}
				<div className="my-1 h-px w-full bg-colorGray/20" />

				{/* Tasks */}
				<div className="flex flex-col gap-y-1">
					{dosToShow?.map((singleDo) => (
						<DoComponent do={singleDo} key={singleDo.id} />
					))}
				</div>
			</div>
		</section>
	);
}
