'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useAuth} from '@/contexts/AuthContext';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
  const {register} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const {toast} = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically send the additional data (firstName, lastName, age, country)
      // to your backend or Firebase along with the email and password.
      await register(email, password, firstName, lastName, age, country);
      toast({
        title: 'Registration successful!',
        description: 'You are now registered.',
      });
      router.push('/login'); // Redirect to login after successful registration
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Registration failed.',
        description: error.message || 'Failed to register.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="firstName">First Name</label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="lastName">Last Name</label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="age">Age</label>
              <Input
                type="number"
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="country">Country</label>
              <Input
                type="text"
                id="country"
                placeholder="Enter your country"
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Register</Button>
          </div>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
