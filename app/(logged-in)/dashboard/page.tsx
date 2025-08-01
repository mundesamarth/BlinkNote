import BgGradient from "@/components/common/bg-gradient";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { hasReachedUploadLimit } from "@/lib/user";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export default async function Dashboard() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }
  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient className="from-slate-200 via-slate-200 to-slate-200" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1,y:0 }}
        transition={{duration:0.5}}
        className="container mx-auto flex flex-col gap-4"
      >
        <div className="px-2 py-12 sm:py-24 ">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <MotionH1
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                className="text-4xl font-bol tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
              >
                Your Summaries
              </MotionH1>
              <MotionP
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-600"
              >
                Transform your PDFs into concise, actionable insights
              </MotionP>
            </div>

            {!hasReachedLimit && (
              <MotionDiv
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="self-start"
              >
                <Button
                  variant={"link"}
                  className="bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
                >
                  <Link href="/upload" className="flex text-white items-center">
                    {" "}
                    <Plus className="2-5 h-5 mr-2" />
                    New Summary
                  </Link>
                </Button>
              </MotionDiv>
            )}
          </div>
          {hasReachedLimit && (
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div className=" border  border-purple-200 rounded-lg p-4 text-purple-800 backdrop-blur-md bg-purple-50">
                <p className="text-sm">
                  You've reached the limit of {uploadLimit} uploads per month on
                  the Basic plan.{" "}
                  <Link
                    href="/#pricing"
                    className="text-purple-800 underline font-medium  underline-offset-4 inline-flex items-center"
                  >
                    Click here to upgrade to Pro{" "}
                    <ArrowRight className="w-4 h-4 inline-block" />{" "}
                  </Link>{" "}
                  for unlimited uploads.
                </p>
              </div>
            </MotionDiv>
          )}
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </MotionDiv>
    </main>
  );
}
