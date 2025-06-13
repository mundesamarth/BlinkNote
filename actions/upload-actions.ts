"use server";
import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiaia";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  summary: string;
  fileUrl: string;
  fileName: string;
  title: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];
  if (!pdfUrl) {
    return {
      sucess: false,
      message: "File upload failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText);

    let summary;

    try {
      // Try Gemini first
      summary = await generateSummaryFromGemini(pdfText);
      console.log("✅ Gemini worked:", summary);
    } catch (err: any) {
      console.error("❌ Gemini failed:", err);

      const errorMessage = err?.message?.toLowerCase?.() || "";
      const isRateLimit =
        err?.status === 429 ||
        errorMessage.includes("rate limit") ||
        errorMessage.includes("quota") ||
        errorMessage.includes("exceeded");

      if (isRateLimit) {
        try {
          console.log("⚠️ Falling back to OpenAI...");
          summary = await generateSummaryFromOpenAI(pdfText);
          console.log("✅ OpenAI worked:", summary);
        } catch (openAIError) {
          console.error("❌ OpenAI also failed:", openAIError);
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      } else {
        // Don't ignore other errors from Gemini
        throw err;
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: fileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  summary,
  fileUrl,
  fileName,
  title,
}: PdfSummaryType) {
  //sql inserting  pdf summary
  try {
    const sql = await getDBConnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
      user_id,
      original_file_url, 
      summary_text, 
      title, 
      file_name
      )VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
      ) RETURNING id,summary_text`;
    return savedSummary;
  } catch (err) {
    console.error("Error saving PDF summary", err);
    throw err;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error Saving PDF Summary",
    };
  }

  //revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
