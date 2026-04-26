'use client'

import { Lora } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Bell, X, Sun, Moon, User, LogOut, Info, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { getUserAvatar } from '@/lib/avatar'
import { SentinelAlert } from '@/types/sentinel'

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

type NavNotification = {
  id: string
  title: string
  body: string
  path: string
  tone: 'alert' | 'info' | 'success'
}

export default function NavbarTop() {
  const router = useRouter()
  const pathname = usePathname()
  const { profile, logout } = useAuth()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<NavNotification[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

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
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const cancelled = { current: false }

    const loadNotifications = async () => {
      const nextNotifications: NavNotification[] = []

      if (!profile?.profileComplete) {
        nextNotifications.push({
          id: 'complete-profile',
          title: 'Complete your profile',
          body: 'Add your skills and location to unlock better event matching.',
          path: '/profile',
          tone: 'info',
        })
      }

      try {
        const res = await fetch('/api/sentinel')
        if (res.ok) {
          const alerts: SentinelAlert[] = await res.json()
          alerts
            .filter((alert) => alert.severity === 'Extreme' || alert.severity === 'Severe')
            .slice(0, 3)
            .forEach((alert) => {
              nextNotifications.push({
                id: alert.id,
                title: `${alert.severity} ${alert.type.toLowerCase()} alert`,
                body: alert.title,
                path: '/dashboard/sentinel',
                tone: 'alert',
              })
            })
        }
      } catch {
        nextNotifications.push({
          id: 'sentinel-unavailable',
          title: 'Sentinel temporarily unavailable',
          body: 'Live alert data could not be refreshed just now.',
          path: '/dashboard/sentinel',
          tone: 'info',
        })
      }

      if (nextNotifications.length === 0) {
        nextNotifications.push({
          id: 'all-clear',
          title: 'All quiet for now',
          body: 'No critical Sentinel alerts and your account is up to date.',
          path: '/dashboard/sentinel',
          tone: 'success',
        })
      }

      if (!cancelled.current) {
        setNotifications(nextNotifications)
      }
    }

    loadNotifications()
    return () => {
      cancelled.current = true
    }
  }, [profile?.profileComplete])

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

  const unreadCount = notifications.filter((notification) => notification.tone !== 'success').length

  const notificationToneStyles: Record<NavNotification['tone'], { accent: string; background: string; border: string }> = {
    alert: {
      accent: 'var(--color-error-base)',
      background: 'rgba(184,50,48,0.08)',
      border: 'rgba(184,50,48,0.14)',
    },
    info: {
      accent: 'var(--color-primary-base)',
      background: 'rgba(59,107,74,0.08)',
      border: 'rgba(59,107,74,0.14)',
    },
    success: {
      accent: 'var(--color-warm-amber)',
      background: 'rgba(212,168,82,0.1)',
      border: 'rgba(212,168,82,0.16)',
    },
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

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationMenuOpen((open) => !open)}
              className="p-2 rounded-full hover:bg-surface-container/50 transition-all duration-200 active:scale-95 relative"
            >
              <Bell size={scrolled ? 16 : 17} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[0.5rem] h-2 rounded-full bg-[var(--color-terracotta)] ring-2 ring-[var(--glass-bg-strong)] px-1 text-[9px] leading-none flex items-center justify-center text-white font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 mt-3 w-[21rem] overflow-hidden rounded-[28px] z-50 origin-top-right"
                  style={{
                    background: 'var(--color-surface-base)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow-lg)',
                  }}
                >
                  <div className="p-3">
                    <div
                      className="rounded-[22px] p-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59,107,74,0.16), rgba(139,109,46,0.1) 55%, color-mix(in srgb, var(--color-surface-base) 92%, transparent) 100%)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">Notifications</p>
                          <p className="mt-1 text-base font-semibold text-on-surface">What needs your attention</p>
                        </div>
                        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ background: 'rgba(59,107,74,0.08)', color: 'var(--color-primary-base)', border: '1px solid rgba(59,107,74,0.12)' }}>
                          {notifications.length}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      {notifications.map((notification) => {
                        const tone = notificationToneStyles[notification.tone]
                        return (
                          <button
                            key={notification.id}
                            onClick={() => {
                              setNotificationMenuOpen(false)
                              router.push(notification.path)
                            }}
                            className="w-full rounded-[20px] p-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                              background: tone.background,
                              border: `1px solid ${tone.border}`,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                                style={{ background: 'color-mix(in srgb, var(--color-surface-bright-base) 82%, transparent)', color: tone.accent, border: `1px solid ${tone.border}` }}
                              >
                                <Bell size={15} />
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-on-surface">{notification.title}</p>
                                <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{notification.body}</p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => {
                        setNotificationMenuOpen(false)
                        router.push('/dashboard/sentinel')
                      }}
                      className="mt-3 w-full rounded-[20px] px-4 py-3 text-sm font-semibold text-on-primary transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                        boxShadow: '0 4px 14px rgba(59,107,74,0.22)',
                      }}
                    >
                      Open Sentinel Center
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`${scrolled ? 'w-8 h-8' : 'w-9 h-9'} rounded-full overflow-hidden transition-all duration-300 ease-out ring-2 ring-transparent hover:ring-primary/40 focus:ring-primary/40 flex items-center justify-center`}
              style={{ boxShadow: '0 2px 8px rgba(42, 45, 43, 0.1)' }}
            >
              {profileMenuOpen ? (
                <ChevronDown size={scrolled ? 18 : 20} className="text-on-surface" />
              ) : (
                <img
                  src={getUserAvatar(profile?.avatarUrl, profile?.displayName)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </button>

            <AnimatePresence>
              {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-0 mt-3 w-[17.5rem] overflow-hidden rounded-[28px] z-50 origin-top-right"
                style={{
                  background: 'var(--color-surface-base)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow-lg)',
                }}
              >
                <div className="relative z-10 p-3">
                  <div
                    className="overflow-hidden rounded-[22px] p-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,107,74,0.16), rgba(139,109,46,0.1) 55%, color-mix(in srgb, var(--color-surface-base) 92%, transparent) 100%)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl"
                        style={{ boxShadow: '0 6px 18px rgba(42,45,43,0.12)', border: '1px solid var(--glass-border)' }}
                      >
                        <img
                          src={getUserAvatar(profile?.avatarUrl, profile?.displayName)}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">Signed in</p>
                        <p className="mt-1 text-base font-semibold text-on-surface truncate">{profile?.displayName || 'User'}</p>
                        <p className="text-xs text-on-surface-variant truncate">{profile?.email || ''}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                      className="col-span-2 rounded-[20px] px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'color-mix(in srgb, var(--color-primary-base) 10%, var(--color-surface-container-high-base) 90%)',
                        border: '1px solid color-mix(in srgb, var(--color-primary-base) 18%, var(--glass-border) 82%)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{ background: 'color-mix(in srgb, var(--color-surface-bright-base) 82%, transparent)', border: '1px solid var(--glass-border)' }}
                        >
                          {mounted && resolvedTheme === 'dark' ? <Sun size={17} className="text-on-surface-variant" /> : <Moon size={17} className="text-on-surface-variant" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{mounted && resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
                          <p className="text-[11px] text-on-surface-variant">Switch the vibe instantly</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => { setProfileMenuOpen(false); router.push('/profile'); }}
                      className="rounded-[20px] px-3.5 py-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'color-mix(in srgb, var(--color-surface-container-high-base) 84%, transparent)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <User size={17} className="text-on-surface-variant mb-3" />
                      <p className="text-sm font-semibold text-on-surface">Profile</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Your public card</p>
                    </button>

                    <button
                      onClick={() => { setProfileMenuOpen(false); router.push('/about'); }}
                      className="rounded-[20px] px-3.5 py-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'color-mix(in srgb, var(--color-surface-container-high-base) 84%, transparent)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <Info size={17} className="text-on-surface-variant mb-3" />
                      <p className="text-sm font-semibold text-on-surface">About</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Mission and team</p>
                    </button>
                  </div>

                  <div className="my-3 mx-1" style={{ height: '1px', background: 'var(--glass-border)' }} />

                  <button
                    onClick={async () => {
                      setProfileMenuOpen(false);
                      await logout();
                      router.push('/');
                    }}
                    className="w-full rounded-[20px] px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'color-mix(in srgb, var(--color-error-base) 10%, var(--color-surface-container-high-base) 90%)',
                      border: '1px solid color-mix(in srgb, var(--color-error-base) 18%, var(--glass-border) 82%)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: 'color-mix(in srgb, var(--color-surface-bright-base) 82%, transparent)', border: '1px solid color-mix(in srgb, var(--color-error-base) 15%, var(--glass-border) 85%)' }}
                      >
                        <LogOut size={17} className="text-error" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-error">Log Out</p>
                        <p className="text-[11px] text-on-surface-variant">End this session</p>
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
