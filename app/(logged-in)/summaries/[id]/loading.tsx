import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import { FileText } from "lucide-react";

function HeaderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-full bg-white/80" />
        <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
      </div>
      <Skeleton className="h-12 w-3/4 rounded-full" />
    </div>
  );
}

export default function LoadingSummary() {
  return (
    <div className="realtive isolate min-h-screen bg-linear-to-r from-purple-50/40 to-white">
      <BgGradient className="from-purple-400 via-purple-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col gap-8">
            <HeaderSkeleton />
            <div className="relative overflow-hidden">
              <div className="realtive p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/30">
              {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-orange-50/30 to-transparent opacity-50 rounded-3xl" />
                {/* file icon */}
                <div className="absolute top-4 right-4 text-purple-300/20">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <Skeleton className="h-12 w-12 " />
                </div>
                <div className="relative">
                  <LoadingSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
