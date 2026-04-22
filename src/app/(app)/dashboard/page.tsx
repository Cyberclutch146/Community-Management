'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getEventsByOrganizer, getRegisteredEvents, backfillEventCoordinates } from '@/services/eventService';
import { CommunityEvent } from '@/types';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [backfilling, setBackfilling] = useState(false);

  const handleBackfill = async () => {
    if (!confirm('This will sequentially geocode all events missing coordinates. It takes ~1.5s per event. Continue?')) return;
    setBackfilling(true);
    try {
      const res = await backfillEventCoordinates();
      alert(`Backfill complete: Updated ${res.updated}, Failed ${res.failed} out of ${res.total} total events.`);
    } catch (err) {
      alert('Error backfilling: ' + String(err));
    } finally {
      setBackfilling(false);
    }
  };

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const load = async () => {
      try {
        const [organizedData, registeredData] = await Promise.all([
          getEventsByOrganizer(user.uid),
          getRegisteredEvents(user.uid)
        ]);
        setEvents(organizedData);
        setRegisteredEvents(registeredData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  // ── Aggregate Stats ──
  const totalRaised = events.reduce((sum, e) => sum + (e.needs?.funds?.current ?? 0), 0);
  const totalVolunteers = events.reduce((sum, e) => sum + (e.needs?.volunteers?.current ?? 0), 0);
  const activeCount = events.filter(e => e.status === 'active').length;

  if (!user) {
    return (
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 md:pb-10 flex justify-center items-center">
        <p className="text-secondary">Please sign in to view your dashboard.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 md:pb-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 md:pb-10">
      <div className="mb-10">
        <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Your Impact Dashboard</h2>
        <p className="text-secondary font-medium mt-2">
          Welcome back, {profile?.displayName || 'Organizer'}. Here&apos;s how your events are performing.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-primary-container/30 px-6 py-5 rounded-2xl border border-primary-container/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary bg-primary-container/40 p-2 rounded-xl text-[20px]">campaign</span>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Active Events</p>
          </div>
          <p className="text-4xl font-bold text-on-surface">{activeCount}</p>
        </div>

        <div className="bg-tertiary-container/30 px-6 py-5 rounded-2xl border border-tertiary-container/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-container/40 p-2 rounded-xl text-[20px]">attach_money</span>
            <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">Total Raised</p>
          </div>
          <p className="text-4xl font-bold text-on-surface">${totalRaised.toLocaleString()}</p>
        </div>

        <div className="bg-secondary-container/30 px-6 py-5 rounded-2xl border border-secondary-container/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-secondary bg-secondary-container/40 p-2 rounded-xl text-[20px]">group</span>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Volunteers Recruited</p>
          </div>
          <p className="text-4xl font-bold text-on-surface">{totalVolunteers}</p>
        </div>
      </div>

      {/* ── Events Grid ── */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-headline text-xl font-bold text-on-surface">Your Events</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackfill}
            disabled={backfilling}
            className="bg-surface-variant text-on-surface-variant px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-outline-variant transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            {backfilling ? 'Backfilling...' : 'Admin: Backfill Coordinates'}
          </button>
          <button
            onClick={() => router.push('/create')}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Event
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-surface-bright rounded-2xl p-8 border border-outline-variant/30 flex flex-col items-center justify-center text-center py-20">
          <span className="material-symbols-outlined text-[64px] text-surface-variant mb-4">volunteer_activism</span>
          <h3 className="font-headline text-xl text-on-surface font-bold mb-2">No events yet</h3>
          <p className="text-on-surface-variant max-w-md mb-6">
            You haven&apos;t organized any events yet. Start a local initiative and rally your community!
          </p>
          <button
            onClick={() => router.push('/create')}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            Create Your First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} onClick={() => router.push(`/dashboard/event/${event.id}`)} />
          ))}
        </div>
      )}

      {/* ── Registered Events Section ── */}
      {registeredEvents.length > 0 && (
        <div className="mt-16">
          <div className="mb-6">
            <h3 className="font-headline text-xl font-bold text-on-surface">Events You&apos;ve Joined</h3>
            <p className="text-secondary text-sm mt-1">Events you are participating in as a volunteer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map(event => (
              <EventCard key={event.id} event={event} onClick={() => router.push(`/event/${event.id}`)} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

// ── Helper Component for Event Cards ──
function EventCard({ event, onClick }: { event: CommunityEvent, onClick: () => void }) {
  const fundPercent = event.needs?.funds ? Math.min(100, Math.round((event.needs.funds.current / event.needs.funds.goal) * 100)) : null;
  const volPercent = event.needs?.volunteers ? Math.min(100, Math.round((event.needs.volunteers.current / event.needs.volunteers.goal) * 100)) : null;

  return (
    <button
      onClick={onClick}
      className="bg-surface-bright rounded-2xl border border-outline-variant/30 overflow-hidden text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={event.imageUrl || 'https://images.unsplash.com/photo-1593113565694-c6ccdd8dcb15?q=80&w=800&auto=format&fit=crop'}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
          event.status === 'active' 
            ? 'bg-primary-container text-on-primary-container' 
            : 'bg-surface-variant text-on-surface-variant'
        }`}>
          {event.status === 'active' ? 'Active' : 'Completed'}
        </span>
      </div>

      <div className="p-5">
        <h4 className="font-headline font-bold text-on-surface mb-1 line-clamp-1">{event.title}</h4>
        <p className="text-secondary text-sm mb-4">{event.category}</p>

        {fundPercent !== null && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant font-medium">Funds</span>
              <span className="font-bold text-primary">{fundPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${fundPercent}%` }} />
            </div>
          </div>
        )}

        {volPercent !== null && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant font-medium">Volunteers</span>
              <span className="font-bold text-tertiary">{volPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: `${volPercent}%` }} />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
