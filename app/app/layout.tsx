import SideBar from "@/components/app/sideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<SideBar />
			{children}
		</main>
	);
}
