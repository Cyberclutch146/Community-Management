import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const contributions = [
    { id: "1", title: "Downtown Food Drive Shift", date: "Oct 12, 2023", type: "Volunteer", detail: "4 Hours", eventId: "1", desc: "Served hot meals to 150+ community members. Assisted with kitchen cleanup and inventory sorting.", icon: "soup_kitchen", color: "primary" },
    { id: "2", title: "Monthly Donation Processed", date: "Oct 01, 2023", type: "Donation", detail: "$50", eventId: "2", desc: "Recurring $50 donation to the Winter Warmth Fund.", icon: "payments", color: "tertiary" },
    { id: "3", title: "Community Garden Cleanup", date: "Sep 28, 2023", type: "Volunteer", detail: "3 Hours", eventId: "3", desc: "Helped prepare community garden beds for winter. Planted cover crops and repaired fencing.", icon: "park", color: "primary" },
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Profile Overview</h2>
        <p className="font-body text-on-surface-variant text-lg">Manage your personal information and view your impact.</p>
      </div>

      {/* Profile Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="md:col-span-1 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.04)] flex flex-col items-center text-center border border-outline-variant/20">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-surface-container shadow-sm relative bg-primary-container">
            {/* Using a placeholder since we don't have the image file, but styling it properly */}
            <div className="w-full h-full flex items-center justify-center text-on-primary-container text-4xl font-headline font-bold uppercase">
              SJ
            </div>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </div>
          </div>
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">Sarah Jenkins</h3>
          <p className="font-body text-primary font-medium mb-4">Community Organizer</p>
          
          <div className="w-full flex flex-col gap-3 mt-2 text-left text-sm text-on-surface-variant">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-[20px]">mail</span>
              <span>sarah.j@outreach.org</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-[20px]">phone</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-[20px]">pin_drop</span>
              <span>Portland, OR</span>
            </div>
          </div>
          
          <button className="mt-6 w-full py-2.5 px-4 bg-surface-container rounded-lg text-primary font-bold font-body hover:bg-surface-variant transition-colors border border-outline-variant/30">
            Edit Profile
          </button>
        </div>

        {/* Impact Summary */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Volunteer Hours Card */}
          <div className="bg-[#f2efe9] rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.03)] flex flex-col justify-between border border-[#e8e4db]">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span className="font-body font-semibold tracking-wide uppercase text-xs">Total Hours</span>
              </div>
              <h4 className="font-headline text-5xl font-bold text-primary mb-1">124</h4>
              <p className="font-body text-sm text-on-surface-variant">Volunteer hours contributed</p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20">
              <p className="font-body text-sm text-tertiary-container flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                +12 hours this month
              </p>
            </div>
          </div>

          {/* Donations Card */}
          <div className="bg-[#f0ece4] rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.03)] flex flex-col justify-between border border-[#e6e1d6]">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                <span className="material-symbols-outlined text-tertiary">favorite</span>
                <span className="font-body font-semibold tracking-wide uppercase text-xs">Contributions</span>
              </div>
              <h4 className="font-headline text-5xl font-bold text-tertiary mb-1">$450</h4>
              <p className="font-body text-sm text-on-surface-variant">Total lifetime donations</p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20">
              <button className="text-tertiary font-bold font-body text-sm hover:underline">
                View Donation History
              </button>
            </div>
          </div>

          {/* Badges/Skills Card */}
          <div className="sm:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.04)] border border-outline-variant/20">
            <h4 className="font-headline text-lg font-bold text-on-surface mb-4">Skills & Certifications</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-primary-container/20 text-on-primary-container rounded-full font-body text-sm font-medium border border-primary-container/30">First Aid Certified</span>
              <span className="px-3 py-1.5 bg-primary-container/20 text-on-primary-container rounded-full font-body text-sm font-medium border border-primary-container/30">Event Logistics</span>
              <span className="px-3 py-1.5 bg-primary-container/20 text-on-primary-container rounded-full font-body text-sm font-medium border border-primary-container/30">Food Safety</span>
              <span className="px-3 py-1.5 bg-surface-container text-on-surface-variant rounded-full font-body text-sm font-medium border border-outline-variant/30 flex items-center gap-1 hover:bg-surface-variant cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[16px]">add</span> Add Skill
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.04)] border border-outline-variant/20 overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/20 bg-surface/50">
          <h3 className="font-headline text-xl font-bold text-on-surface">Recent Activity</h3>
        </div>
        <ul className="divide-y divide-outline-variant/10">
          {contributions.map((item) => (
            <li key={item.id} className="p-6 hover:bg-surface-container-low transition-colors flex items-start gap-4">
              <div className={`bg-${item.color}/10 p-2 rounded-full text-${item.color} mt-1`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-body font-bold text-on-surface text-lg">
                  <Link href={`/event/${item.eventId}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h4>
                <p className="font-body text-on-surface-variant mt-1 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs font-body text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span> 
                    {item.date}
                  </span>
                  {item.detail !== "$50" && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">timer</span> 
                      {item.detail}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t border-outline-variant/20 text-center bg-surface/30">
          <button className="text-primary font-bold font-body text-sm hover:underline py-2 px-4">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
