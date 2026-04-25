'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function MarketingNav() {
  const { user, profile } = useAuth();

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`font-['Nunito_Sans'] font-medium tracking-tight top-0 z-50 sticky transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-outline-variant/20 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto">
        <Link className="font-headline text-2xl font-bold text-primary tracking-tighter" href="/">
          Kindred Relief Network
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <Link href="/feed" className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm">
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold tracking-tight">
                Login
              </Link>
              <Link href="/register" className="bg-primary text-on-primary px-8 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200">
                Join Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}