import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 text-purple-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-ls font-semibold text-gray-900 truncate w-4/5">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{createdAt}</p>
      </div>
    </div>
  );
};
const StatusBadge = ({ status }: { status: string }) => {
    return (
        <span className={cn('px-3 py-1 text-xs font-medium rounded-full captialize',status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>
            {status}
        </span>
    )
}
export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton />
        </div>
        <Link href={`summaries/${summary.id}`} className="black p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.createdAt}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summaries_text}
            </p>

            <div className="flex justify-between items-enter mt02 sm:mt-4">
              <StatusBadge status={summary.status}/>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
