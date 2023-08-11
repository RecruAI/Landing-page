import SortAndCompareLists from "@/functions/sortAndCompareLists";
import Link from "next/link";

export default function ListLinksContainer(props: { hideSidebar: Function; loading: boolean; lists: DataListType[]; dos: DataDoType[] }) {
	return (
		<>
			{props.loading ? (
				<>
					{/* // Showing loading before fetched data from db */}
					<div className={`sidebarButton animate-pulse bg-colorGray/10`}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[40%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "75ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[85%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "150ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[75%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "225ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[25%] rounded bg-colorGray/50"></div>
					</div>
					<div className={`sidebarButton animate-pulse bg-colorGray/10`} style={{ animationDelay: "300ms" }}>
						<div className="m-1 h-7 w-7 rounded-lg bg-colorGray/50"></div>

						<div className="h-5 w-[65%] rounded bg-colorGray/50"></div>
					</div>
				</>
			) : (
				props.lists
					.sort((listA, listB) => SortAndCompareLists(listA, listB))
					.map((list) => {
						const dosForList: DataDoType[] = props.dos.filter((singleDo: DataDoType) => singleDo.list == list.id && !singleDo.done);

						return (
							<Link
								href={"/app/list/" + list.id}
								className="sidebarButton"
								key={list.id}
								onClick={() => {
									props.hideSidebar();
								}}
							>
								<span className="p-1 text-lg">{list.icon}</span>

								<p className="text-[--text-rgb]">{list.name}</p>

								{/* Indicator showing how many undone 'dos' are on that list */}
								<p className="ms-auto text-colorGray">{dosForList.length != 0 ? dosForList.length : ""}</p>
							</Link>
						);
					})
			)}
		</>
	);
}
