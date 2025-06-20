import { Pizza } from "lucide-react";
import { Button } from "../ui/button";
import { SummaryViewer } from "../summaries/summary-viewer";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";

const DEMO_SUMMARY = `# Quick Overview
🎯 A forward-looking analysis of how AI is transforming diagnostics, patient care, and hospital operations — along with the ethical and regulatory challenges healthcare must address.

# Document Details
Title: The Future of Artificial Intelligence in Healthcare

Author: Dr. Anita Bhatt, Stanford Medical Review

Published: April 2024

Length: 22 pages

Source: stanfordhealthai.org

# Key Highlights
AI models achieve 90%+ accuracy in early cancer detection

$150B projected savings in healthcare costs globally by 2030

Use of NLP in patient records improves diagnostics

Challenges include data privacy, bias, and regulatory gaps

# Why It Matters
Healthcare is under increasing pressure to deliver better outcomes at lower costs. AI can help bridge this gap — but only if implemented ethically and responsibly. This document explains both the potential and the pitfalls.

# Main Points
Diagnostics: AI tools like CNNs are enhancing radiology and pathology workflows

Treatment Personalization: Predictive models tailor medication and therapy plans

Operational Benefits: AI is streamlining billing, scheduling, and documentation

Global Trends: National healthcare systems are investing in AI infrastructure

Risks: Without transparency, AI can reinforce health disparities

# Pro Tips
For startups: focus on explainable AI to improve adoption

For clinicians: leverage AI-assisted tools, not AI-replacement tools

For data teams: ensure de-biased training datasets

# Key Terms to Know
Explainable AI (XAI): AI that provides human-understandable justifications

Federated Learning: A method to train models on distributed, private data

Clinical Decision Support System (CDSS): AI systems that assist doctor decisions

#Bottom Line
Artificial Intelligence is no longer a future vision — it's already shaping how healthcare is delivered. Success depends not just on tech, but on trust, regulation, and thoughtful implementation.

`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-teal-500 via-yellow-500 to-red-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%,85.5% 0.1%,80.7% 2%, 72.5% 32.5%, 60.2% 62.4%,52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Witness BlinkNote work its magic{" "}
              <span className="bg-linear-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                on a dense The Future of AI in Healthcare
              </span>{" "}
              PDF in seconds!
            </MotionH3>
          </div>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          {/* summary viewer */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryViewer summary={DEMO_SUMMARY} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
