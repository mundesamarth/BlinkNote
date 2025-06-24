import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ORIGIN_URL } from "@/utils/helpers";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Blinknote - AI Note Summarizer",
  description:
    "Save time with AI note summarizer. Transforms lengthy notes into concise summaries.",
    openGraph:{
      images:[{
        url: '/opengraph_BlinkNote.png',
      }]
    },
    metadataBase: new URL(ORIGIN_URL),
    alternates:{
      canonical: ORIGIN_URL,
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} fontSans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
          </div>
          <Toaster position="top-right" expand={true}/>
        </body>
      </html>
    </ClerkProvider>
  );
}
