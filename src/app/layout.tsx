import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { DemoProvider } from "@/components/provider";
import { Header, Footer } from "@/components/chrome";
import "./globals.css";
import "./architectural-story.css";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jp-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-jp-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://jaeger-properties.vercel.app"),
  title: {
    default: "Jaeger Properties — Where your next chapter begins",
    template: "%s | Jaeger Properties",
  },
  description:
    "An architectural property website concept by Jaeger Media. Explore illustrative Harare homes, discover a six-stage residence story and try thoughtful property tools.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Jaeger Properties — A more considered property experience",
    description: "A premium real estate design concept by Jaeger Media.",
    images: ["/images/residence.webp"],
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${serif.variable} ${sans.variable}`}>
        <DemoProvider>
          <Header />
          <main id="main">
            <Suspense
              fallback={
                <div className="route-loading">A new chapter is opening…</div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
