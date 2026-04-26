'use client'

import { Lora } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Bell, X, Sun, Moon, User, LogOut, Info } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { getUserAvatar } from '@/lib/avatar'

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function NavbarTop() {
  const router = useRouter()
  const pathname = usePathname()
  const { profile, logout } = useAuth()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/feed?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add hysteresis to prevent flicker
      if (currentScrollY > 20 && !scrolled) {
        setScrolled(true)
      } else if (currentScrollY < 10 && scrolled) {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Events', path: '/feed' },
    { label: 'Organize', path: '/create' },
    { label: 'Dashboard', path: '/dashboard', exact: true },
    { label: 'Sentinel', path: '/dashboard/sentinel' },
  ]

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.exact) return pathname === link.path
    return pathname.startsWith(link.path)
  }

  return (
    <div
      className={`fixed inset-x-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'top-3 mx-4 rounded-[24px]'
          : 'top-0'
      }`}
      style={{
        background: scrolled
          ? 'var(--glass-bg)'
          : 'var(--glass-bg-strong)',
        backdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'blur(20px) saturate(1.3)',
        border: `1px solid var(--glass-border)`,
        boxShadow: scrolled
          ? 'var(--glass-shadow-lg)'
          : '0 1px 3px rgba(42, 45, 43, 0.04)',
      }}
    >
      <div className={`mx-auto flex items-center justify-between max-w-7xl transition-all duration-500 ${
        scrolled ? 'px-5 py-2' : 'px-10 py-3.5'
      }`}>
        {/* Logo */}
        <button
          onClick={() => router.push('/home')}
          className={`font-semibold ${lora.className} text-on-surface tracking-tight transition-all duration-300 hover:opacity-80 ${
            scrolled ? 'text-[17px]' : 'text-[22px]'
          }`}
        >
          <span className="text-gradient-earth">ReliefConnect</span>
        </button>

        {/* Nav Links */}
        <div className={`flex items-center ${scrolled ? 'gap-1' : 'gap-1.5'}`}>
          {navLinks.map((link) => {
            const active = isLinkActive(link)
            return (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
                  active
                    ? 'text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, var(--color-primary-base) 0%, var(--color-moss) 100%)',
                  boxShadow: '0 2px 8px rgba(59, 107, 74, 0.25)',
                } : undefined}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Right Section */}
        <div className={`flex items-center ${scrolled ? 'gap-2' : 'gap-3'} text-on-surface`}>
          {searchOpen ? (
            <div
              className="flex items-center gap-2 rounded-full px-3.5 py-2 animate-in fade-in duration-200"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 2px 12px rgba(59, 107, 74, 0.08)',
              }}
            >
              <Search size={15} className="text-on-surface-variant" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search events…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent outline-none text-sm w-44 text-on-surface placeholder:text-on-surface-variant/60"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="hover:scale-110 active:scale-95 transition-all p-0.5 rounded-full hover:bg-surface-variant/50">
                <X size={14} className="text-on-surface-variant" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-surface-container/50 transition-all duration-200 active:scale-95">
              <Search size={scrolled ? 16 : 17} />
            </button>
          )}

          <button className="p-2 rounded-full hover:bg-surface-container/50 transition-all duration-200 active:scale-95 relative">
            <Bell size={scrolled ? 16 : 17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-terracotta)] ring-2 ring-[var(--glass-bg-strong)]" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`${scrolled ? 'w-8 h-8' : 'w-9 h-9'} rounded-full overflow-hidden transition-all duration-300 ease-out ring-2 ring-transparent hover:ring-primary/40 focus:ring-primary/40`}
              style={{ boxShadow: '0 2px 8px rgba(42, 45, 43, 0.1)' }}
            >
              <img
                src={getUserAvatar(profile?.avatarUrl, profile?.displayName)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-3 w-56 rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                style={{
                  background: 'var(--glass-bg-strong)',
                  backdropFilter: 'blur(32px) saturate(1.5)',
                  WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow-lg)',
                }}
              >
                <div className="px-4 py-3 mb-2" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <p className="text-sm font-semibold text-on-surface truncate">{profile?.displayName || 'User'}</p>
                  <p className="text-xs text-on-surface-variant truncate">{profile?.email || ''}</p>
                </div>

                <button
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="w-full px-4 py-2.5 text-left text-sm text-on-surface hover:bg-surface-variant/40 transition-colors flex items-center gap-3 rounded-lg mx-1"
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  {mounted && resolvedTheme === 'dark' ? <Sun size={16} className="text-on-surface-variant" /> : <Moon size={16} className="text-on-surface-variant" />}
                  {mounted && resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>

                <button
                  onClick={() => { setProfileMenuOpen(false); router.push('/profile'); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-on-surface hover:bg-surface-variant/40 transition-colors flex items-center gap-3 rounded-lg mx-1"
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  <User size={16} className="text-on-surface-variant" />
                  View Profile
                </button>

                <button
                  onClick={() => { setProfileMenuOpen(false); router.push('/about'); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-on-surface hover:bg-surface-variant/40 transition-colors flex items-center gap-3 rounded-lg mx-1"
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  <Info size={16} className="text-on-surface-variant" />
                  About Us
                </button>

                <div className="my-2 mx-3" style={{ height: '1px', background: 'var(--glass-border)' }} />

                <button
                  onClick={async () => {
                    setProfileMenuOpen(false);
                    await logout();
                    router.push('/');
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-error hover:bg-error-container/20 transition-colors flex items-center gap-3 font-medium rounded-lg mx-1"
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
