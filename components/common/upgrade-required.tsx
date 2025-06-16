import { ArrowRight, Sparkle } from "lucide-react";
import BgGradient from "./bg-gradient";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh] ">
      <BgGradient className="from-purple-400 via-purple-300 to-orange-200" />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-purple-500">
            <Sparkle className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Upgrade Required
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Subscription Required</h1>
          <p className="text-lg leading-8 text-gray-600 border-2 border-purple-200 bg-white/50 backdrop-blur-x rounded-lg p-6 border-dashed max-w-xl">You need to upgrade to a paid plan to access this feature.</p>
          <Button
            asChild
            className="bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 hover text-white hover:no-underline"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              View Pricing Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
