import { getDBConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDBConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const [summary] = await sql`SELECT 
    id,
    user_id,
    title,
    original_file_url,
    summary_text,
    status,
    created_at,
    updated_at,
    file_name,
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text,' ','')) + 1 AS word_count
    FROM pdf_summaries WHERE id = ${id} `;
    return summary;
  } catch (err) {
    console.error("Error getting summary", err);
    return null;
  }
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDBConnection();
  try {
    const [result] =
      await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
    return result?.count || 0;
  } catch (err) {
    console.log("Error fetching user upload count", err);
    return 0;
  }
}
