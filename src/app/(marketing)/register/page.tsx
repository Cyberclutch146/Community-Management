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
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,50,48,0.06)] bg-surface-container-lowest min-h-[700px]">
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
