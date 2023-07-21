export default function Loading() {
	function randomInteger(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	return (
		<article className="mx-20 mb-16 mt-28 text-[--text-rgb]">
			{/* title section */}
			<div className="flex flex-col gap-y-8">
				<div className="h-[60px] w-[60px] animate-pulse rounded-lg bg-colorGray/50"></div>

				<div className="h-14 w-96 animate-pulse rounded-lg bg-colorGray/50" style={{ animationDelay: "90ms" }}></div>

				<div className="flex animate-pulse items-center gap-x-3 rounded-lg bg-colorGray/20 px-3 py-2.5" style={{ animationDelay: "180ms" }}>
					<div className="h-8 w-8 rounded-md bg-colorGray/50 p-1" />
					<div className="h-6 w-3/4 rounded-md bg-colorGray/50 p-1" style={{ width: randomInteger(40, 90) + "%" }} />
				</div>
			</div>

			<div className="mt-16 flex flex-col gap-y-20">
				{[...Array(4)].map((x, i) => (
					<div className="flex flex-col gap-y-1" key={i}>
						{/* Task table title row */}
						<div className="flex animate-pulse flex-row items-center gap-x-3" style={{ animationDelay: (i + 1) * (90 + 350) + 180 + "ms" }}>
							<div className={`h-6 rounded-lg bg-colorGray/50`} style={{ width: randomInteger(10, 30) + "%" }}></div>

							<div className="h-5 w-6 rounded bg-colorGray/30"></div>

							{/* Spacer */}
							<div className="grow" />

							<div className="h-10 w-10 rounded-lg bg-colorGray/50"></div>
						</div>

						{/* Spacer */}
						<div className="my-1 h-px w-full bg-colorGray/20" />

						{/* Tasks */}
						<div className="flex flex-col gap-y-1">
							{[...Array(7)].map((x, j) => (
								<div
									className="taskTile animate-pulse text-clip bg-colorGray/5"
									key={i}
									style={{ animationDelay: (j + 1) * 50 + ((i + 1) * (90 + 350) + 180) + "ms" }}
								>
									{/* Checkbox */}
									<div className="my-2.5 h-5 w-5 rounded-md bg-colorGray/50"></div>

									{/* Title */}
									<div className={`h-8 rounded-md bg-colorGray/50`} style={{ width: randomInteger(7, 40) + "%" }}></div>

									{/* Date tile */}
									<div className="h-7 w-28 rounded-md bg-colorGray/30" style={{ width: randomInteger(4, 7) + "%" }}></div>

									{/* Spacer */}
									<div className="grow" />

									<div className="h-4 w-4 rounded bg-colorGray/30"></div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</article>
	);
}
