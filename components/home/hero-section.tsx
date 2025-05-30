import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export default function HeroSection() {
  return (
    <section className="">
      <div className="">
        <div className="flex ">
          <div
            className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-purple-200 via-purple-500 to-purple-800
       animate-gradient-x group"
          >
            <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors">
              <Sparkles className="h-6 w-6 mr-2 text-purple-600 animate-pulse" />
              <p className="text-base">Powered by AI</p>
            </Badge>
          </div>
        </div>

        <h1>Turn lengthy PDFs into easy-to-read summaries</h1>
        <h2>Create a sleek summary reel from your PDF in seconds.</h2>
        <Button>Try BlinkNote</Button>
      </div>
    </section>
  );
}
