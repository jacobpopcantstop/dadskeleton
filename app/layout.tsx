import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SkeletonHuntProvider } from "@/contexts/SkeletonHuntContext";
import SkeletonCounter from "@/components/SkeletonCounter";

export const metadata: Metadata = {
  title: "Dad Skeleton",
  description: "Comedy troupe - Improv, Sketches, and Live Shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SkeletonHuntProvider>
          <Header />
          {children}
          <Footer />
          <SkeletonCounter />
        </SkeletonHuntProvider>
      </body>
    </html>
  );
}
