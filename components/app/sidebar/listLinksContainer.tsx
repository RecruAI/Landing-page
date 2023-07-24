import Link from "next/link";

type DataListType = { icon: string; id: string; name: string; user_id: string; date_created: string; tasks: string[] };

export default function ListLinksContainer(props: { hideSidebar: Function; loading: boolean; lists: DataListType[] }) {
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
				props.lists.map((list) => {
					return (
						<Link
							href={"/app/" + list.id}
							className="sidebarButton"
							key={list.id}
							onClick={() => {
								props.hideSidebar();
							}}
						>
							<span className="p-1 text-lg">{list.icon}</span>

							<p className="text-[--text-rgb]">{list.name}</p>

							{/* Indicator showing how many undone 'dos' are on that list (to do later) */}
							{/* <p className="ms-auto text-colorGray">2</p> */}
						</Link>
					);
				})
			)}
		</>
	);
}
