'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logout successful!',
        description: 'You have been logged out.',
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout failed.',
        description: error.message || 'Failed to logout.',
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
