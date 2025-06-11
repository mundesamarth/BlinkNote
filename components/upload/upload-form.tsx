"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

      //validating the fields
      const validatedFields = schema.safeParse({ file });

      console.log(validatedFields);
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
        description:(<span className="text-slate-400 text-sm">
          Your PDF is being uploaded to our AI!
        </span>) ,
      });
      //uploading the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Sonner" }), 2000)
        );
      toast.promise(promise, {
        loading: "Hang tight! Our AI is reading through your document! ✨",
        success: (data) => {
          return "Here is your summary!";
        },
        error: "Something went wrong! Please try again later.",
      });
      //parse the pdf using lang chain
      //summarise the pdf using AI
      const result = await generatePdfSummary(resp);
      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast("📑 Saving PDF...", {
          description: (<span className="text-slate-400 text-sm">
            Hang tight! We are saving your summary!!
          </span>),
        });
        formRef.current?.reset();
        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data?.title ,
            fileName: file.name,
          })
          // save the summary to the database
          toast("✨Summary Generated ✨",{
            description: "Your PDF has been successfully summarised and saved!"
          });
          formRef.current?.reset(); 
          router.push( `/summaries/${storeResult.data.id}`)
          // redirect to the summary page
        }
      }
      // summarise the pdf using AI
      //redirect to the [id] summary page
    } catch (err) {
      setIsLoading(false);
      console.error("Error occured", err);
      formRef.current?.reset();
    }finally{
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