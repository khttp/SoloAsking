'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthCheckProps {
  children: React.ReactNode;
  redirectPath: string;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children, redirectPath }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(redirectPath);
    }
  }, [user, router, redirectPath]);

  return <>{children}</>;
};

export default AuthCheck;
