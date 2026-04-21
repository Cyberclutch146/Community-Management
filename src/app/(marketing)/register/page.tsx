'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createUserProfile } from '@/services/userService';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const user = await register(email, password);
      
      // Create user profile in Firestore
      await createUserProfile(user.uid, {
        email: user.email!,
        displayName: name,
        bio: '',
        location: '',
        phone: '',
        skills: [],
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        role: 'Community Member',
        volunteerHours: 0,
        totalDonated: 0,
        profileComplete: false
      });

      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-6">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200/50 p-8">
        <h1 className="text-3xl font-headline font-bold text-center text-[#4a7c59] dark:text-emerald-500 mb-8">
          Join the Network
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/50 transition-shadow"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/50 transition-shadow"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Password
            </label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/50 transition-shadow"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-[#4a7c59] text-white rounded-xl font-bold hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-sm"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-stone-500 dark:text-stone-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#4a7c59] dark:text-emerald-400 font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
