import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient>
        <HeroSection />
      </BgGradient>
      {/* <DemoSection /> */}
      {/* <HowItWorksSection /> */}
      {/* <PricingSection /> */}
      {/* <CTASection /> */}
    </div>
  );
}
