import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/data/mockData';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  if (featured) {
    return (
      <article className="col-span-1 md:col-span-2 lg:col-span-2 bg-surface-bright rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20 flex flex-col md:flex-row group transition-all duration-300 hover:shadow-md">
        <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
          <Image alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={(event as any).imageUrl || event.image || 'https://images.unsplash.com/photo-1593113565694-c6ccdd8dcb15?q=80&w=2669&auto=format&fit=crop'} fill sizes="(max-width: 768px) 100vw, 40vw" />
          {event.urgency === 'high' && (
            <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span> High Urgency
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-gradient-to-br from-surface-bright to-surface-container-low">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="text-sm font-semibold text-secondary">{event.organizer}</span>
              <span className="text-xs text-outline mx-1">•</span>
              <span className="text-xs text-outline">{event.distance}</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-3 leading-tight">{event.title}</h3>
            <p className="text-on-surface-variant text-base mb-6 line-clamp-3 leading-relaxed">
              {event.description}
            </p>
          </div>
          <div className="mt-auto">
            <div className="flex gap-4 mb-5">
              {event.needs?.goods && (
                <div className="flex flex-col items-center gap-1" title="Goods Needed">
                  <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">checkroom</span>
                  </div>
                </div>
              )}
              {event.needs?.volunteers && (
                <div className="flex flex-col items-center gap-1" title="Volunteers Needed">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                  </div>
                </div>
              )}
              {event.needs?.funds && (
                <div className={`flex flex-col items-center gap-1 ${event.needs.funds.current >= event.needs.funds.goal ? 'opacity-40' : ''}`} title="Funds Needed">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-secondary mb-1.5">
                <span>Goal Progress</span>
                <span>{event.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${event.progress}%` }}></div>
              </div>
            </div>
            <Link href={`/events/${event.id}`} className="w-full md:w-auto bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-bright inline-block text-center">
              View Details
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-surface-bright rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20 flex flex-col group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-4">
        {event.urgency === 'high' ? (
           <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
        ) : (
          <div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[12px] text-secondary">person</span>
          </div>
        )}
        <span className="text-sm font-semibold text-secondary">{event.organizer}</span>
        <span className="text-xs text-outline ml-auto">{event.distance}</span>
      </div>
      <h3 className="font-headline text-xl font-bold text-on-surface mb-2 leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
      <p className="text-on-surface-variant text-sm mb-4 line-clamp-2 flex-grow">
        {event.description}
      </p>
      
      {event.needs?.funds && (
        <div className="mb-5">
          <div className="flex justify-between text-xs font-semibold text-secondary mb-1.5">
            <span>${event.needs.funds.current.toLocaleString()} raised</span>
            <span>${(event.needs.funds.goal / 1000).toFixed(0)}k goal</span>
          </div>
          <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
             <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: `${event.progress}%` }}></div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mt-auto">
        <div className="flex gap-2">
          {event.needs?.volunteers && (
            <div className={`w-8 h-8 rounded-full ${event.category === 'Volunteers' ? 'bg-tertiary-container/30 text-tertiary' : 'bg-primary-container/30 text-primary'} flex items-center justify-center`} title="Volunteers Needed">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
          )}
          {event.needs?.goods && (
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant" title="Goods/Food Donations">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
          )}
          {event.needs?.funds && !event.needs?.volunteers && !event.needs?.goods && (
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant" title="Funds Needed">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          )}
        </div>
        <Link href={`/events/${event.id}`} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
          View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}
