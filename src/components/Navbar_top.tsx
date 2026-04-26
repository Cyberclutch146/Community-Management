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
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
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
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add hysteresis to prevent flicker
      if (currentScrollY > 20 && !scrolled) {
        setScrolled(true)
      } else if (currentScrollY < 10 && scrolled) {
        setScrolled(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <div
      className={`flex items-center justify-between px-10 ${scrolled ? 'py-2' : 'py-4'} transition-all duration-200
  ${scrolled
    ? 'bg-surface-container/80 backdrop-blur-md border-b border-outline-variant/30'
    : 'bg-surface-container rounded-full mx-6 mt-4'
  }`}
    >
      {/* Logo */}
      <div className={`text-xl font-semibold ${lora.className} text-on-surface`}>ReliefConnect</div>

      {/* Nav Links */}
      <div className="flex gap-8 text-sm text-on-surface">
        <button
          onClick={() => router.push('/home')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/home') ? 'border-primary' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Home
        </button>

        <button
          onClick={() => router.push('/feed')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/feed') ? 'border-primary' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Events
        </button>

        <button
          onClick={() => router.push('/create')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/create') ? 'border-primary' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Organize
        </button>

        <button
          onClick={() => router.push('/dashboard')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/dashboard') ? 'border-primary' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Dashboard
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 text-on-surface">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-surface rounded-full px-3 py-1.5 shadow-sm border border-outline-variant animate-in fade-in duration-200">
            <Search size={16} className="text-on-surface-variant" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent outline-none text-sm w-44 text-on-surface placeholder:text-on-surface-variant"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="hover:scale-110 active:scale-95 transition-all">
              <X size={14} className="text-on-surface-variant" />
            </button>
          </div>
        ) : (
          <button onClick={() => setSearchOpen(true)} className="hover:scale-110 active:scale-95 transition-all duration-200 ease-out">
            <Search size={18} />
          </button>
        )}

        <button className="hover:scale-110 active:scale-95 transition-all duration-200 ease-out">
          <Bell size={18} />
        </button>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="w-10 h-10 rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-200 ease-out border-2 border-transparent hover:border-primary focus:border-primary"
          >
            <img
              src={getUserAvatar(profile?.avatarUrl, profile?.displayName)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
          
          {profileMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-outline-variant/20 mb-2">
                <p className="text-sm font-medium text-on-surface truncate">{profile?.displayName || 'User'}</p>
                <p className="text-xs text-on-surface-variant truncate">{profile?.email || ''}</p>
              </div>
              
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="w-full px-4 py-2.5 text-left text-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-3"
              >
                {mounted && resolvedTheme === 'dark' ? <Sun size={16} className="text-on-surface-variant" /> : <Moon size={16} className="text-on-surface-variant" />}
                {mounted && resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              <button
                onClick={() => { setProfileMenuOpen(false); router.push('/profile'); }}
                className="w-full px-4 py-2.5 text-left text-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-3"
              >
                <User size={16} className="text-on-surface-variant" />
                View Profile
              </button>
              
              <button
                onClick={() => { setProfileMenuOpen(false); router.push('/about'); }}
                className="w-full px-4 py-2.5 text-left text-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-3"
              >
                <Info size={16} className="text-on-surface-variant" />
                About Us
              </button>
              
              <div className="h-[1px] bg-outline-variant/20 my-2" />
              
              <button
                onClick={async () => {
                  setProfileMenuOpen(false);
                  await logout();
                  router.push('/');
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-error hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-3 font-medium"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}