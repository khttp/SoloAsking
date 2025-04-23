import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ClientHeader from './ClientHeader';
import { AuthProvider } from '@/contexts/AuthContext';
import React from 'react';

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'SimpleAsk',
  description: 'A simple Q&A web app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} font-playfairDisplay antialiased dark bg-background text-foreground`}
      >
        <AuthProvider>
          <ClientHeader />
          <main className="container mx-auto px-4 py-8 mt-20">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

