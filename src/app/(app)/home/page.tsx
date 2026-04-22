'use client'

import { Lora } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { Filter, Plus, Calendar, MapPin, Users, Mail } from 'lucide-react'


const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function HomePage() {
  const router = useRouter()
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
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1f3d2b] text-white hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out">
            <Plus size={16} />
            Create Event
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="px-10 mt-10 grid grid-cols-3 gap-6">

        {/* Large Card */}
        <div className="col-span-2 rounded-xl overflow-hidden relative bg-gradient-to-r from-teal-600 to-green-700 text-white p-6 flex flex-col justify-end h-[410px]">
          <div className="flex gap-2 mb-2">
            <span className="bg-yellow-300 text-black text-xs px-3 py-1 rounded-full">Critical Need</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Supply Sorting</span>
          </div>

          <h2 className="text-3xl font-serif">Central District Supply Sorting</h2>
          <p className="text-sm mt-2 opacity-90 max-w-lg">
            Help us organize and distribute essential supplies to families affected by the recent localized flooding.
          </p>
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
                  <p className="font-medium">Tomorrow, Oct 24</p>
                  <p className="text-gray-500">08:00 AM - 02:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#1f3d2b]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[#1f3d2b]/90" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-medium">Community Center West</p>
                  <p className="text-gray-500">124 Valley Road, District 4</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#1f3d2b]/10 flex items-center justify-center">
                  <Users size={18} className="text-[#1f3d2b]/90 translate-x-[1px]" strokeWidth={1.8} />
                </div>
                <div className="w-full">
                  <p className="font-medium">45 / 100 Volunteers Needed</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="w-[45%] h-2 bg-[#1f3d2b] rounded-full"></div>
                  </div>
                </div>
              </div>

            </div>

            <button className="mt-6 w-full bg-[#1f3d2b] text-white py-2.5 rounded-lg hover:opacity-90 hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out">
              Sign Up to Help
            </button>
          </div>

          {/* Organizer Card */}
          <div className="bg-[#efede7] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1f3d2b]/20"></div>
              <div>
                <p className="text-xs text-gray-500">Organized by</p>
                <p className="font-medium">Anuvab Das</p>
              </div>
            </div>

            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1f3d2b] text-white hover:-translate-y-[1px] hover:shadow-md active:scale-95 transition-all duration-200 ease-out">
              <Mail size={18} />
            </button>
          </div>

        </div>
      </div>

      {/* More Opportunities */}
      <div className="px-10 mt-14">
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

          {/* Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">Medical</span>
            <h3 className="mt-3 font-serif text-lg">First Aid Training Refresher</h3>
            <p className="text-sm text-gray-600 mt-2">
              A mandatory refresher course for all registered medical volunteers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">Logistics</span>
            <h3 className="mt-3 font-serif text-lg">Transport Fleet Coordination</h3>
            <p className="text-sm text-gray-600 mt-2">
              Drivers needed to help distribute water and supplies.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">Community</span>
            <h3 className="mt-3 font-serif text-lg">Information Desk Relief</h3>
            <p className="text-sm text-gray-600 mt-2">
              Help manage the community information desk for displaced residents.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}