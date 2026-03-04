import type { Metadata } from "next";
import { Header } from "@/shared/components/Header";
import "./globals.css";
import { Footer } from "@/shared/components/Footer";

export const metadata: Metadata = {
  title: "BLOGZIO",
  description: "ZIO's BLOG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-svh flex flex-col bg-zinc-50">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
