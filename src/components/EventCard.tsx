import Link from 'next/link';
import Image from 'next/image';
import { CommunityEvent } from '@/types';
import { SentinelAlert } from '@/types/sentinel';

interface EventCardProps {
  event: CommunityEvent;
  featured?: boolean;
  sentinelAlerts?: SentinelAlert[];
}

export function EventCard({ event, featured = false, sentinelAlerts = [] }: EventCardProps) {
  const hasAlerts = sentinelAlerts.length > 0;

  const badge = (
    <span className="inline-flex items-center gap-1 rounded-full border border-outline-variant/20 bg-surface-container px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant">
      {event.urgency === 'high' ? 'Urgent' : event.category}
    </span>
  );

  if (featured) {
    return (
      <article className="group overflow-hidden rounded-[32px] border border-outline-variant/20 bg-surface-container-lowest shadow-[0_24px_70px_rgba(46,50,48,0.06)] transition-transform duration-300 hover:-translate-y-1">
        <div className="relative h-72 overflow-hidden">
          <Image
            alt={event.title}
            src={event.imageUrl || event.image || '/logo.svg'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
          <div className="absolute left-6 bottom-6 flex flex-wrap gap-3">
            {badge}
            {hasAlerts && (
              <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100/95 px-3 py-1 text-[11px] font-semibold text-red-800">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                Alert Zone
              </span>
            )}
          </div>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">{event.organizer}</span>
            <span>•</span>
            <span>{event.distance}</span>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-on-surface leading-tight">{event.title}</h3>
            <p className="text-sm leading-relaxed text-on-surface-variant">{event.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-surface border border-outline-variant/20 p-4 text-sm text-on-surface-variant">
              <div className="font-semibold text-on-surface mb-2">Goal Progress</div>
              <div className="h-2 w-full rounded-full bg-surface-variant overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${event.progress}%` }} />
              </div>
              <div className="mt-2 text-xs">{event.progress}% complete</div>
            </div>
            <div className="rounded-3xl bg-surface border border-outline-variant/20 p-4 text-sm text-on-surface-variant">
              <div className="font-semibold text-on-surface mb-2">Needs</div>
              <div className="flex flex-wrap gap-2">
                {event.needs?.goods && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Goods</span>}
                {event.needs?.volunteers && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Volunteers</span>}
                {event.needs?.funds && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Funds</span>}
              </div>
            </div>
          </div>

          <Link href={`/event/${event.id}`} className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container">
            View Details
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-[32px] border border-outline-variant/20 bg-surface-container-lowest shadow-[0_24px_70px_rgba(46,50,48,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={event.imageUrl || event.image || '/logo.svg'}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
        <div className="absolute left-6 top-6">{badge}</div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
          <span className="font-semibold text-on-surface">{event.organizer}</span>
          <span>•</span>
          <span>{event.distance}</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-semibold text-on-surface leading-tight">{event.title}</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant">{event.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-surface border border-outline-variant/20 p-4 text-sm text-on-surface-variant">
            <div className="font-semibold text-on-surface mb-2">Goal Progress</div>
            <div className="h-2 w-full rounded-full bg-surface-variant overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${event.progress}%` }} />
            </div>
            <div className="mt-2 text-xs">{event.progress ?? 0}% complete</div>
          </div>
          <div className="rounded-3xl bg-surface border border-outline-variant/20 p-4 text-sm text-on-surface-variant">
            <div className="font-semibold text-on-surface mb-2">Needs</div>
            <div className="flex flex-wrap gap-2">
              {event.needs?.goods && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Goods</span>}
              {event.needs?.volunteers && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Volunteers</span>}
              {event.needs?.funds && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Funds</span>}
              {!event.needs && <span className="rounded-full bg-surface-container px-3 py-1 text-xs">Needs review</span>}
            </div>
          </div>
        </div>

        <Link href={`/event/${event.id}`} className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container">
          View Details
        </Link>
      </div>
    </article>
  );
}
