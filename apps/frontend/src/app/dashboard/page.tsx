"use client";

// Organizer Dashboard
export default function DashboardPage() {
  return (
    <>
      <div className="bg-surface text-primary antialiased min-h-screen">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-xs text-gray-500">SF Tech Innovators</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
            <i className="fas fa-cog"></i>
          </button>
        </header>

        <main className="py-6 pb-24">
          {/* Key Metrics */}
          <div className="px-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Total RSVPs
                </div>
                <div className="text-3xl font-bold">1,248</div>
                <div className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
                  <i className="fas fa-arrow-up"></i> 12% this month
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Profile Views
                </div>
                <div className="text-3xl font-bold">8.4k</div>
                <div className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
                  <i className="fas fa-arrow-up"></i> 5% this month
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6 mb-8">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
              <button className="min-w-[120px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 snap-start hover:border-accent hover:bg-accent/5 transition group">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                  <i className="fas fa-plus text-xl"></i>
                </div>
                <span className="text-sm font-semibold">New Event</span>
              </button>

              <button className="min-w-[120px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 snap-start hover:border-accent hover:bg-accent/5 transition group">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
                  <i className="fas fa-bullhorn text-xl"></i>
                </div>
                <span className="text-sm font-semibold text-gray-700">Message All</span>
              </button>

              <button className="min-w-[120px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 snap-start hover:border-accent hover:bg-accent/5 transition group">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition">
                  <i className="fas fa-chart-pie text-xl"></i>
                </div>
                <span className="text-sm font-semibold text-gray-700">Analytics</span>
              </button>
            </div>
          </div>

          {/* Upcoming Hosted Events */}
          <div className="px-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Your Upcoming Events</h2>
              <a href="#" className="text-accent text-sm font-medium">
                Manage all
              </a>
            </div>

            {/* Event Item */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-accent font-bold mb-1">Oct 24 • 6:30 PM</div>
                <h3 className="font-bold text-base leading-tight truncate mb-2">
                  AI Pitch Night SF
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 font-medium">
                    <i className="fas fa-user-check mr-1"></i> 142/150
                  </div>
                  <button className="text-gray-400 hover:text-primary">
                    <i className="fas fa-ellipsis-v px-2"></i>
                  </button>
                </div>
                {/* Mini progress bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
