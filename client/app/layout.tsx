import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import { Guestbook } from "@/shared/components/Guestbook";
import {BaseContainer} from "@/shared/components/BaseContainer";

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
        <Guestbook />
        <Footer />
      </body>
    </html>
  );
}
