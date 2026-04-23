'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createUserProfile } from '@/services/userService';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await register(email, password);
      await createUserProfile(user.uid, {
        displayName: fullName,
        email: email,
        location: location,
        role: 'volunteer',
        skills: [],
        bio: '',
        phone: '',
        avatarUrl: '',
        volunteerHours: 0,
        totalDonated: 0,
        profileComplete: false
      });
      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-[calc(100vh-80px)] flex items-center justify-center p-4 xl:py-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,50,48,0.06),0_0_60px_10px_rgba(var(--primary),0.35)] bg-surface-container-lowest min-h-[700px]">
        {/* Image Canvas */}
        <div className="hidden md:block md:w-5/12 lg:w-1/2 relative bg-surface-variant">
          <img alt="Planting a sapling" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAreKeglV9ZJKv0zGehE1dWVuvZrijPeYA4HQmiOFaMZ5UFVHy1IW_xmFj7ZmVWbkTnEbUm7mi9uEQ7PmFIufwWsH4bZsVoqT7uGgRpLE2rKYui85nDDLq3Te3U3evUqEwira7Ca4IODlVfwWIhRliXqnA0fWrauQ4nRfj7Yw9irLFoSP_jWRarHU2q9nitqm0J98DmRY3QNec-8pYzPPdN73LXN8LnfSYsfSCvgZUotNzZvqvcwImGHu7zz4nhaQIjrdkV8Wn9w7GZ"/>
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/60 to-transparent text-on-primary">
            <h2 className="font-headline text-3xl font-bold mb-3">Rooted in community, grown through care.</h2>
            <p className="font-body text-lg text-on-primary/90 leading-relaxed max-w-md">Join our global network of volunteers and coordinators making a tangible difference in communities worldwide.</p>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="font-headline text-3xl text-primary font-bold mb-2">Terra Relief</h1>
            <p className="font-body text-on-surface-variant text-lg">Create your volunteer account.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg text-sm border border-error/20 flex flex-col gap-2">
              <p className="font-bold">Registration Failed</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block font-label text-sm font-semibold text-on-surface mb-2" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">person</span>
                </div>
                <input 
                  className="block w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/60 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Jane Doe" 
                  required 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label className="block font-label text-sm font-semibold text-on-surface mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">mail</span>
                </div>
                <input 
                  className="block w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/60 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body" 
                  id="email" 
                  name="email" 
                  placeholder="jane@example.com" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label className="block font-label text-sm font-semibold text-on-surface mb-2" htmlFor="location">Primary Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">location_on</span>
                </div>
                <input 
                  className="block w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/60 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body" 
                  id="location" 
                  name="location" 
                  placeholder="City, Country" 
                  required 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block font-label text-sm font-semibold text-on-surface mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">lock</span>
                </div>
                <input 
                  className="block w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/60 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <p className="mt-2 text-sm text-on-surface-variant font-body">Must be at least 8 characters long.</p>
            </div>
            
            {/* Terms */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input 
                  className="w-5 h-5 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2" 
                  id="terms" 
                  name="terms" 
                  required 
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={loading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-body text-on-surface-variant" htmlFor="terms">
                  I agree to the <Link className="text-primary hover:text-primary-container font-semibold underline decoration-primary/30 underline-offset-4" href="#">Terms of Service</Link> and <Link className="text-primary hover:text-primary-container font-semibold underline decoration-primary/30 underline-offset-4" href="#">Privacy Policy</Link>.
                </label>
              </div>
            </div>
            
            {/* Actions */}
            <div className="pt-4">
              <button 
                className="w-full flex justify-center items-center py-3 px-6 rounded-xl shadow-sm text-lg font-semibold text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Join Terra Relief'}
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
                <span className="px-2 bg-surface-container-lowest text-on-surface-variant font-body">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-outline-variant rounded-lg shadow-sm bg-surface text-sm font-medium text-on-surface hover:bg-surface-variant transition-colors"
                onClick={() => console.log('Google signup placeholder')}
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
                onClick={() => console.log('GitHub signup placeholder')}
              >
                <svg className="h-5 w-5 mr-2 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center border-t border-outline-variant/30 pt-6">
            <p className="font-body text-on-surface-variant">
              Already have an account?{' '}
              <Link className="font-semibold text-primary hover:text-primary-container underline decoration-primary/30 underline-offset-4 transition-colors" href="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
