import Link from "next/link";

export default function Impact() {
  const milestones = [
    { icon: "favorite", value: "$8,420", label: "Total Funds Raised", trend: "↑ $1,200 this month", color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
    { icon: "group", value: "156", label: "Volunteers Mobilized", trend: "↑ 24 this month", color: "text-primary", bg: "bg-primary-fixed/20" },
    { icon: "event_available", value: "14", label: "Events Completed", trend: "↑ 3 this month", color: "text-secondary", bg: "bg-secondary-fixed/20" },
    { icon: "people", value: "1,240", label: "People Helped", trend: "↑ 180 this month", color: "text-primary", bg: "bg-primary-container/20" },
  ];

  const recentEvents = [
    { id: "5", title: "Harbor Emergency Shelter", org: "Portland Relief Network", raised: "$2,100", volunteers: 28, status: "Completed" },
    { id: "6", title: "Summer Food Drive", org: "PDX Food Bank", raised: "$1,850", volunteers: 35, status: "Completed" },
    { id: "7", title: "School Supplies for 500 Kids", org: "Education First", raised: "$3,200", volunteers: 12, status: "Completed" },
  ];

  const topVolunteers = [
    { name: "Sarah Jenkins", hours: 42, events: 14, rank: 1 },
    { name: "Marcus Lee", hours: 38, events: 11, rank: 2 },
    { name: "Alex Park", hours: 31, events: 9, rank: 3 },
    { name: "Jamie Kim", hours: 28, events: 8, rank: 4 },
    { name: "Chris Rivera", hours: 24, events: 7, rank: 5 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-secondary font-medium mb-1">Community Dashboard</p>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">Our Collective Impact</h2>
        <p className="text-secondary mt-1">See how the Kindred Relief community is making a difference.</p>
      </div>

      {/* Impact stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((m, i) => (
          <div key={i} className={`card ${m.bg} p-5 flex flex-col gap-1.5`}>
            <span className={`material-symbols-outlined ${m.color} text-[22px]`}>{m.icon}</span>
            <p className="text-3xl font-bold font-headline text-on-surface">{m.value}</p>
            <p className="text-xs text-secondary font-semibold">{m.label}</p>
            <span className={`text-xs ${m.color} font-bold`}>{m.trend}</span>
          </div>
        ))}
      </div>

      {/* Recent completed events */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline text-xl font-bold text-on-surface">Recently Completed Events</h3>
        <div className="flex flex-col gap-3">
          {recentEvents.map((event) => (
            <div key={event.id} className="card flex flex-col md:flex-row items-start md:items-center gap-4 hover:shadow-md transition-all">
              <div className="flex-1">
                <h4 className="font-headline font-bold text-on-surface">{event.title}</h4>
                <p className="text-sm text-secondary">{event.org}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-bold text-tertiary font-headline">{event.raised}</p>
                  <p className="text-xs text-secondary">Raised</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-primary font-headline">{event.volunteers}</p>
                  <p className="text-xs text-secondary">Volunteers</p>
                </div>
                <span className="badge badge-verified">{event.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top volunteers leaderboard */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline text-xl font-bold text-on-surface">Top Contributors</h3>
        <div className="card p-0 overflow-hidden">
          {topVolunteers.map((v, i) => (
            <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i < topVolunteers.length - 1 ? 'border-b border-outline-variant/20' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                v.rank === 1 ? 'bg-tertiary-fixed text-tertiary' :
                v.rank === 2 ? 'bg-surface-variant text-secondary' :
                v.rank === 3 ? 'bg-tertiary-fixed/50 text-tertiary' :
                'bg-surface-container text-outline'
              }`}>
                {v.rank <= 3 ? ['🥇', '🥈', '🥉'][v.rank - 1] : v.rank}
              </div>
              <div className="flex-1">
                <p className="font-bold text-on-surface text-sm">{v.name}</p>
                <p className="text-xs text-secondary">{v.events} events participated</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary font-headline">{v.hours}h</p>
                <p className="text-xs text-secondary">volunteered</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="card bg-primary-fixed/30 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <span className="material-symbols-outlined text-primary text-4xl">handshake</span>
        <div className="flex-1">
          <h3 className="font-headline text-xl font-bold text-on-surface">Ready to make an impact?</h3>
          <p className="text-sm text-secondary mt-1">Join an event, donate, or volunteer — every action counts.</p>
        </div>
        <Link href="/" className="btn-primary">
          Browse Events
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
