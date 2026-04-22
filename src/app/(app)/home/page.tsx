'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Filter, Plus, Calendar, MapPin, Users, Mail, Loader2 } from 'lucide-react'
import { getEvents } from '@/services/eventService'
import { useAuth } from '@/context/AuthContext'
import { CommunityEvent } from '@/types'

export default function HomePage() {
  const router = useRouter()
  const { user, profile } = useAuth()

  const [events, setEvents] = useState<CommunityEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { events: data } = await getEvents()
        setEvents(data)
      } catch (err) {
        console.error('Failed to load events:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Pick a featured event: prefer the first 'high' urgency active event, else the newest
  const featured = events.find(e => e.urgency === 'high' && e.status === 'active') ?? events[0] ?? null

  // Remaining events for the "More Opportunities" section (exclude featured, max 3)
  const moreEvents = events.filter(e => e.id !== featured?.id).slice(0, 3)

  // Helper: format a Firestore Timestamp/Date for display
  const formatDate = (ts: CommunityEvent['createdAt']) => {
    if (!ts) return 'TBD'
    const date = typeof (ts as { toDate?: () => Date }).toDate === 'function'
      ? (ts as { toDate: () => Date }).toDate()
      : new Date(ts as unknown as string)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  // --------------- Loading State ---------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f4f1] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f3d2b]" />
      </div>
    )
  }

  // --------------- Empty State ---------------
  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f4f1] text-[#1f3d2b]">
        <div className="px-10 mt-10 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-serif">Upcoming Events</h1>
            <p className="mt-3 text-gray-600 max-w-xl">
              Join local community efforts and coordination meetings. Your participation makes a tangible difference.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={() => router.push('/create')} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1f3d2b] text-white hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out">
              <Plus size={16} />
              Create Event
            </button>
          </div>
        </div>

        <div className="px-10 mt-20 flex flex-col items-center justify-center text-center gap-4 opacity-60">
          <Calendar size={48} strokeWidth={1.2} />
          <p className="text-xl font-serif">No events yet</p>
          <p className="text-gray-500 max-w-sm">Be the first to create an event and rally your community.</p>
        </div>
      </div>
    )
  }

  // --------------- Volunteer progress helpers ---------------
  const volCurrent = featured?.needs?.volunteers?.current ?? 0
  const volGoal = featured?.needs?.volunteers?.goal ?? 1
  const volPercent = Math.min(Math.round((volCurrent / volGoal) * 100), 100)

  // Category badge color map
  const badgeColor = (category: string) => {
    const lower = category?.toLowerCase() ?? ''
    if (lower.includes('medical')) return 'bg-red-100 text-red-800'
    if (lower.includes('logistics')) return 'bg-blue-100 text-blue-800'
    if (lower.includes('community')) return 'bg-emerald-100 text-emerald-800'
    if (lower.includes('supply') || lower.includes('sorting')) return 'bg-amber-100 text-amber-800'
    return 'bg-gray-200 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-[#f5f4f1] text-[#1f3d2b]">

      {/* Header */}
      <div className="px-10 mt-10 flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-serif">Upcoming Events</h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Join local community efforts and coordination meetings. Your participation makes a tangible difference.
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#e7e4de] hover:bg-[#dedbd5] hover:-translate-y-[1px] hover:shadow-sm active:scale-95 transition-all duration-200 ease-out">
            <Filter size={16} />
            Filter
          </button>
          <button onClick={() => router.push('/create')} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1f3d2b] text-white hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out">
            <Plus size={16} />
            Create Event
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="px-10 mt-10 grid grid-cols-3 gap-6">

        {/* Large Featured Card — links to the event detail page */}
        <div
          onClick={() => router.push(`/event/${featured!.id}`)}
          className="col-span-2 rounded-xl overflow-hidden relative bg-gradient-to-r from-teal-600 to-green-700 text-white p-6 flex flex-col justify-end h-[410px] cursor-pointer group"
        >
          {featured!.imageUrl && (
            <img
              src={featured!.imageUrl}
              alt={featured!.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            />
          )}
          <div className="relative z-10">
            <div className="flex gap-2 mb-2">
              {featured!.urgency === 'high' && (
                <span className="bg-yellow-300 text-black text-xs px-3 py-1 rounded-full font-medium">Critical Need</span>
              )}
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{featured!.category}</span>
            </div>

            <h2 className="text-3xl font-serif">{featured!.title}</h2>
            <p className="text-sm mt-2 opacity-90 max-w-lg line-clamp-2">{featured!.description}</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="flex flex-col gap-4">

          {/* Main Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-serif mb-5">Event Details</h3>

            <div className="space-y-5 text-sm">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#1f3d2b]/10 flex items-center justify-center">
                  <Calendar size={18} className="text-[#1f3d2b]/90" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-medium">{formatDate(featured!.createdAt)}</p>
                  <p className="text-gray-500">{featured!.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#1f3d2b]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[#1f3d2b]/90" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-medium">{featured!.location}</p>
                  <p className="text-gray-500">{featured!.distance || 'Nearby'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#1f3d2b]/10 flex items-center justify-center">
                  <Users size={18} className="text-[#1f3d2b]/90 translate-x-[1px]" strokeWidth={1.8} />
                </div>
                <div className="w-full">
                  <p className="font-medium">{volCurrent} / {volGoal} Volunteers Needed</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-[#1f3d2b] rounded-full transition-all duration-500" style={{ width: `${volPercent}%` }}></div>
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={() => router.push(`/event/${featured!.id}`)}
              className="mt-6 w-full bg-[#1f3d2b] text-white py-2.5 rounded-lg hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out"
            >
              Sign Up to Help
            </button>
          </div>

          {/* Organizer Card */}
          <div className="bg-[#efede7] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1f3d2b]/20"></div>
              <div>
                <p className="text-xs text-gray-500">Organized by</p>
                <p className="font-medium">{featured!.organizer || 'Community Organizer'}</p>
              </div>
            </div>

            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1f3d2b] text-white hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out">
              <Mail size={18} />
            </button>
          </div>

        </div>
      </div>

      {/* More Opportunities */}
      {moreEvents.length > 0 && (
        <div className="px-10 mt-14 pb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif">More Opportunities</h2>
            <button
              onClick={() => router.push('/feed')}
              className="text-sm font-medium text-[#1f3d2b] hover:underline active:scale-95 transition-all duration-200 ease-out"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {moreEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => router.push(`/event/${evt.id}`)}
                className="bg-white rounded-xl p-5 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <span className={`text-xs px-3 py-1 rounded-full ${badgeColor(evt.category)}`}>{evt.category}</span>
                <h3 className="mt-3 font-serif text-lg">{evt.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}