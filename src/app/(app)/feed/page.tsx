'use client';

import { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/services/eventService';
import MapWrapper from '@/components/MapWrapper';
import SkillMatchBanner from '@/components/SkillMatchBanner';
import { CommunityEvent } from '@/types';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { ChevronDown, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { isPointInPolygon, getDistanceMiles } from '@/utils/geo';
import { SentinelAlert } from '@/types/sentinel';

const PAGE_SIZE = 12;

type FilterState = {
  urgency: 'all' | 'high' | 'normal';
  need: 'all' | 'volunteers' | 'funds' | 'goods';
  distance: 'all' | 'within-5' | 'within-15' | 'within-30';
  category: string;
};

const DEFAULT_FILTERS: FilterState = {
  urgency: 'all',
  need: 'all',
  distance: 'all',
  category: 'all',
};

function parseDistanceMiles(distance: string | undefined) {
  if (!distance) return null;
  const numericDistance = Number.parseFloat(distance.replace(/[^0-9.]/g, ''));
  return Number.isFinite(numericDistance) ? numericDistance : null;
}

export default function FeedPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center h-[3.5rem]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
      <FeedContent />
    </Suspense>
  );
}

function FeedContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState('Detecting location...');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);

  // Semantic search state
  const [semanticResults, setSemanticResults] = useState<string[] | null>(null);
  const [isAIPowered, setIsAIPowered] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync from URL when it changes (e.g. user searches from navbar)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSearchQuery(urlQuery);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [urlQuery]);

  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [alerts, setAlerts] = useState<SentinelAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          } catch {
            setUserLocation('Location unavailable');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation('Location access denied');
        }
      );
    } else {
      const frame = window.requestAnimationFrame(() => {
        setUserLocation('Location not supported');
      });

      return () => window.cancelAnimationFrame(frame);
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
      searchTimeoutRef.current = setTimeout(() => {
        performSemanticSearch(searchQuery);
      }, 500);
    } else {
      const frame = window.requestAnimationFrame(() => {
        setSemanticResults(null);
        setIsAIPowered(false);
        setSearchLoading(false);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
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

  const categoryOptions = Array.from(
    new Set(events.map((event) => event.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

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

    if (filters.urgency !== 'all') {
      result = result.filter((event) => event.urgency === filters.urgency);
    }

    if (filters.need !== 'all') {
      result = result.filter((event) => {
        if (filters.need === 'volunteers') return Boolean(event.needs?.volunteers?.goal);
        if (filters.need === 'funds') return Boolean(event.needs?.funds?.goal);
        if (filters.need === 'goods') return Boolean(event.needs?.goods?.length);
        return true;
      });
    }

    if (filters.distance !== 'all') {
      const maxDistance = filters.distance === 'within-5'
        ? 5
        : filters.distance === 'within-15'
          ? 15
          : 30;

      result = result.filter((event) => {
        const distanceMiles = parseDistanceMiles(event.distance);
        return distanceMiles !== null && distanceMiles <= maxDistance;
      });
    }

    if (filters.category !== 'all') {
      result = result.filter((event) => event.category === filters.category);
    }

    return result;
  })();

  const activeFilters = [
    filters.urgency !== 'all' ? {
      key: 'urgency' as const,
      label: filters.urgency === 'high' ? 'Urgent' : 'Normal urgency',
    } : null,
    filters.need !== 'all' ? {
      key: 'need' as const,
      label: filters.need === 'goods'
        ? 'Needs goods'
        : filters.need === 'funds'
          ? 'Needs funds'
          : 'Needs volunteers',
    } : null,
    filters.distance !== 'all' ? {
      key: 'distance' as const,
      label: filters.distance === 'within-5'
        ? 'Within 5 miles'
        : filters.distance === 'within-15'
          ? 'Within 15 miles'
          : 'Within 30 miles',
    } : null,
    filters.category !== 'all' ? {
      key: 'category' as const,
      label: filters.category,
    } : null,
  ].filter(Boolean) as Array<{ key: keyof FilterState; label: string }>;

  const activeFilterCount = activeFilters.length;

  return (
    <div className="flex-1 flex flex-col text-on-surface w-full">
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full pb-32 md:pb-10">
        <div className="relative z-30 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 animate-fade-in-up">
          <div>
            <p className="text-secondary font-semibold mb-1 text-sm uppercase tracking-wider">Local Events Feed</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-gradient-earth">Discover & Support</h2>
            <p className="mt-3 text-on-surface-variant max-w-xl leading-relaxed">
              Find local community events and support neighbors in need.
            </p>
            {searchQuery && (
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-on-surface-variant">Showing results for</span>
                <span
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(59,107,74,0.1)', color: 'var(--color-primary-base)' }}
                >
                  &ldquo;{searchQuery}&rdquo;
                </span>
                {isAIPowered && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(212,168,82,0.12)', color: 'var(--color-warm-amber)', border: '1px solid rgba(212,168,82,0.2)' }}
                  >
                    <Sparkles size={12} />
                    AI-powered
                  </span>
                )}
                <button onClick={() => setSearchQuery('')} className="text-xs text-on-surface-variant hover:text-error transition-colors ml-1">✕ Clear</button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* View Toggle */}
            <div
              className="flex rounded-full p-1"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 2px 8px rgba(42,45,43,0.04)',
              }}
            >
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === 'list'
                    ? 'text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                style={viewMode === 'list' ? {
                  background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                  boxShadow: '0 2px 8px rgba(59,107,74,0.25)',
                } : undefined}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === 'map'
                    ? 'text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                style={viewMode === 'map' ? {
                  background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                  boxShadow: '0 2px 8px rgba(59,107,74,0.25)',
                } : undefined}
              >
                Map
              </button>
            </div>
            {/* Location Chip */}
            <div
              className="flex items-center rounded-full px-4 py-2 max-w-[200px] md:max-w-[250px]"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <span className="material-symbols-outlined text-[var(--color-terracotta)] mr-2 text-sm shrink-0">location_on</span>
              <span className="text-sm font-medium text-on-surface truncate" title={userLocation}>
                {userLocation}
              </span>
            </div>

            <div className="relative z-40" ref={filterMenuRef}>
              <button
                onClick={() => setFilterMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: filterMenuOpen || activeFilterCount > 0
                    ? 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))'
                    : 'var(--glass-bg)',
                  color: filterMenuOpen || activeFilterCount > 0
                    ? 'var(--color-on-primary-base)'
                    : 'var(--color-on-surface-base)',
                  backdropFilter: 'blur(12px)',
                  border: filterMenuOpen || activeFilterCount > 0
                    ? '1px solid transparent'
                    : '1px solid var(--glass-border)',
                  boxShadow: filterMenuOpen || activeFilterCount > 0
                    ? '0 3px 12px rgba(59,107,74,0.25)'
                    : '0 2px 8px rgba(42,45,43,0.04)',
                }}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span
                    className="inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold"
                    style={{
                      background: filterMenuOpen || activeFilterCount > 0 ? 'rgba(255,255,255,0.18)' : 'rgba(59,107,74,0.08)',
                    }}
                  >
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown size={16} className={`transition-transform duration-300 ${filterMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {filterMenuOpen && (
                <div
                  className="absolute right-0 top-full z-50 mt-3 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-[28px] p-4 md:p-5"
                  style={{
                    background: 'var(--glass-bg-strong)',
                    backdropFilter: 'blur(28px) saturate(1.5)',
                    WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow-lg)',
                  }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-on-surface">Filter events</p>
                      <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">Narrow the feed by urgency, support type, distance, and category.</p>
                    </div>
                    <button
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                      className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors hover:text-primary"
                      style={{ background: 'rgba(59,107,74,0.08)' }}
                    >
                      Reset
                    </button>
                  </div>

                  {activeFilters.length > 0 && (
                    <div
                      className="mb-4 rounded-2xl p-3"
                      style={{ background: 'rgba(59,107,74,0.06)', border: '1px solid rgba(59,107,74,0.12)' }}
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">Active filters</span>
                        <span className="text-xs font-medium text-primary">{activeFilterCount} applied</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeFilters.map((filterItem) => (
                          <span
                            key={filterItem.key}
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid var(--glass-border)' }}
                          >
                            {filterItem.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div
                      className="rounded-[22px] p-3.5"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                    >
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Urgency</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'all', label: 'All' },
                          { value: 'high', label: 'Urgent' },
                          { value: 'normal', label: 'Normal' },
                        ].map((option) => {
                          const active = filters.urgency === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => setFilters((current) => ({ ...current, urgency: option.value as FilterState['urgency'] }))}
                              className="rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200"
                              style={active ? {
                                background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                                color: 'var(--color-on-primary-base)',
                                boxShadow: '0 3px 10px rgba(59,107,74,0.22)',
                              } : {
                                background: 'rgba(255,255,255,0.62)',
                                color: 'var(--color-on-surface-base)',
                                border: '1px solid var(--glass-border)',
                              }}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="rounded-[22px] p-3.5"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                    >
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Support Needed</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'all', label: 'Any' },
                          { value: 'volunteers', label: 'Volunteers' },
                          { value: 'funds', label: 'Funds' },
                          { value: 'goods', label: 'Goods' },
                        ].map((option) => {
                          const active = filters.need === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => setFilters((current) => ({ ...current, need: option.value as FilterState['need'] }))}
                              className="rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200"
                              style={active ? {
                                background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                                color: 'var(--color-on-primary-base)',
                                boxShadow: '0 3px 10px rgba(59,107,74,0.22)',
                              } : {
                                background: 'rgba(255,255,255,0.62)',
                                color: 'var(--color-on-surface-base)',
                                border: '1px solid var(--glass-border)',
                              }}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="rounded-[22px] p-3.5"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                    >
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Distance</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'all', label: 'Any distance' },
                          { value: 'within-5', label: 'Within 5 mi' },
                          { value: 'within-15', label: 'Within 15 mi' },
                          { value: 'within-30', label: 'Within 30 mi' },
                        ].map((option) => {
                          const active = filters.distance === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => setFilters((current) => ({ ...current, distance: option.value as FilterState['distance'] }))}
                              className="rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200"
                              style={active ? {
                                background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                                color: 'var(--color-on-primary-base)',
                                boxShadow: '0 3px 10px rgba(59,107,74,0.22)',
                              } : {
                                background: 'rgba(255,255,255,0.62)',
                                color: 'var(--color-on-surface-base)',
                                border: '1px solid var(--glass-border)',
                              }}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <label
                      className="block rounded-[22px] p-3.5"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                    >
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Category</span>
                      <select
                        value={filters.category}
                        onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
                        className="w-full rounded-2xl px-4 py-3 text-sm outline-none"
                        style={{ background: 'rgba(255,255,255,0.62)', border: '1px solid var(--glass-border)' }}
                      >
                        <option value="all">All categories</option>
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl px-3.5 py-3" style={{ background: 'rgba(42,45,43,0.04)' }}>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{filteredEvents.length} matching events</p>
                      <p className="text-xs text-on-surface-variant">Results update instantly as you refine the feed.</p>
                    </div>
                    <button
                      onClick={() => setFilterMenuOpen(false)}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-on-primary transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
                        boxShadow: '0 3px 10px rgba(59,107,74,0.22)',
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skill-Based Recommendations — only show when no search query */}
        {!searchQuery && <SkillMatchBanner condensed />}

        {activeFilters.length > 0 && (
          <section className="mb-8 animate-fade-in-up delay-100">
            <div className="flex flex-wrap items-center gap-2.5">
              {activeFilters.map((filterItem) => (
                <button
                  key={filterItem.key}
                  onClick={() => setFilters((current) => ({ ...current, [filterItem.key]: DEFAULT_FILTERS[filterItem.key] }))}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  {filterItem.label}
                  <X size={14} className="text-on-surface-variant" />
                </button>
              ))}
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
              >
                Clear all
              </button>
            </div>
          </section>
        )}

        {loading || searchLoading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <div className="absolute inset-0 rounded-full animate-subtle-pulse" style={{ boxShadow: '0 0 30px rgba(59,107,74,0.15)' }} />
            </div>
            {searchLoading && (
              <p className="text-sm text-on-surface-variant flex items-center gap-2 mt-2">
                <Sparkles size={14} style={{ color: 'var(--color-warm-amber)' }} />
                Searching with AI...
              </p>
            )}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center animate-fade-in-up"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <span className="material-symbols-outlined text-4xl mb-4 text-primary">event_busy</span>
            <h3 className="font-headline text-xl font-bold mb-2 text-on-surface">No events found</h3>
            <p className="text-on-surface-variant">No events are currently scheduled matching this criteria. Be the first to create one!</p>
          </div>
        ) : viewMode === 'map' ? (
          <div
            className="h-[600px] w-full mt-4 rounded-2xl overflow-hidden animate-fade-in-up"
            style={{ border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}
          >
            <MapWrapper events={filteredEvents} alerts={alerts} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
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

              return (
                <EventCard
                  key={event.id}
                  event={normalizedEvent}
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
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50 flex items-center gap-2 hover:-translate-y-0.5"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-on-surface-base)',
              }}
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
