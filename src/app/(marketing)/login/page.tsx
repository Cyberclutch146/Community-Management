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

          {/* Social Logins */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-on-surface-variant font-body">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-outline-variant rounded-lg shadow-sm bg-surface text-sm font-medium text-on-surface hover:bg-surface-variant transition-colors"
                onClick={() => console.log('Google login placeholder')}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-outline-variant rounded-lg shadow-sm bg-surface text-sm font-medium text-on-surface hover:bg-surface-variant transition-colors"
                onClick={() => console.log('GitHub login placeholder')}
              >
                <svg className="h-5 w-5 mr-2 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
          
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
