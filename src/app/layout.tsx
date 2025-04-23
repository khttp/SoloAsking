import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-card py-4 shadow-md">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-foreground">
                SimpleAsk
              </Link>
              <div className="space-x-4">
                <Link href="/" className="text-foreground hover:text-primary">
                  AskMe
                </Link>
                 <Link href="/questions" className="text-foreground hover:text-primary">
                  Questions
                </Link>
                <Link href="/profile" className="text-foreground hover:text-primary">
                  Profile
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

