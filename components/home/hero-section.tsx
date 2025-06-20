import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    damping: 10,
    stiffness: 300,
  },
};

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <MotionDiv
        variants={itemVariants}
        className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-purple-200 via-purple-500 to-purple-800
       animate-gradient-x group"
      >
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-purple-100 transition-colors duration-200"
        >
          <Sparkles className="w-6 h-6 mr-2 text-purple-600 animate-pulse" />
          <p className="text-base text-purple-600">Powered by AI</p>
        </Badge>
      </MotionDiv>
      <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
        Turn lengthy PDFs into{" "}
        <span className="relative inline-block">
          <MotionSpan whileHover={buttonVariants}className="relative z-10 px-2">easy-to-read</MotionSpan>
          <span
            className="absolute inset-0 bg-purple-200/50 -rotate-2 rounded-lg transform -shew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Create a sleek summary reel from your PDF in seconds.
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-purple-500 hover:from-purple-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300 "
        >
          <Link
            href="/#pricing"
            className="
          flex gap-2 items-center"
          >
            <span>Try BlinkNote</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
