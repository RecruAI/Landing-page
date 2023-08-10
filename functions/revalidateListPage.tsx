"use server";
import { revalidatePath } from "next/cache";

export default async function RevalidateListPage() {
	revalidatePath("/app");
	revalidatePath("/app/[id]");
	revalidatePath("/app/quick/today");
	revalidatePath("/app/quick/nextweek");
	revalidatePath("/app/quick/forgotten");
}
