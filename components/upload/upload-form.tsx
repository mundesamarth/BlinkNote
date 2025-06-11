"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";

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
  // const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload successfully!");
    },
    onUploadError: (e) => {
      console.error("Upload failed!", e);
      toast.error("Upload failed!", {
        description: e.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
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

      toast("📤 Uploading PDF...", {
        description: (
          <span className="text-slate-400 text-sm">
            Your PDF is being uploaded to our AI.
          </span>
        ),
      });

      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("❌ Upload failed", {
          description: "Please try using a different file.",
        });
        setIsLoading(false);
        return;
      }

      toast("🔎 Reading PDF...", {
        description: (
          <span className="text-slate-400 text-sm">
            Our AI is analyzing your document.
          </span>
        ),
      });

      // 🧠 Call the AI and handle summary generation
      const result = await toast.promise(generatePdfSummary(resp), {
        loading: "✨ Summarizing your PDF...",
        success: () => {
          return "✅ Summary ready!";
        },
        error: "❌ Failed to summarize the document. Please try again.",
      });

      const { data = null } = result || {};

      if (data?.summary) {
        toast("📥 Saving Summary...", {
          description: (
            <span className="text-slate-400 text-sm">
              Almost done — saving your summary!
            </span>
          ),
        });
        formRef.current?.reset();

        // 🔒 You can now save summary to DB or redirect
        // await saveSummaryToDb(data.summary)
      }
    } catch (err) {
      console.error("Error occurred", err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
