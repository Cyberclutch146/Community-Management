'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/services/eventService';
import { CommunityEvent } from '@/types';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

const PAGE_SIZE = 12;

export default function FeedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f4f1] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f3d2b]"></div></div>}>
      <FeedContent />
    </Suspense>
  );
}

function FeedContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [filter, setFilter] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  // Sync from URL when it changes (e.g. user searches from navbar)
  useEffect(() => { setSearchQuery(urlQuery) }, [urlQuery]);

  const categories = [
    { name: 'All Events', icon: 'tune' },
    { name: 'Urgent Needs', icon: 'emergency', extraClasses: 'text-error' },
    { name: 'Within 5 miles', icon: 'expand_more' },
    { name: 'Food Drive', icon: 'restaurant' },
    { name: 'Volunteers', icon: 'group' },
  ];

  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getEvents(PAGE_SIZE);
        setEvents(result.events);
        lastDocRef.current = result.lastDoc;
        setHasMore(result.hasMore);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getEvents(PAGE_SIZE, lastDocRef.current);
      setEvents(prev => [...prev, ...result.events]);
      lastDocRef.current = result.lastDoc;
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Failed to load more events:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredEvents = events.filter(e => {
    // Category filter
    if (filter !== 'All Events' && e.category !== filter) return false;
    // Text search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f5f4f1] text-[#1f3d2b]">
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-secondary font-medium mb-1">Local Events Feed</p>
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Discover & Support</h2>
          {searchQuery && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">Showing results for</span>
              <span className="bg-[#1f3d2b]/10 text-[#1f3d2b] text-sm font-medium px-3 py-1 rounded-full">&ldquo;{searchQuery}&rdquo;</span>
              <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-1">✕ Clear</button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant/50">
            <span className="material-symbols-outlined text-secondary mr-2 text-sm">location_on</span>
            <select className="bg-transparent border-none text-sm font-medium text-on-surface focus:ring-0 p-0 pr-6 outline-none appearance-none cursor-pointer">
              <option>Portland Metro Area</option>
              <option>Seattle Area</option>
              <option>Eugene/Springfield</option>
            </select>
          </div>
        </div>
      </div>

      <section className="mb-8 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => {
            const isActive = filter === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setFilter(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-transform hover:-translate-y-0.5 ${
                  isActive 
                    ? 'bg-primary text-on-primary font-semibold shadow-sm' 
                    : 'bg-surface-container text-on-surface font-medium border border-outline-variant/30 hover:bg-surface-container-high transition-colors'
                }`}
              >
                {cat.name !== 'All Events' ? cat.name : undefined}
                <span className={`material-symbols-outlined text-[16px] ${cat.extraClasses && !isActive ? cat.extraClasses : ''}`}>
                  {cat.icon}
                </span>
                {cat.name === 'All Events' ? cat.name : undefined}
              </button>
            );
          })}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-surface-container rounded-2xl p-10 text-center text-on-surface-variant border border-outline-variant/30">
          <span className="material-symbols-outlined text-4xl mb-4 text-primary">event_busy</span>
          <h3 className="font-headline text-xl font-bold mb-2 text-on-surface">No events found</h3>
          <p>No events are currently scheduled matching this criteria. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} featured={index === 0} />
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-transparent border border-outline text-on-surface px-8 py-3 rounded-xl font-semibold hover:bg-surface-container-low transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                Loading...
              </>
            ) : (
              'Load More Events'
            )}
          </button>
        </div>
      )}
    </main>
    </div>
  );
}
