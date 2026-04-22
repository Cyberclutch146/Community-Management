'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { currentUser } from '@/data/mockData';
import Image from 'next/image';

export function SideNav() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Feed', href: '/feed', icon: 'dashboard' },
    { name: 'Dashboard', href: '/dashboard', icon: 'volunteer_activism' },
    { name: 'Create', href: '/create', icon: 'inventory_2' },
    { name: 'Profile', href: '/profile', icon: 'settings' },
  ];

  return (
    <nav className="hidden md:flex flex-col h-screen sticky top-0 py-8 w-64 border-r border-outline-variant bg-surface-bright flex-shrink-0">
      <Link href="/" className="px-6 mb-8 flex items-center gap-3">
        <div aria-label="Organization Logo" className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline font-bold text-lg">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>energy_savings_leaf</span>
        </div>
        <div>
          <h1 className="font-headline text-lg text-primary font-bold tracking-tight">Kindred Relief</h1>
          <p className="font-body text-xs text-secondary">Local Response Team</p>
        </div>
      </Link>
      
      <ul className="flex flex-col gap-2 px-4 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-primary bg-surface-container border-l-4 border-primary font-bold' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:pl-5 font-bold'
                }`}
              >
                <span className="material-symbols-outlined" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
                <span className="font-label">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      
      <div className="px-6 mt-auto">
        <Link href="/profile" className="flex items-center gap-3 pt-4 border-t border-outline-variant/30 hover:opacity-80 transition-opacity">
          <Image alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" src={currentUser.avatar} width={40} height={40} />
          <div>
            <p className="text-sm font-semibold text-on-surface">{currentUser.name}</p>
            <p className="text-xs text-secondary">{currentUser.role}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export function MobileHeader() {
  return (
    <header className="md:hidden flex justify-between items-center px-6 h-16 w-full bg-surface-bright text-primary font-body text-sm tracking-tight border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)] sticky top-0 z-40">
      <div className="font-headline text-xl font-bold text-primary">Outreach & Relief</div>
      <div className="flex gap-4">
        <button className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors active:opacity-80 duration-150">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors active:opacity-80 duration-150">
          <span className="material-symbols-outlined">location_on</span>
        </button>
      </div>
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', href: '/feed', icon: 'home' },
    { name: 'Create', href: '/create', icon: 'add_circle' },
    { name: 'Dash', href: '/dashboard', icon: 'volunteer_activism' },
    { name: 'Profile', href: '/profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl border-t bg-[#faf6f0]/95 border-stone-200/40 shadow-[0_-4px_20px_rgba(46,50,48,0.04)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center px-4 h-20">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl px-4 py-1.5 transition-all duration-300 ease-out active:scale-95 font-sans text-[11px] font-semibold ${
                isActive ? 'bg-[#4a7c59]/10 text-primary' : 'text-stone-500 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
