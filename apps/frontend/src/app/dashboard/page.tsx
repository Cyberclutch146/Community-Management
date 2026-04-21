import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
      {/* TopAppBar Contextual Header */}
      <header className="bg-surface-bright/90 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.02)] h-16 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-10">
        <h1 className="font-headline md:text-2xl font-bold text-on-surface">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">search</span>
            <input className="pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary text-sm w-64 placeholder:text-outline text-on-surface" placeholder="Search events, volunteers..." type="text" />
          </div>
          <button className="p-2 text-secondary hover:bg-surface-container-low rounded-full transition-colors relative hover:text-primary">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-bright"></span>
          </button>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-8 pb-32 md:pb-12">
        {/* Bento Grid Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.04)] border border-outline-variant/20 flex flex-col justify-between hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-tertiary-container/20 rounded-lg text-tertiary">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <span className="text-xs font-bold text-primary bg-primary-container/20 px-2 py-1 rounded-full">+12% this week</span>
            </div>
            <div>
              <p className="text-sm text-secondary font-medium mb-1">Active Volunteers</p>
              <h2 className="font-headline text-4xl font-bold text-on-surface">1,432</h2>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-outline mb-1">
                <span>Goal: 2,000</span>
                <span>71%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-tertiary h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.04)] border border-outline-variant/20 flex flex-col justify-between hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-container/20 rounded-lg text-primary">
                <span className="material-symbols-outlined text-2xl">savings</span>
              </div>
              <span className="text-xs font-bold text-primary bg-primary-container/20 px-2 py-1 rounded-full">+5% this week</span>
            </div>
            <div>
              <p className="text-sm text-secondary font-medium mb-1">Funds Raised</p>
              <h2 className="font-headline text-4xl font-bold text-on-surface">$84,500</h2>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-outline mb-1">
                <span>Target: $100k</span>
                <span>84%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.04)] border border-outline-variant/20 flex flex-col justify-between hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
                <span className="material-symbols-outlined text-2xl">inventory_2</span>
              </div>
              <span className="text-xs font-bold text-error bg-error-container px-2 py-1 rounded-full">Needs attention</span>
            </div>
            <div>
              <p className="text-sm text-secondary font-medium mb-1">Resources Collected (lbs)</p>
              <h2 className="font-headline text-4xl font-bold text-on-surface">5,200</h2>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-outline mb-1">
                <span>Target: 10,000 lbs</span>
                <span>52%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Events List (Takes up 2 columns on lg) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline text-xl font-bold text-on-surface">Active Deployments</h3>
                <p className="text-sm text-secondary mt-1">Ongoing community support initiatives</p>
              </div>
              <button className="text-sm font-bold text-primary hover:text-primary-fixed-dim flex items-center gap-1 transition-colors">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Event Card 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(46,50,48,0.03)] border border-outline-variant/20 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-full sm:w-32 h-32 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img alt="Community Food Drive" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiHvmlBEs6LQocsGjjvQM0InleycJNj_NmQhUQvYScvARmP45xJ-e-092R3XC6tgloRrmLyREuUg1U8Nmi11-q58xPZUhtP9JwBeYJGC0mF8OfXLkjmS1f-w3JO9o56yOZ3LGHznwfg_ALRuUGC9fRocpmZluXgXs3IY_YY1GUb7jRQN1yQCUzKJfFQNYu1SJF1jotPDvsHC13gy9cUmIlfn-65yEX4VJuZqDRgzL7hF9dc1SlUmUMxRwuO4KFH7mzy75INRg0KgW1" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between sm:justify-start items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-container/20 text-primary">Food Relief</span>
                    <span className="text-xs text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      Westside District
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-lg text-on-surface mb-2">Weekend Pantry Restock</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">group</span> 45/50 Vol.</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> Today, 9AM - 2PM</span>
                  </div>
                </div>
                <div className="w-full sm:w-auto sm:self-center mt-2 sm:mt-0">
                  <button className="w-full sm:w-auto px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-surface-variant transition-colors">Manage</button>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(46,50,48,0.03)] border border-outline-variant/20 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-full sm:w-32 h-32 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img alt="Urban Cleanup" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe6sUMh4fk1Pu-nKkZZYsM2GHFoW3hFH1VhhlXxX05sZFAvNI-fjiMWn2aGkRidufMMoktfBsLqx4MtqnnaT00NwQZ31k6dX7N-WBi5Esol4cF_VZBQuOZKuHNqKIPDNRfg_agei1mEHzDffyh2imoVRes3j7JMF7uzcSZv5kusRb9stwbnyfG38r21PmbVdFjMZidDBexKrcMoTpevhO8ZJBMnpFYI0gnDCb_Zzg06gmqzgD0tQwrP2DkXDo95lknt-qoNiL9xxCA" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between sm:justify-start items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-tertiary-container/30 text-tertiary">Environment</span>
                    <span className="text-xs text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      Riverfront Park
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-lg text-on-surface mb-2">Spring Park Revival</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">group</span> 120/150 Vol.</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> Sat, 8AM - 12PM</span>
                  </div>
                </div>
                <div className="w-full sm:w-auto sm:self-center mt-2 sm:mt-0">
                  <button className="w-full sm:w-auto px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-surface-variant transition-colors">Manage</button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions & Alerts Column */}
          <aside className="space-y-6">
            {/* Action Card */}
            <div className="bg-primary text-on-primary rounded-xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(74,124,89,0.2)]">
              {/* Decorative element */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <h3 className="font-headline text-xl font-bold mb-2 relative z-10">New Initiative?</h3>
              <p className="text-white/80 text-sm mb-6 relative z-10">Start drafting a new community outreach program.</p>
              <Link href="/create-event" className="w-full py-3 bg-surface-bright text-primary font-bold rounded-lg hover:bg-white transition-colors relative z-10 flex justify-center items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined">add_circle</span>
                Create Program
              </Link>
            </div>

            {/* Recent Alerts */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20">
              <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Urgent Alerts</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className="mt-0.5 text-error">
                    <span className="material-symbols-outlined text-xl">warning</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Low Supply: Bottled Water</p>
                    <p className="text-xs text-secondary mt-0.5">Westside District pantry is below 20% capacity.</p>
                    <span className="text-[10px] text-outline mt-1 block">10 mins ago</span>
                  </div>
                </li>
                <li className="flex gap-3 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className="mt-0.5 text-tertiary">
                    <span className="material-symbols-outlined text-xl">info</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Volunteer Shortage</p>
                    <p className="text-xs text-secondary mt-0.5">Need 5 more drivers for afternoon delivery route.</p>
                    <span className="text-[10px] text-outline mt-1 block">1 hour ago</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
