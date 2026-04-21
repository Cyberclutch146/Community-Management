'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <main className="w-full max-w-5xl bg-surface-container-low rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Image Side */}
        <div className="hidden md:block md:w-1/2 relative bg-surface-variant">
          <img 
            alt="Warm organic hands holding soil with a small plant" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF1yobusCoIcuVF0EtfpSB8WR59SuB2LtaOsDTiOv5Ie9cgeMsTy7RozrFagQflFJUUqvfnfIyVcQG5JqDvumiMbw0Q34C_886vO_S5LbiuxYFUR4_SYXMCRWZvmPLV41-wJVJD6a_mRnASkWkMGubCq3D5F3MCKY-DTO-g4MHwZSm6ienqT01RyttYGTBFwBhLaQ2KFzO3rqxr7hieu7PWOsUXr6T7N5yilCoRVIJFgje6AEwYCTaqtxqZDdNY0SsXXEljE_0dmUj"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="font-headline text-3xl font-bold mb-2">Rooted in community.</div>
            <p className="font-body text-sm text-white/90 leading-relaxed">Join us in making a difference, one action at a time.</p>
          </div>
        </div>
        
        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <div className="font-headline text-primary text-3xl font-bold tracking-tight mb-2">Terra Relief</div>
            <h1 className="font-headline text-2xl font-semibold text-on-surface mb-2">Welcome Back</h1>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed">Sign in to continue your impact journey.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg text-sm border border-error/20 flex flex-col gap-2">
              <p className="font-bold">Login Failed</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-surface rounded-DEFAULT border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body text-base placeholder:text-on-surface-variant/50 transition-colors" 
                  id="email" 
                  name="email" 
                  placeholder="you@example.com" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-label text-sm font-medium text-on-surface" htmlFor="password">Password</label>
                <Link className="font-label text-sm font-medium text-primary hover:text-primary-container transition-colors underline underline-offset-2" href="#">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  className="w-full pl-10 pr-10 py-3 bg-surface rounded-DEFAULT border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body text-base placeholder:text-on-surface-variant/50 transition-colors" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none" type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>
            
            {/* Remember Me */}
            <div className="flex items-center">
              <input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface cursor-pointer" id="remember-me" name="remember-me" type="checkbox"/>
              <label className="ml-2 block font-body text-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            
            {/* Submit Button */}
            <div className="pt-2">
              <button 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <p className="font-body text-sm text-on-surface-variant">
              New to Terra Relief?{' '}
              <Link className="font-medium text-primary hover:text-primary-container transition-colors underline underline-offset-2" href="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
