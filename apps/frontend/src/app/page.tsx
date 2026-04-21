import EventCard from "@/components/EventCard";
import Link from "next/link";

export default function Home() {
  const events = [
    {
      id: "1",
      title: "Downtown Winter Shelter Restock",
      org: "Rose City Relief",
      description: "Preparing for the incoming freeze. We urgently need thermal blankets, warm socks, and volunteers to help sort and distribute items this weekend.",
      progress: 65,
      type: "urgent" as const,
      currentAmount: 1200,
      targetAmount: 2000,
      currentVolunteers: 12,
      targetVolunteers: 20,
      distance: "1.2 mi",
      deadline: "This Friday",
      verified: true,
    },
    {
      id: "2",
      title: "Weekly Pantry Distribution",
      org: "PDX Food Bank",
      description: "Assisting with traffic flow, loading boxes into cars, and registering new families for our Tuesday distribution.",
      progress: 42,
      type: "regular" as const,
      currentVolunteers: 8,
      targetVolunteers: 20,
      distance: "2.5 mi",
      deadline: "Every Tuesday",
      verified: true,
    },
    {
      id: "3",
      title: "Park Cleanup & Planting",
      org: "Neighborhood Org",
      description: "Spring is here! Help us clear winter debris and plant native shrubs at Mt. Tabor. Tools provided.",
      progress: 80,
      type: "regular" as const,
      currentVolunteers: 16,
      targetVolunteers: 20,
      distance: "0.8 mi",
      deadline: "This Saturday",
      verified: false,
    },
    {
      id: "4",
      title: "School Supply Drive 2024",
      org: "Education First",
      description: "Raising funds to purchase bulk backpacks and supplies for 500 local students before the fall semester.",
      progress: 64,
      type: "regular" as const,
      currentAmount: 3200,
      targetAmount: 5000,
      distance: "3.1 mi",
      deadline: "Aug 15",
      verified: true,
    }
  ];

  const urgentCount = events.filter(e => e.type === 'urgent').length;

  return (
    <>
      {/* TopAppBar (Mobile Only) */}
      <header className="md:hidden flex justify-between items-center px-6 h-16 w-full bg-surface-bright text-primary font-body text-sm tracking-tight border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)] sticky top-0 z-40">
        <div className="font-headline text-xl font-bold text-primary">Outreach & Relief</div>
        <div className="flex gap-4">
          <button className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors active:opacity-80 duration-150">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors active:opacity-80 duration-150">
            <span className="material-symbols-outlined">location_on</span>
          </button>
        </div>
      </header>

      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10 flex flex-col gap-6">
        {/* Page Header & Global Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div>
            <p className="text-secondary font-medium mb-1">Local Events Feed</p>
            <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Discover & Support</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant/50">
              <span className="material-symbols-outlined text-secondary mr-2 text-sm">location_on</span>
              <select className="bg-transparent border-none text-sm font-medium text-on-surface focus:ring-0 p-0 pr-6 cursor-pointer">
                <option>Portland Metro Area</option>
                <option>Seattle Area</option>
                <option>Eugene/Springfield</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters Area */}
        <section className="mb-2 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-3 min-w-max">
            <button className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              All Events
            </button>
            <div className="h-10 w-px bg-outline-variant/50 mx-1"></div>
            <button className="flex items-center gap-2 bg-surface-container text-on-surface px-5 py-2.5 rounded-full text-sm font-medium border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
              Urgent Needs
              <span className="material-symbols-outlined text-[16px] text-error">emergency</span>
            </button>
            <button className="flex items-center gap-2 bg-surface-container text-on-surface px-5 py-2.5 rounded-full text-sm font-medium border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
              Within 5 miles
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <button className="flex items-center gap-2 bg-surface-container text-on-surface px-5 py-2.5 rounded-full text-sm font-medium border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
              Food Drive
              <span className="material-symbols-outlined text-[16px]">restaurant</span>
            </button>
            <button className="flex items-center gap-2 bg-surface-container text-on-surface px-5 py-2.5 rounded-full text-sm font-medium border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
              Volunteers
              <span className="material-symbols-outlined text-[16px]">group</span>
            </button>
          </div>
        </section>

        {/* Bento Grid Layout for Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <button className="bg-transparent border border-outline text-on-surface px-8 py-3 rounded-xl font-semibold hover:bg-surface-container-low transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </>
  );
}
