import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { SourceInfo } from "@/components/summaries/source-info";
import { SummaryHeader } from "@/components/summaries/summary-header";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { getSummaryById } from "@/lib/summaries";
import { formatFileName } from "@/lib/utils";
import { itemVariants } from "@/utils/constants";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }
  const { title, summary_text, file_name, fileUrl, word_count, reading_time } =
    summary;

  const readingTime = Math.ceil((word_count || 0) / 200);
  return (
    <div className="realtive isolate min-h-screen bg-linear-to-r from-purple-50/40 to-white">
      <BgGradient className="from-purple-400 via-purple-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <MotionDiv
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variants={itemVariants}
          >
            <SummaryHeader
              title={
                title ? formatFileNameAsTitle(title) : formatFileName(fileUrl)
              }
              createdAt={summary.created_at}
              readingTime={`${readingTime}`}
            />
          </MotionDiv>

          {file_name && (
            <SourceInfo
              title={title}
              summaryText={summary_text}
              file_name={file_name}
              original_file_url={fileUrl}
              createdAt={summary.created_at}
            />
          )}

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variants={itemVariants}
            className="relative mt-4 sm:mt-8 lg:mt-16"
          >
            <div className="realtive p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-purple-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-purple-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                {summary.word_count?.toLocaleString()} words
              </div>
              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary={summary.summary_text} />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
