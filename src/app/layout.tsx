import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster"

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
      <body className={`${playfairDisplay.variable} font-playfairDisplay antialiased dark bg-background text-foreground`}>
        <header className="bg-card py-4 shadow-md fixed top-0 z-10 w-full">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <Link
                href="/askme"
                className={`${playfairDisplay.variable} font-playfairDisplay text-xl font-bold text-foreground`}
              >
                <span style={{ color: '#4285F4' }}>Solo</span>
                <span style={{ color: '#FF8533' }}>Asking</span>
              </Link>
              <div className="space-x-4">
                <Link href="/askme" className="text-foreground hover:text-primary">
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
        <main className="container mx-auto px-4 py-8 mt-20">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}


