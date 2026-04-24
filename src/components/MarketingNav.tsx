'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

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
      className={`sticky top-0 z-50 w-full transition-[padding] duration-500 ease-out ${
        scrolled
          ? 'pt-2'
          : 'pt-0'
      }`}
    >

      <div
        className={`relative flex items-center justify-between px-6 md:px-12 w-full transition-[height,background,box-shadow,border-radius] duration-500 ease-out will-change-transform ${
          scrolled
            ? 'h-16 backdrop-blur-md bg-[#FAF8F4]/40 border border-[#E8E2D9]/65 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] translate-y-[0px]'
            : 'h-20 bg-transparent translate-y-0'
        }`}
      >

        {/* Wordmark */}
        <Link
          href="/"
          className={`font-['Cormorant_Garamond'] font-semibold tracking-tight text-[#1A1713] hover:opacity-80 transition-[font-size,transform] duration-400 ease-out ${
            scrolled ? 'text-[28px] md:text-[32px]' : 'text-[34px] md:text-[38px]'
          }`}
        >
          Kindred Relief
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 ml-8">
          {[
            { label: 'Our Mission', href: '/' },
            { label: 'Programs', href: '/programs' },
            { label: 'Get Involved', href: '/get-involved' },
            { label: 'Impact', href: '/impact' },
          ].map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={`font-['DM_Sans'] text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-[#3D4A2E]'
                    : 'text-[#9A8F82] hover:text-[#3D4A2E]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <Link
              href="/feed"
              className={`flex items-center gap-2 font-['DM_Sans'] text-[12px] font-medium tracking-[0.12em] uppercase bg-[#1A1713] text-[#F5F0E8] px-5 py-2.5 hover:bg-[#3D4A2E] transition-transform duration-300 ease-out ${
                scrolled ? 'scale-[0.95]' : 'scale-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-['DM_Sans'] text-[13px] font-medium tracking-[0.12em] uppercase text-[#9A8F82] hover:text-[#1A1713] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`font-['DM_Sans'] text-[12px] font-medium tracking-[0.14em] uppercase bg-[#C4622D] text-white px-6 py-2.5 hover:bg-[#a94e22] transition-transform duration-300 ease-out ${
                  scrolled ? 'scale-[0.95]' : 'scale-100'
                }`}
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
    </nav>
  );
}