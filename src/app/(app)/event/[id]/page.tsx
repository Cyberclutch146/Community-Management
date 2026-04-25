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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="mb-6">
        <Link href="/feed" className="inline-flex items-center text-sm font-semibold text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
          Back to Feed
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-sm relative">
            <Image src={event.imageUrl || event.image || '/logo.svg'} alt={event.title || 'Event'} className="w-full h-full object-cover" fill />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-[20px] bg-primary-container/20 p-1.5 rounded-full">verified</span>
              <span className="text-base font-bold text-secondary">{event.organizer}</span>
              <span className="text-secondary mx-2">•</span>
              <div className="flex items-center text-secondary text-sm font-medium">
                <span className="material-symbols-outlined text-[16px] mr-1">location_on</span>
                {event.distance}
              </div>
            </div>
            
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
              {event.title}
            </h1>

            {isAdmin && (
              <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
                <div>
                  <p className="text-red-800 font-bold text-sm uppercase tracking-wider">Admin Controls</p>
                  <p className="text-red-600 text-sm">You have administrative privileges to manage this event.</p>
                </div>
                <button 
                  onClick={handleDeleteEvent}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <Trash2 size={18} />
                  Delete Event
                </button>
              </div>
            )}

            {intersectingAlerts.length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/60 shadow-sm">
                <div className="flex items-center gap-2 text-amber-800 font-bold mb-3">
                  <AlertTriangle size={20} className="text-amber-600" />
                  <h3 className="text-lg">Sentinel Safety Awareness</h3>
                </div>
                <div className="space-y-3">
                  {intersectingAlerts.map(alert => (
                    <div key={alert.id} className="flex flex-col sm:flex-row sm:items-start gap-3 bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg whitespace-nowrap w-fit ${
                        alert.severity === 'Extreme' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'Severe' ? 'bg-orange-100 text-orange-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {alert.severity} • {alert.type}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-950 mb-0.5">{alert.title}</p>
                        <p className="text-xs text-amber-800/80 line-clamp-2">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-medium text-amber-700/80 mt-4 flex items-center gap-1.5 bg-amber-100/50 p-2 rounded-lg">
                  <Info size={14} className="flex-shrink-0" /> 
                  Please exercise caution if you plan to attend. Conditions may change rapidly.
                </p>
              </div>
            )}
            
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              {event.description}
            </p>
          </div>

          {event.needs?.funds && (
            <div className="mb-10 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
              <ProgressBar 
                current={event.needs.funds.current} 
                goal={event.needs.funds.goal} 
                label={`$${event.needs.funds.current.toLocaleString()} raised of $${event.needs.funds.goal.toLocaleString()} goal`} 
              />
            </div>
          )}

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChatBox eventId={event.id} />
              <VolunteerLeaderboard eventId={event.id} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0">
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
