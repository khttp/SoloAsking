"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {Playfair_Display} from 'next/font/google';
import {useAuth} from '@/contexts/AuthContext';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useTheme} from 'next-themes';
import {Button} from "@/components/ui/button";
import {Sun, Moon} from 'lucide-react';

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});


const ClientHeader = () => {
  const pathname = usePathname();
  const {user} = useAuth();
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getAvatarInitials = () => {
    if (user?.displayName) {
      const names = user.displayName.split(' ');
      const firstNameInitial = names[0]?.charAt(0).toUpperCase() || '';
      const lastNameInitial = names.length > 1 ? names[names.length - 1]?.charAt(0).toUpperCase() : '';
      return firstNameInitial + lastNameInitial;
    }
    return 'UN';
  };

  return (
    <header className="bg-card py-4 shadow-md fixed top-0 z-10 w-full">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/askme"
            className={`${playfairDisplay.variable} font-playfairDisplay text-xl font-bold`}
          >
            <span style={{color: '#4285F4'}}>Solo</span>
            <span style={{color: '#FF8533'}}>Asking</span>
          </Link>
          <div className="space-x-4 flex items-center">
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
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className={`text-foreground hover:text-primary ${pathname === '/profile' ? 'text-orange-500' : ''
                    }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{getAvatarInitials()}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? <Moon /> : <Sun />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className={`text-foreground hover:text-primary ${pathname === '/login' ? 'text-orange-500' : ''}`}
                >
                  Login\Register
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? <Moon /> : <Sun />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ClientHeader;
