import type { Metadata } from 'next';
import './globals.css';

import { Footer } from '@/shared/components/Footer';
import { AuthProvider } from '@/shared/components/AuthProvider';
import { Header } from '@/shared/components/Header';
import { VisitTracker } from '@/shared/components/VisitTracker';
import { ActiveTabProvider } from '@/shared/components/posts/ActiveTabContext';
import { ViewTransition } from 'react';

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
    <html lang="ko">
      <body className="min-h-svh flex flex-col bg-zinc-50 text-zinc-900">
        <AuthProvider>
          <ActiveTabProvider>
            <VisitTracker />
            <Header />
            <main className="flex flex-col flex-1">
              <ViewTransition>{children}</ViewTransition>
            </main>
            <Footer />
          </ActiveTabProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
