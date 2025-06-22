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

export async function generatePdfText({
  fileUrl,
}: {
  fileUrl: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File URL is required",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log({ pdfText });

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to fetch and extract PDF text",
        data: null,
      };
    }
    return {
      success: true,
      messsage: "PDF text generated successfully",
      data: {
        pdfText,
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

export async function  generatePdfSummary({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) {
  try {
    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (err) {
      console.log(err);
      // call OpenAI
      if (err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromOpenAI(pdfText);
        } catch (openAiError) {
          console.error("OpenAI API failed after gemini failed", openAiError);
          throw new Error("Failed to generate summary after gemini failed");
        }
      }
      return {
        success: true,
        message: "Failed to generate summary",
        data: null,
      };
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
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
      message: "Failed to generate summary",
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
