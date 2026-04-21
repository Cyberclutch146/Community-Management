'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function MarketingNav() {
  const { user, profile } = useAuth();
  
  return (
    <nav className="bg-[#faf6f0] dark:bg-stone-900 font-['Nunito_Sans'] font-medium tracking-tight docked full-width top-0 border-b border-stone-200/50 shadow-[0_4px_20px_rgba(46,50,48,0.06)] z-50 sticky">
      <div className="flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-7xl mx-auto">
        <Link className="font-headline text-2xl font-bold text-[#4a7c59] dark:text-emerald-500" href="/">
          Kindred Relief Network
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link className="text-[#4a7c59] dark:text-emerald-400 font-bold border-b-2 border-[#4a7c59] dark:border-emerald-500 pb-1" href="#">Our Mission</Link>
          <Link className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200" href="#">Programs</Link>
          <Link className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200" href="#">Get Involved</Link>
          <Link className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200" href="#">Impact</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Link href="/feed" className="flex items-center gap-2 bg-[#4a7c59] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-opacity-90 active:scale-95 transition-transform duration-150 ease-in-out shadow-sm">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200 font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-[#4a7c59] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-opacity-90 active:scale-95 transition-transform duration-150 ease-in-out shadow-sm">
                Donate Now
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
        </button>
      </div>
    </nav>
  );
}
