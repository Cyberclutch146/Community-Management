"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: 'dashboard', label: 'Dashboard' },
  { href: '/chat', icon: 'chat_bubble', label: 'Community Community' },
  { href: '/create-event', icon: 'add_circle', label: 'Create Event' },
];

const SideNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden md:flex flex-col h-screen sticky top-0 py-8 w-64 border-r border-outline-variant bg-surface-bright flex-shrink-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div aria-label="Organization Logo" className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline font-bold text-lg">
          <span className="material-symbols-outlined">energy_savings_leaf</span>
        </div>
        <div>
          <h1 className="font-headline text-lg text-primary font-bold tracking-tight">Kindred Relief</h1>
          <p className="font-body text-xs text-secondary">Local Response Team</p>
        </div>
      </div>
      <ul className="flex flex-col gap-2 px-4 flex-grow">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-primary bg-surface-container border-l-4 border-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:pl-5'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="px-6 mt-auto">
        <Link href="/profile" className="flex items-center gap-3 pt-4 border-t border-outline-variant/30 hover:opacity-80 transition-opacity">
          <img alt="Sarah Jenkins" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwJvjpwYCm3jou4ZiOCnFkHwst3OgeXxfqu7wQl1brd29JEUbQjqMD6Nx1Pcz-oClevWLiH_Iio6ARJ-nM7JfYZyVI-xcwJQ0TbZ75sceGHgaBITdwmESij3ao10Wd8W4S33qtjBPXy1am_La9N6pH91cgTOHrSfApXIeyZ6b5B8tRRqyYQOB9fvfJwA1bfzAYgrrb7Ci9bjGvyLUtGMmTi71neq5DD0Jvq5v1GOH4cx_aQTTQEv2410I6VrUYjvIsChX88wjMYQkd"/>
          <div>
            <p className="text-sm font-semibold text-on-surface">Sarah Jenkins</p>
            <p className="text-xs text-secondary">Community Lead</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default SideNav;
