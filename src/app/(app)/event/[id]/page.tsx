'use client';

import { notFound, useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { DonationPanel } from '@/components/DonationPanel';
import { ChatBox } from '@/components/ai/ChatBox';
import { VolunteerLeaderboard } from '@/components/VolunteerLeaderboard';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, use, useCallback } from 'react';
import { getEventById, deleteEvent, ADMIN_EMAIL } from '@/services/eventService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Trash2, AlertTriangle, Info } from 'lucide-react';
import { CommunityEvent } from '@/types';
import { SentinelAlert } from '@/types/sentinel';
import { isPointInPolygon, getDistanceMiles } from '@/utils/geo';

export default function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const { user } = useAuth();
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [alerts, setAlerts] = useState<SentinelAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, alertsData] = await Promise.all([
          getEventById(id),
          fetch('/api/sentinel').then(r => r.json()).catch(() => [])
        ]);
        if (!eventData) notFound();
        setEvent(eventData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Failed to load event data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const refreshEvent = useCallback(async () => {
    try {
      const data = await getEventById(id);
      if (data) setEvent(data);
    } catch (err) {
      console.error('Failed to refresh event:', err);
    }
  }, [id]);

  const handleDeleteEvent = async () => {
    if (!confirm('ADMIN: Are you sure you want to delete this event? This action cannot be undone.')) return;
    
    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully.');
      router.push('/feed');
    } catch (error) {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event.');
    }
  };

  const isAdmin = user?.email === ADMIN_EMAIL;

  if (loading) {
    return (
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <div className="absolute inset-0 rounded-full animate-subtle-pulse" style={{ boxShadow: '0 0 30px rgba(59,107,74,0.15)' }} />
        </div>
      </main>
    );
  }

  if (!event) return null;

  const intersectingAlerts = alerts.filter((alert: SentinelAlert) => {
    if (!event.lat || !event.lng) return false;
    
    // Check polygon intersection if it's an extreme alert with a defined area
    if (alert.severity === 'Extreme' && alert.polygon && alert.polygon.length > 2) {
      if (isPointInPolygon({ lat: event.lat, lng: event.lng }, alert.polygon)) {
        return true;
      }
    }
    
    // Fallback to radius check (30 miles for general alerts)
    if (alert.coordinates?.lat && alert.coordinates?.lng) {
      const distance = getDistanceMiles(
        event.lat, 
        event.lng, 
        alert.coordinates.lat, 
        alert.coordinates.lng
      );
      return distance <= 30; // 30 miles radius
    }
    
    return false;
  });

  return (
    <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="mb-6 animate-fade-in-up">
        <Link href="/feed" className="inline-flex items-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
          Back to Feed
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div
            className="w-full h-64 md:h-96 rounded-[24px] overflow-hidden mb-8 relative animate-fade-in-up"
            style={{ boxShadow: 'var(--glass-shadow-lg)', border: '1px solid var(--glass-border)' }}
          >
            <Image src={event.imageUrl || event.image || '/logo.svg'} alt={event.title || 'Event'} className="w-full h-full object-cover" fill />
          </div>

          <div className="mb-8 animate-fade-in-up delay-100">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="material-symbols-outlined text-[20px] p-1.5 rounded-full"
                style={{ background: 'rgba(59,107,74,0.1)', color: 'var(--color-primary-base)' }}
              >
                verified
              </span>
              <span className="text-base font-bold text-on-surface-variant">{event.organizer}</span>
              <span className="text-on-surface-variant/40 mx-1">•</span>
              <div className="flex items-center text-on-surface-variant text-sm font-medium">
                <span className="material-symbols-outlined text-[16px] mr-1">location_on</span>
                {event.distance}
              </div>
            </div>
            
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 leading-tight tracking-tight">
              {event.title}
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl mb-6">
              Join neighbors in supporting this local initiative and stay informed about any nearby safety alerts.
            </p>

            {isAdmin && (
              <div
                className="mb-6 p-4 rounded-[20px] flex items-center justify-between"
                style={{
                  background: 'rgba(184,50,48,0.05)',
                  border: '1px solid rgba(184,50,48,0.15)',
                }}
              >
                <div>
                  <p className="text-red-800 dark:text-red-300 font-bold text-sm uppercase tracking-wider">Admin Controls</p>
                  <p className="text-red-600 dark:text-red-400 text-sm">You have administrative privileges to manage this event.</p>
                </div>
                <button 
                  onClick={handleDeleteEvent}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  style={{ boxShadow: '0 3px 12px rgba(220,38,38,0.25)' }}
                >
                  <Trash2 size={18} />
                  Delete Event
                </button>
              </div>
            )}

            {intersectingAlerts.length > 0 && (
              <div
                className="mb-6 p-5 rounded-[20px]"
                style={{
                  background: 'rgba(212,168,82,0.06)',
                  border: '1px solid rgba(212,168,82,0.2)',
                  boxShadow: '0 4px 16px rgba(212,168,82,0.06)',
                }}
              >
                <div className="flex items-center gap-2 font-bold mb-3" style={{ color: 'var(--color-warm-amber)' }}>
                  <AlertTriangle size={20} />
                  <h3 className="text-lg">Sentinel Safety Awareness</h3>
                </div>
                <div className="space-y-3">
                  {intersectingAlerts.map(alert => (
                    <div key={alert.id} className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg whitespace-nowrap w-fit ${
                        alert.severity === 'Extreme' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                        alert.severity === 'Severe' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>
                        {alert.severity} • {alert.type}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-on-surface mb-0.5">{alert.title}</p>
                        <p className="text-xs text-on-surface-variant line-clamp-2">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-medium mt-4 flex items-center gap-1.5 p-2.5 rounded-lg" style={{ background: 'rgba(212,168,82,0.08)', color: 'var(--color-warm-amber)' }}>
                  <Info size={14} className="flex-shrink-0" /> 
                  Please exercise caution if you plan to attend. Conditions may change rapidly.
                </p>
              </div>
            )}
            
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Social Sharing */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`🌿 Check out "${event.title}" on Kindred Relief Network!\n\n${event.description?.slice(0, 120)}...\n\n📍 ${event.location}\n\n👉 ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: 'rgba(37, 211, 102, 0.1)',
                  color: '#25D366',
                  border: '1px solid rgba(37, 211, 102, 0.2)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🌿 Check out "${event.title}" — a community initiative at ${event.location}! #KindredRelief #Community`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: 'rgba(29, 161, 242, 0.1)',
                  color: '#1DA1F2',
                  border: '1px solid rgba(29, 161, 242, 0.2)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Post on X
              </a>
            </div>
          </div>

          {event.needs?.funds && (
            <div className="mb-10 premium-glass p-6 animate-fade-in-up delay-200">
              <ProgressBar 
                current={event.needs.funds.current} 
                goal={event.needs.funds.goal} 
                label={`$${event.needs.funds.current.toLocaleString()} raised of $${event.needs.funds.goal.toLocaleString()} goal`} 
              />
            </div>
          )}

          <div className="mt-10 animate-fade-in-up delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChatBox eventId={event.id} />
              <VolunteerLeaderboard eventId={event.id} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0 animate-fade-in-up delay-200">
          <DonationPanel 
            eventId={event.id} 
            eventTitle={event.title}
            eventDescription={event.description}
            eventLocation={event.location}
            eventTime={event.eventDate ? new Date(event.eventDate).toLocaleString() : (event.createdAt?.toDate?.()?.toLocaleString() || 'TBD')}
            enrolledCount={event.needs?.volunteers?.current || 0}
            needs={event.needs} 
            onActionComplete={refreshEvent} 
          />
        </div>
      </div>
    </main>
  );
}
