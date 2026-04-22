'use client'

import { Lora } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Bell, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useState, useRef, useEffect } from 'react'

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function NavbarTop() {
  const router = useRouter()
  const pathname = usePathname()
  const { profile } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus()
  }, [searchOpen])

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/feed?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <div className="flex items-center justify-between px-10 py-4 bg-[#f0eee9] rounded-full mx-6 mt-4">
      {/* Logo */}
      <div className={`text-xl font-semibold ${lora.className}`}>ReliefConnect</div>

      {/* Nav Links */}
      <div className="flex gap-8 text-sm">
        <button
          onClick={() => router.push('/home')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/home') ? 'border-[#1f3d2b]' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Home
        </button>

        <button
          onClick={() => router.push('/feed')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/feed') ? 'border-[#1f3d2b]' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Events
        </button>

        <button
          onClick={() => router.push('/create')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/create') ? 'border-[#1f3d2b]' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Organize
        </button>

        <button
          onClick={() => router.push('/dashboard')}
          className={`pb-1 border-b-2 ${pathname.startsWith('/dashboard') ? 'border-[#1f3d2b]' : 'border-transparent opacity-60'} hover:opacity-100 active:scale-95 transition-all duration-200 ease-out`}
        >
          Dashboard
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-200 animate-in fade-in duration-200">
            <Search size={16} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent outline-none text-sm w-44 text-[#1f3d2b] placeholder:text-gray-400"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="hover:scale-110 active:scale-95 transition-all">
              <X size={14} className="text-gray-400" />
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

        <button
          onClick={() => router.push('/profile')}
          className="w-10 h-10 rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-200 ease-out"
        >
          <img
            src={profile?.avatarUrl || 'https://i.pravatar.cc/100'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  )
}