"use client";

// Home Feed
export default function HomePage() {
  return (
    <>
      {/* Top Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kindred</h1>
          <p className="text-xs text-gray-500">San Francisco, CA</p>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
            <i className="fas fa-bell"></i>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-blue-400 p-[2px]">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Profile"
              className="w-full h-full rounded-full border-2 border-white object-cover"
            />
          </div>
        </div>
      </header>

      <div className="pb-24">
        {/* Search & Filter */}
        <div className="px-6 py-4 sticky top-[72px] bg-surface z-40">
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Find communities, events, people..."
              className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-accent outline-none text-sm"
            />
          </div>

          {/* Quick Chips */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none">
            <button className="px-4 py-1.5 bg-primary text-white rounded-full text-xs font-medium whitespace-nowrap">
              For You
            </button>
            <button className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-50">
              Local Events
            </button>
            <button className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-50">
              Tech Meetups
            </button>
            <button className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-50">
              Volunteering
            </button>
          </div>
        </div>

        {/* Featured Carousel */}
        <div className="px-6 mt-2 mb-8">
          <h2 className="text-lg font-bold mb-4">Trending Near You</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {/* Card 1 */}
            <div className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 snap-center">
              <div className="h-32 bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                  OCT 24
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base leading-tight mb-1">AI Pitch Night SF</h3>
                <p className="text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i> SoMa • 2.4 mi
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/150?img=1" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/150?img=2" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/150?img=3" className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                  <button className="w-8 h-8 bg-gray-100 rounded-full text-gray-600 flex items-center justify-center hover:bg-gray-200">
                    <i className="fas fa-bookmark text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 snap-center">
              <div className="h-32 bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1593113563332-e147ce100a4d?auto=format&fit=crop&q=80&w=600"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                  OCT 28
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base leading-tight mb-1">Dolores Park Cleanup</h3>
                <p className="text-xs text-accent font-medium mb-3">Community Service</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500 font-medium">124 attending</div>
                  <button className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center hover:bg-gray-800">
                    <i className="fas fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed */}
        <div className="px-0">
          <h2 className="text-lg font-bold mb-4 px-6">Latest Updates</h2>

          {/* Post 1 */}
          <div className="bg-white border-t border-b border-gray-100 p-6 mb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=4" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-sm">Sarah Jenkins</div>
                  <div className="text-[11px] text-gray-500">Organizer • 2h ago</div>
                </div>
              </div>
              <button className="text-gray-400">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-4">
              Hey everyone! Just finalizing the catering for next week's mixer. If you have any dietary restrictions that you haven't added to your RSVP yet, please do so by Friday! 🌮🥗
            </p>
            <div className="flex items-center gap-6 text-gray-500">
              <button className="flex items-center gap-2 text-xs hover:text-accent group">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition">
                  <i className="far fa-heart"></i>
                </div>
                <span className="font-medium">24</span>
              </button>
              <button className="flex items-center gap-2 text-xs hover:text-accent group">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition">
                  <i className="far fa-comment"></i>
                </div>
                <span className="font-medium">8</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
