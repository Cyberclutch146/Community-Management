"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: 'home', label: 'Home' },
  { href: '/create-event', icon: 'add_circle', label: 'Create' },
  { href: '/chat', icon: 'chat_bubble', label: 'Chat' },
  { href: '/profile', icon: 'person', label: 'Profile' },
];

const BottomNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-[#faf6f0]/95 dark:bg-stone-900/95 backdrop-blur-md fixed bottom-0 left-0 w-full rounded-t-3xl border-t border-stone-200/50 dark:border-stone-800 shadow-[0_-4px_20px_rgba(46,50,48,0.08)] z-50 flex justify-around items-center px-4 pb-[env(safe-area-inset-bottom,1rem)] h-20 md:hidden block">
      {navItems.map((item) => {
        const active = isActive(item.href);

        return (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center px-4 py-1 active:scale-90 transition-transform duration-150 ${
            active 
              ? 'text-[#4a7c59] dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-xl' 
              : 'text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400'
          }`}>
            <span className="material-symbols-outlined mb-1 text-[24px]" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span className="font-sans text-[11px] font-medium tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
