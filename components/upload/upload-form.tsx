"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner"
import { generatePdfSummary } from "@/actions/upload-actions";

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
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload successfully!");
    },
    onUploadError: (e) => {
      console.error("Upload failed!", e);
      toast.error("Upload failed!",{
        description: e.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validating the fields
    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields);
    if (!validatedFields.success) {
      toast.error("❌ Something went wrong",{
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
      });
      return;
    }
    toast("📑 Uploading PDF...",{
      description: "Your PDF is being uploaded to our AI!",
    });
    //uploading the file to uploadthing
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Something went wrong",{
        description: "Please use a different file",
      });
      return;
    }
    const promise = () => new Promise((resolve) => setTimeout(()=> resolve({name:'Sonner'}),2000));
    toast.promise(promise,{
      loading:'Hang tight! Our AI is reading through your document! ✨',
      success: (data) => {
        return "Here is your summary!"
      },
      error: 'Something went wrong! Please try again later.'
    });
    //parse the pdf using lang chain
    //summarise the pdf using AI
    const summary = await generatePdfSummary(resp);
    console.log({summary});
    //save the summary to the database
    //redirect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
