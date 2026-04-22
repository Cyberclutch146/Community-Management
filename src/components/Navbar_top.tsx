'use client'

import { Lora } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function NavbarTop() {
  const router = useRouter()
  const pathname = usePathname()
  const { profile } = useAuth()

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
      <div className="flex items-center gap-8">
        <button className="hover:scale-110 active:scale-95 transition-all duration-200 ease-out">
          <Search size={18} />
        </button>

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