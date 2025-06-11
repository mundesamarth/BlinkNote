"use server";
import { generateSummaryFromGemini } from "@/lib/geminiaia";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

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
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("✅ OpenAI worked:", summary);
    } catch (err: any) {
      console.error("❌ OpenAI failed:", err);

      // Make sure this detects real errors
      const errorMessage = err?.message?.toLowerCase?.() || "";
      const isRateLimit =
        err?.status === 429 ||
        errorMessage.includes("rate limit") ||
        errorMessage.includes("quota") ||
        errorMessage.includes("exceeded");

      if (isRateLimit) {
        try {
          console.log("⚠️ Falling back to Gemini...");
          summary = await generateSummaryFromGemini(pdfText);
          console.log("✅ Gemini worked:", summary);
        } catch (geminiError) {
          console.error("❌ Gemini also failed:", geminiError);
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      } else {
        // 🔥 Don't silently fail on other errors
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

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
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

