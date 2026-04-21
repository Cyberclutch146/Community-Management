import { mockEvents, mockMessages } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { DonationPanel } from '@/components/DonationPanel';
import { ChatBox } from '@/components/ChatBox';
import Link from 'next/link';
import Image from 'next/image';

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    notFound();
  }

  const eventMessages = mockMessages.filter(m => m.eventId === id);

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
            <Image src={event.image} alt={event.title} className="w-full h-full object-cover" fill />
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
            <ChatBox initialMessages={eventMessages} eventId={event.id} />
          </div>
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0">
          <DonationPanel needs={event.needs} />
        </div>
      </div>
    </main>
  );
}
