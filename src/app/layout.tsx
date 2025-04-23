import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
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
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <header className="bg-card py-4 shadow-md">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <Link href="/askme" className="text-xl font-bold text-foreground">
                SimpleAsk
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
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
