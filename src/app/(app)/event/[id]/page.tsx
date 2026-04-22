'use client';

import { notFound } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { DonationPanel } from '@/components/DonationPanel';
import { ChatBox } from '@/components/ChatBox';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, use, useCallback } from 'react';
import { getEventById } from '@/services/eventService';
import { CommunityEvent } from '@/types';

export default function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        if (!data) notFound();
        setEvent(data);
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const refreshEvent = useCallback(async () => {
    try {
      const data = await getEventById(id);
      if (data) setEvent(data);
    } catch (err) {
      console.error('Failed to refresh event:', err);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </main>
    );
  }

  if (!event) return null;

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
            <Image src={event.imageUrl || 'https://images.unsplash.com/photo-1593113565694-c6ccdd8dcb15?q=80&w=2669&auto=format&fit=crop'} alt={event.title || 'Event'} className="w-full h-full object-cover" fill />
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
            <ChatBox eventId={event.id} />
          </div>
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0">
          <DonationPanel eventId={event.id} needs={event.needs} onActionComplete={refreshEvent} />
        </div>
      </div>
    </main>
  );
}
