"use client";

import Link from "next/link";

// Event Details
export default function EventDetailsPage() {
  return (
    <>
      <div className="bg-surface text-primary antialiased">
        {/* Event Image Header */}
        <div className="relative h-64 bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
          />

          {/* Top Navigation */}
          <div className="absolute top-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition">
                <i className="fas fa-share-alt"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition">
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>

        <main className="bg-surface -mt-6 relative rounded-t-3xl pb-24">
          {/* Drag Handle Indicator */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          <div className="px-6 py-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-md text-xs font-bold uppercase tracking-wide">
                Technology
              </span>
            </div>

            <h1 className="text-2xl font-bold leading-tight mb-4">
              AI Pitch Night SF: Future of Generative Models
            </h1>

            {/* Key Info Box */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
              {/* Date/Time */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-lg font-bold leading-none">24</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Thursday, October 24, 2023</div>
                  <div className="text-xs text-gray-500 mt-0.5">6:30 PM - 9:00 PM PDT</div>
                  <a href="#" className="text-accent text-xs font-medium mt-1 inline-block">
                    Add to calendar
                  </a>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 my-4"></div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-500 flex flex-col items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-lg"></i>
                </div>
                <div>
                  <div className="font-semibold text-sm">TechHub SoMa</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    123 StartUp Way, Suite 400<br />San Francisco, CA 94105
                  </div>
                  <a href="#" className="text-accent text-xs font-medium mt-1 inline-block">
                    View on map
                  </a>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=11" className="w-12 h-12 rounded-full mb-1" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Hosted by</div>
                  <div className="font-bold text-sm">SF Tech Innovators</div>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-bold hover:bg-gray-200 transition">
                Contact
              </button>
            </div>

            {/* About */}
            <h2 className="text-lg font-bold mb-3">About the Event</h2>
            <div className="text-sm text-gray-700 leading-relaxed space-y-4 mb-8">
              <p>
                Join us for an exciting evening exploring the frontiers of generative AI. We'll have three rapid-fire pitches from stealth startups, followed by a panel discussion on the ethical implications of LLMs.
              </p>
              <p>
                Drinks and light appetizers will be provided. Please RSVP as space is limited to 150 attendees.
              </p>
            </div>

            {/* Attendees */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Attendees (142)</h2>
              <a href="#" className="text-accent text-sm font-medium">
                See all
              </a>
            </div>
            <div className="flex -space-x-4 overflow-hidden mb-8">
              <img
                src="https://i.pravatar.cc/150?img=1"
                className="inline-block w-12 h-12 rounded-full border-2 border-surface relative z-50"
              />
              <img
                src="https://i.pravatar.cc/150?img=2"
                className="inline-block w-12 h-12 rounded-full border-2 border-surface relative z-40"
              />
              <img
                src="https://i.pravatar.cc/150?img=3"
                className="inline-block w-12 h-12 rounded-full border-2 border-surface relative z-30"
              />
              <img
                src="https://i.pravatar.cc/150?img=4"
                className="inline-block w-12 h-12 rounded-full border-2 border-surface relative z-20"
              />
              <img
                src="https://i.pravatar.cc/150?img=5"
                className="inline-block w-12 h-12 rounded-full border-2 border-surface relative z-10"
              />
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 relative z-0">
                +137
              </div>
            </div>
          </div>
        </main>

        {/* Fixed Action Bar hide behind Bottom Nav for our unified layout. 
            Actually, the original Stitch HTML had this at the bottom and NO bottom nav on this specific page.
            Since Next.js shared layouts will display the bottom nav globally, we can either use pb-safe-offset-4 to let it float above it, or hide the global bottom nav.
            Let's add enough padding so they don't overlap, and position it specifically above the bottom nav (which is h-20 roughly). The layout handles bottom spacing. */}
        <div className="fixed bottom-0 md:bottom-0 w-full max-w-md mx-auto md:max-w-full bg-white border-t border-gray-200 p-4 pb-[env(safe-area-inset-bottom)] md:pb-4 z-[60] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">Free</div>
              <div className="text-xs text-gray-500">8 spots left</div>
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition active:scale-95">
              Reserve Spot
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
