"use server";
import { revalidatePath } from "next/cache";

export default async function RevalidateListPage() {
	revalidatePath("/app/[id]");
}
