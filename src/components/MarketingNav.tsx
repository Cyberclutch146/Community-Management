'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function MarketingNav() {
  const { user, profile } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Frosted glass backdrop */}
      <div className="absolute inset-0 bg-[#faf6f0]/80 backdrop-blur-md" />

      <div className="relative flex items-center justify-between w-full px-6 md:px-12 h-16 max-w-7xl mx-auto">

        {/* Wordmark */}
        <Link
          href="/"
          className="font-['lora'] text-[40px] font-bold tracking-wide text-[#f5f0e8] dark:text-emerald-500 shrink-0"
        >
          Kindred Relief
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {[
            { label: 'Our Mission', href: '#' },
            { label: 'Programs', href: '#' },
            { label: 'Get Involved', href: '#' },
            { label: 'Impact', href: '#' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-['Nunito_Sans'] text-[13.5px] font-semibold tracking-wide text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <Link
              href="/feed"
              className="flex items-center gap-1.5 font-['Nunito_Sans'] text-[13.5px] font-semibold tracking-wide bg-[#4a7c59] text-white px-4 py-2 rounded-full hover:bg-[#3d6b4a] active:scale-95 transition-all duration-150 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-['Nunito_Sans'] text-[13.5px] font-semibold tracking-wide text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="font-['Nunito_Sans'] text-[13.5px] font-semibold tracking-wide bg-[#4a7c59] text-white px-5 py-2 rounded-full hover:bg-[#3d6b4a] active:scale-95 transition-all duration-150 shadow-sm"
              >
                Donate Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-stone-500 hover:text-[#4a7c59] transition-colors">
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            menu
          </span>
        </button>
      </div>

      {/* Hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200/60 dark:bg-stone-700/40" />
    </nav>
  );
}