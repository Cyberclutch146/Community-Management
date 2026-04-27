'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { getUserAvatar } from '@/lib/avatar';

export function SideNav() {
  const pathname = usePathname();
  const { profile } = useAuth();
  
  const navItems = [
    { name: 'Feed', href: '/feed', icon: 'dashboard' },
    { name: 'Dashboard', href: '/dashboard', icon: 'volunteer_activism' },
    { name: 'Sentinel', href: '/dashboard/sentinel', icon: 'security' },
    { name: 'Leaderboard', href: '/leaderboard', icon: 'emoji_events' },
    { name: 'Create', href: '/create', icon: 'inventory_2' },
    { name: 'Profile', href: '/profile', icon: 'settings' },
  ];

  return (
    <nav
      className="hidden md:flex flex-col h-screen sticky top-0 py-8 w-64 flex-shrink-0"
      style={{
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        borderRight: '1px solid var(--glass-border)',
      }}
    >
      <Link href="/" className="px-6 mb-8 flex items-center gap-3 group">
        <div
          aria-label="Organization Logo"
          className="w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-lg transition-transform duration-300 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
            color: 'var(--color-on-primary-base)',
            boxShadow: '0 4px 14px rgba(59, 107, 74, 0.25)',
          }}
        >
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>energy_savings_leaf</span>
        </div>
        <div>
          <h1 className="font-headline text-lg font-bold tracking-tight text-gradient-earth">Kindred Relief</h1>
          <p className="font-body text-xs text-on-surface-variant">Local Response Team</p>
        </div>
      </Link>
      
      <ul className="flex flex-col gap-1.5 px-4 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ease-out font-semibold text-sm ${
                  isActive 
                    ? 'text-on-primary' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, var(--color-primary-base) 0%, var(--color-moss) 100%)',
                  boxShadow: '0 3px 12px rgba(59, 107, 74, 0.25)',
                } : undefined}
              >
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
                <span className="font-label">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      
      <div className="px-5 mt-auto">
        <Link
          href="/profile"
          className="flex items-center gap-3 pt-4 hover:opacity-80 transition-all duration-200 rounded-xl px-2 py-2 hover:bg-surface-container/30"
          style={{ borderTop: '1px solid var(--glass-border)' }}
        >
          {profile?.avatarUrl ? (
            <Image alt={profile.displayName || 'User'} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" src={getUserAvatar(profile.avatarUrl, profile.displayName)} width={36} height={36} />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-container-base), var(--color-sage))',
                color: 'var(--color-on-primary-container-base)',
              }}
            >
              {(profile?.displayName || 'U').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-on-surface">{profile?.displayName || 'User'}</p>
            <p className="text-xs text-on-surface-variant">{profile?.role || 'Volunteer'}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export function MobileHeader() {
  return (
    <header
      className="md:hidden flex justify-between items-center px-6 h-16 w-full text-primary font-body text-sm tracking-tight sticky top-0 z-40"
      style={{
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        borderBottom: '1px solid var(--glass-border)',
        boxShadow: '0 4px 20px rgba(42, 45, 43, 0.06)',
      }}
    >
      <div className="font-headline text-xl font-bold text-gradient-earth">Outreach & Relief</div>
      <div className="flex gap-2">
        <button aria-label="Notifications" className="text-primary hover:bg-surface-container/40 rounded-full p-2 transition-colors active:opacity-80 duration-150 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-terracotta)] ring-2" style={{ boxShadow: '0 0 0 2px var(--glass-bg-strong)' }} />
        </button>
        <button aria-label="Location" className="text-primary hover:bg-surface-container/40 rounded-full p-2 transition-colors active:opacity-80 duration-150">
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
    <nav
      className="md:hidden fixed bottom-0 w-full z-50 rounded-t-2xl pb-[env(safe-area-inset-bottom)]"
      style={{
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'blur(28px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
        borderTop: '1px solid var(--glass-border)',
        boxShadow: '0 -4px 24px rgba(42, 45, 43, 0.06)',
      }}
    >
      <div className="flex justify-between items-center px-4 h-[68px] w-full max-w-md mx-auto">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-2xl px-4 py-1.5 transition-all duration-300 ease-out active:scale-95 font-sans text-[11px] font-semibold flex-1 ${
                isActive ? 'text-on-primary' : 'text-on-surface-variant'
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg, var(--color-primary-base) 0%, var(--color-moss) 100%)',
                boxShadow: '0 2px 10px rgba(59, 107, 74, 0.3)',
              } : undefined}
            >
              <span className="material-symbols-outlined mb-0.5 text-[22px]" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
