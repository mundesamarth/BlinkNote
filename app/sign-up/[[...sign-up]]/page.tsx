import BgGradient from "@/components/common/bg-gradient";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center lg:min-h-[40vh]">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="from-teal-400 via-teal-300 to-blue-200" />
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </section>
  );
}
