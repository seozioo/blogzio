import type { Metadata } from 'next';
import './globals.css';

import { Footer } from '@/shared/components/Footer';
import { AuthProvider } from '@/shared/components/AuthProvider';
import { Header } from '@/shared/components/Header';

export const metadata: Metadata = {
  title: 'BLOGZIO',
  description: "ZIO's BLOG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="ko">
        <body className="min-h-svh flex flex-col bg-zinc-50 text-zinc-900">
          <Header />
          <main className="flex flex-col flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
