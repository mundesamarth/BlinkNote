"use server";

import { getDBConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const sql = await getDBConnection();
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id; `;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("Error deleting summary", err);
    return { success: false };
  }
}
