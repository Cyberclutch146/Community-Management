"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: 'fa-home', label: 'Home' },
  { href: '/events', icon: 'fa-search', label: 'Discover' },
  { href: '/dashboard', icon: 'fa-plus', label: 'Create', special: true },
  { href: '/chat', icon: 'fa-comment-dots', label: 'Chat', badge: 3 },
  { href: '/profile', icon: 'fa-user', label: 'Profile' },
];

const BottomNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {navItems.map((item) => {
          const active = isActive(item.href);

          if (item.special) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center text-gray-400 hover:text-accent transition-colors">
                <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center -mt-6 shadow-lg border-4 border-white">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="text-xs font-medium mt-1">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center transition-colors ${active ? 'text-accent' : 'text-gray-400 hover:text-accent'}`}>
              <div className="relative">
                <i className={`fas ${item.icon} text-xl mb-1`}></i>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
