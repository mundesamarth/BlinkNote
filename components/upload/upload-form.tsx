"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePdfSummary,
  generatePdfText,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import LoadingSkeleton from "./loading-skeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size < 1024 * 1024 * 20,
      "File size should be less than 20MB"
    )
    .refine((file) => file.type === "application/pdf", "File should be a PDF"),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload successfully!");
    },
    onUploadError: (e) => {
      console.error("Upload failed!", e);
      toast.error("Upload failed!", {
        description: e.message,
      });
    },
    onUploadBegin: (data) => {
      console.log("Upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      toast("📑 Uploading PDF...", {
        description: (
          <span className="text-slate-400 text-sm">
            Your PDF is being uploaded to our AI!
          </span>
        ),
      });

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse || uploadResponse.length === 0) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;
      const formattedFileName = formatFileNameAsTitle(file.name);

      // Show processing toast
      toast("✨ Hang tight!", {
        description: (
          <span className="text-slate-400 text-sm">
            Our AI is reading through your document!
          </span>
        ),
      });

      const result = await generatePdfText({ fileUrl: uploadFileUrl });

      const summaryResult = await generatePdfSummary({
        pdfText: result?.data?.pdfText ?? "",
        fileName: formattedFileName,
      });

      const { data = null, message = null } = summaryResult || {};

      if (data?.summary) {
        toast("📑 Saving PDF...", {
          description: (
            <span className="text-slate-400 text-sm">
              Hang tight! We are saving your summary!!
            </span>
          ),
        });

        const storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadResponse[0].serverData.fileUrl,
          title: formattedFileName,
          fileName: file.name,
        });

        toast("✨ Summary Generated ✨", {
          description: "Your PDF has been successfully summarised and saved!",
        });

        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data?.id}`);
      } else {
        if (message?.toLowerCase().includes("token")) {
          toast.error("Summary failed", {
            description:
              "🚫 The PDF is too long and exceeds token limits. Please try a shorter file.",
          });
        } else {
          toast.error("Summary failed", {
            description: "Something went wrong while generating the summary.",
          });
        }
        formRef.current?.reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload a PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div className="absolute inset-0 bg-black/50">
              <div className="w-full border-t border-gray-200 dark:border-gray-800">
                <div className="relative flex justify-center">
                  <span className="bg-background px-3 text-muted-foreground text-sm">
                    Processing...
                  </span>
                </div>
              </div>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
