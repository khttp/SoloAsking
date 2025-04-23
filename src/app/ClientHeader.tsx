'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});


const ClientHeader = () => {
  const pathname = usePathname();

  return (
    <header className="bg-card py-4 shadow-md fixed top-0 z-10 w-full">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/askme"
            className={`${playfairDisplay.variable} font-playfairDisplay text-xl font-bold`}
          >
            <span style={{ color: '#4285F4' }}>Solo</span>
            <span style={{ color: '#FF8533' }}>Asking</span>
          </Link>
          <div className="space-x-4">
            <Link
              href="/askme"
              className={`text-foreground hover:text-primary ${pathname === '/askme' ? 'text-orange-500' : ''
                }`}
            >
              AskMe
            </Link>
            <Link
              href="/questions"
              className={`text-foreground hover:text-primary ${pathname === '/questions' ? 'text-orange-500' : ''
                }`}
            >
              Questions
            </Link>
            <Link
              href="/profile"
              className={`text-foreground hover:text-primary ${pathname === '/profile' ? 'text-orange-500' : ''
                }`}
            >
              Profile
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ClientHeader;
