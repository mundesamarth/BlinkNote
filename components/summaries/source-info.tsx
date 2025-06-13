import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import DownloadSummaryButton from "./download-summary";

export function SourceInfo({
  file_name,
  original_file_url,
  title,
  summaryText,
  createdAt,
}: {
  file_name: string;
  original_file_url: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-purple-400" />
        <span>Source: {file_name}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          size="sm"
          className="h-8 px-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          asChild
        >
          <a href={original_file_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 text mr-1" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton  title={title} summaryText={summaryText} file_name={file_name} createdAt={createdAt}/>
      </div>
    </div>
  );
}
