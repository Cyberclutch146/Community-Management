"use client";

import Link from "next/link";

// User Profile
export default function ProfilePage() {
  return (
    <>
      <div className="bg-surface text-primary antialiased pb-24 min-h-screen">
        {/* Header/Cover */}
        <div className="h-48 bg-gray-200 relative">
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <i className="fas fa-arrow-left"></i>
            </Link>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <main className="px-6 relative -mt-12 mb-8">
          <div className="flex justify-between items-end mb-4">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=32"
                className="w-24 h-24 rounded-full border-4 border-surface object-cover bg-white"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center border-2 border-surface text-[10px]">
                <i className="fas fa-check"></i>
              </div>
            </div>
            <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-md hover:bg-gray-800 transition active:scale-95 mb-2">
              Edit Profile
            </button>
          </div>

          <h1 className="text-2xl font-bold leading-tight">Alex Rivera</h1>
          <p className="text-sm text-gray-500 mb-3">Product Designer • Community Builder</p>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Passionate about connecting people through design. Organizing tech meetups and local volunteering events in the SF Bay Area. Always down for coffee! ☕️
          </p>

          <div className="flex gap-4">
            <div className="text-sm">
              <span className="font-bold">428</span>{" "}
              <span className="text-gray-500">Connections</span>
            </div>
            <div className="text-sm">
              <span className="font-bold">12</span>{" "}
              <span className="text-gray-500">Events Hosted</span>
            </div>
          </div>
        </main>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 sticky top-0 bg-surface/90 backdrop-blur-md z-40">
          <button className="flex-1 py-3 text-sm font-bold text-primary border-b-2 border-primary">
            Activity
          </button>
          <button className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-gray-600">
            Communities (4)
          </button>
          <button className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-gray-600">
            Saved
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Timeline Item 1 */}
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
              <i className="fas fa-calendar-check mt-0.5"></i>
            </div>
            <div>
              <div className="text-sm">
                <span className="font-bold">RSVP'd</span> to{" "}
                <span className="font-bold">Dolores Park Cleanup</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Yesterday • SF Volunteers</div>
              <div className="mt-2 bg-white p-3 rounded-xl border border-gray-100 flex gap-3 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1593113563332-e147ce100a4d?auto=format&fit=crop&q=80&w=150"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-semibold text-xs leading-tight mb-1">
                    Dolores Park Cleanup
                  </div>
                  <div className="text-[10px] text-gray-500">Oct 28 • 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-users mt-0.5"></i>
            </div>
            <div>
              <div className="text-sm">
                Joined the <span className="font-bold">SF Tech Innovators</span> community
              </div>
              <div className="text-xs text-gray-500 mt-0.5">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
