'use client';

import { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/services/eventService';
import MapWrapper from '@/components/MapWrapper';
import SkillMatchBanner from '@/components/SkillMatchBanner';
import { CommunityEvent } from '@/types';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Sparkles } from 'lucide-react';
import { isPointInPolygon, getDistanceMiles } from '@/utils/geo';
import { SentinelAlert } from '@/types/sentinel';

const PAGE_SIZE = 12;

export default function FeedPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex bg-[#f5f4f1] items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f3d2b]"></div></div>}>
      <FeedContent />
    </Suspense>
  );
}

function FeedContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [filter, setFilter] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState('Detecting location...');

  // Semantic search state
  const [semanticResults, setSemanticResults] = useState<string[] | null>(null);
  const [isAIPowered, setIsAIPowered] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  const [alerts, setAlerts] = useState<any[]>([]); // Sentinel Alerts
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
            const data = await response.json();
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Current Location';
            const state = data.address?.state || '';
            setUserLocation(state ? `${city}, ${state}` : city);
          } catch (error) {
            setUserLocation('Location unavailable');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation('Location access denied');
        }
      );
    } else {
      setUserLocation('Location not supported');
    }
  }, []);

  useEffect(() => {
    const fetchEventsAndAlerts = async () => {
      try {
        const [eventsResult, alertsResult] = await Promise.all([
           getEvents(PAGE_SIZE),
           fetch('/api/sentinel').then(res => res.ok ? res.json() : [])
        ]);
        setEvents(eventsResult.events);
        setAlerts(alertsResult);
        lastDocRef.current = eventsResult.lastDoc;
        setHasMore(eventsResult.hasMore);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsAndAlerts();
  }, []);

  // Semantic search effect with debounce
  const performSemanticSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSemanticResults(null);
      setIsAIPowered(false);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data = await response.json();
      if (data.success) {
        setSemanticResults(data.results);
        setIsAIPowered(data.isAIPowered);
      } else {
        // Fallback: clear semantic results and use client-side filtering
        setSemanticResults(null);
        setIsAIPowered(false);
      }
    } catch (error) {
      console.error('Semantic search failed:', error);
      setSemanticResults(null);
      setIsAIPowered(false);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Debounced search trigger
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      setSearchLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        performSemanticSearch(searchQuery);
      }, 500);
    } else {
      setSemanticResults(null);
      setIsAIPowered(false);
      setSearchLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, performSemanticSearch]);

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

  // Smart filtering: use semantic results if available, otherwise fallback to client-side
  const filteredEvents = (() => {
    let result = events;

    // If semantic search returned results, reorder by those IDs
    if (semanticResults && searchQuery.trim()) {
      const idOrder = new Map(semanticResults.map((id, index) => [id, index]));
      result = events
        .filter(e => idOrder.has(e.id))
        .sort((a, b) => (idOrder.get(a.id) ?? 999) - (idOrder.get(b.id) ?? 999));
    } else if (searchQuery.trim() && !semanticResults) {
      // Fallback to client-side keyword search
      const q = searchQuery.toLowerCase();
      result = events.filter(e =>
        e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      );
    }

    // Category filter (applied on top of search)
    if (filter !== 'All Events') {
      result = result.filter(e => e.category === filter);
    }

    return result;
  })();

  return (
    <div className="flex-1 flex flex-col text-[#1f3d2b] w-full">
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 md:pb-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-10">
        <div>
          <p className="text-secondary font-medium mb-1">Local Events Feed</p>
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Discover & Support</h2>
          <p className="mt-3 text-on-surface-variant max-w-xl leading-relaxed">
            Find local community events and support neighbors in need.
          </p>
          {searchQuery && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">Showing results for</span>
              <span className="bg-[#1f3d2b]/10 text-[#1f3d2b] text-sm font-medium px-3 py-1 rounded-full">&ldquo;{searchQuery}&rdquo;</span>
              {isAIPowered && (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                  <Sparkles size={12} />
                  AI-powered
                </span>
              )}
              <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-1">✕ Clear</button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-surface-container-lowest rounded-full p-1 border border-outline-variant/20 shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-[#1f3d2b] text-white shadow-sm' : 'text-gray-500 hover:text-black'}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-[#1f3d2b] text-white shadow-sm' : 'text-gray-500 hover:text-black'}`}
            >
              Map
            </button>
          </div>
          <div className="flex items-center bg-surface-container-lowest rounded-full px-4 py-2 border border-outline-variant/20 max-w-[200px] md:max-w-[250px]">
            <span className="material-symbols-outlined text-secondary mr-2 text-sm shrink-0">location_on</span>
            <span className="text-sm font-medium text-on-surface truncate" title={userLocation}>
              {userLocation}
            </span>
          </div>
        </div>
      </div>

      {/* Skill-Based Recommendations — only show when no search query */}
      {!searchQuery && <SkillMatchBanner condensed />}

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

      {loading || searchLoading ? (
        <div className="flex flex-col justify-center items-center py-20 gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          {searchLoading && (
            <p className="text-sm text-on-surface-variant flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              Searching with AI...
            </p>
          )}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-surface-container rounded-2xl p-10 text-center text-on-surface-variant border border-outline-variant/30">
          <span className="material-symbols-outlined text-4xl mb-4 text-primary">event_busy</span>
          <h3 className="font-headline text-xl font-bold mb-2 text-on-surface">No events found</h3>
          <p>No events are currently scheduled matching this criteria. Be the first to create one!</p>
        </div>
      ) : viewMode === 'map' ? (
        <div className="h-[600px] w-full mt-4">
          <MapWrapper events={filteredEvents} alerts={alerts} />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 items-start">
          {filteredEvents.map((event, index) => {
            const imageUrl = event.imageUrl || '/images/event-placeholder.jpg';

            const normalizedEvent = {
              ...event,
              imageUrl: imageUrl,
            };

            // Compute overlapping alerts
            const intersectingAlerts = alerts.filter((alert: SentinelAlert) => {
              if (!event.lat || !event.lng) return false;
              
              if (alert.polygon && alert.polygon.length > 0) {
                return isPointInPolygon({ lat: event.lat, lng: event.lng }, alert.polygon);
              } else if (alert.coordinates) {
                // 30 mile radius for point alerts
                const dist = getDistanceMiles(event.lat, event.lng, alert.coordinates.lat, alert.coordinates.lng);
                return dist <= 30;
              }
              return false;
            });

            // Create a neat bento box pattern: stagger the large cards
            const bentoPattern = [0, 4, 7, 11];
            const isFeatured = bentoPattern.includes(index % 12);

            return (
              <EventCard 
                key={event.id} 
                event={normalizedEvent} 
                featured={isFeatured}
                sentinelAlerts={intersectingAlerts}
              />
            );
          })}
        </div>
      )}

      {hasMore && !loading && !searchQuery && (
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
