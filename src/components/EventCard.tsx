'use client';

import { useEffect, useRef, useState } from 'react';
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
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [descriptionLineClamp, setDescriptionLineClamp] = useState(featured ? 3 : 2);

  useEffect(() => {
    if (featured || !titleRef.current) {
      return;
    }

    const titleElement = titleRef.current;

    const updateDescriptionClamp = () => {
      const computedStyle = window.getComputedStyle(titleElement);
      const lineHeight = Number.parseFloat(computedStyle.lineHeight);

      if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
        setDescriptionLineClamp(2);
        return;
      }

      const titleLines = Math.max(1, Math.round(titleElement.getBoundingClientRect().height / lineHeight));
      setDescriptionLineClamp(Math.max(1, 4 - titleLines));
    };

    updateDescriptionClamp();

    const resizeObserver = new ResizeObserver(updateDescriptionClamp);
    resizeObserver.observe(titleElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [event.title, featured]);

  const badge = (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        color: 'var(--color-on-surface-variant-base)',
      }}
    >
      {event.urgency === 'high' ? '🔴 Urgent' : event.category}
    </span>
  );

  if (featured) {
    return (
      <article
        className="group overflow-hidden rounded-[28px] transition-all duration-500 ease-out hover:-translate-y-1.5"
        style={{
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <div className="relative h-72 overflow-hidden">
          <Image
            alt={event.title}
            src={event.imageUrl || event.image || '/logo.svg'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-surface-base) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)' }} />
          <div className="absolute left-6 bottom-6 flex flex-wrap gap-2.5">
            {badge}
            {hasAlerts && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-3 py-1 text-[11px] font-bold text-white" style={{ boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)' }}>
                <span className="material-symbols-outlined text-[12px]">warning</span>
                Alert Zone
              </span>
            )}
          </div>
        </div>

        <div className="p-7 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">{event.organizer}</span>
            <span className="opacity-40">•</span>
            <span>{event.distance}</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-semibold text-on-surface leading-tight tracking-tight">{event.title}</h3>
            <p className="text-sm leading-relaxed text-on-surface-variant line-clamp-3">{event.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl p-4 text-sm text-on-surface-variant"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            >
              <div className="font-semibold text-on-surface mb-2.5 text-xs uppercase tracking-wider">Goal Progress</div>
              <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-surface-variant-base)' }}>
                <div className="h-full rounded-full transition-all duration-700 ease-out progress-glow" style={{ width: `${event.progress}%`, background: 'linear-gradient(90deg, var(--color-primary-base), var(--color-sage))' }} />
              </div>
              <div className="mt-2 text-xs font-medium">{event.progress}% complete</div>
            </div>
            <div
              className="rounded-2xl p-4 text-sm text-on-surface-variant"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            >
              <div className="font-semibold text-on-surface mb-2.5 text-xs uppercase tracking-wider">Needs</div>
              <div className="flex flex-wrap gap-2">
                {event.needs?.goods && <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: 'rgba(194, 113, 91, 0.12)', color: 'var(--color-terracotta)' }}>Goods</span>}
                {event.needs?.volunteers && <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: 'rgba(59, 107, 74, 0.12)', color: 'var(--color-primary-base)' }}>Volunteers</span>}
                {event.needs?.funds && <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: 'rgba(139, 109, 46, 0.12)', color: 'var(--color-tertiary-base)' }}>Funds</span>}
              </div>
            </div>
          </div>

          <Link
            href={`/event/${event.id}`}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-on-primary transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-base) 0%, var(--color-moss) 100%)',
              boxShadow: '0 4px 14px rgba(59, 107, 74, 0.25), 0 1px 3px rgba(59, 107, 74, 0.1)',
            }}
          >
            View Details
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group overflow-hidden rounded-[24px] transition-all duration-500 ease-out hover:-translate-y-1.5 h-full flex flex-col"
      style={{
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.imageUrl || event.image || '/logo.svg'}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-surface-base) 0%, rgba(0,0,0,0.05) 45%, transparent 70%)' }} />
        <div className="absolute left-5 top-5">{badge}</div>
        {hasAlerts && (
          <div className="absolute right-5 top-5">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold text-white" style={{ boxShadow: '0 2px 8px rgba(239,68,68,0.3)' }}>
              <span className="material-symbols-outlined text-[11px]">warning</span>
              Alert
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
          <span className="font-semibold text-on-surface">{event.organizer}</span>
          <span className="opacity-40">•</span>
          <span>{event.distance}</span>
        </div>

        <div className="space-y-2.5 flex-1">
          <h3 ref={titleRef} className="text-xl font-semibold text-on-surface leading-tight tracking-tight">{event.title}</h3>
          <p
            className="overflow-hidden text-sm leading-relaxed text-on-surface-variant"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: descriptionLineClamp,
            }}
          >
            {event.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl p-3.5 text-sm text-on-surface-variant" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
            <div className="font-semibold text-on-surface mb-2 text-xs uppercase tracking-wider">Goal Progress</div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-surface-variant-base)' }}>
              <div className="h-full rounded-full transition-all duration-700 ease-out progress-glow" style={{ width: `${event.progress}%`, background: 'linear-gradient(90deg, var(--color-primary-base), var(--color-sage))' }} />
            </div>
            <div className="mt-1.5 text-xs font-medium">{event.progress ?? 0}% complete</div>
          </div>
          <div className="rounded-xl p-3.5 text-sm text-on-surface-variant" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
            <div className="font-semibold text-on-surface mb-2 text-xs uppercase tracking-wider">Needs</div>
            <div className="flex flex-wrap gap-1.5">
              {event.needs?.goods && <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: 'rgba(194,113,91,0.12)', color: 'var(--color-terracotta)' }}>Goods</span>}
              {event.needs?.volunteers && <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: 'rgba(59,107,74,0.12)', color: 'var(--color-primary-base)' }}>Volunteers</span>}
              {event.needs?.funds && <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: 'rgba(139,109,46,0.12)', color: 'var(--color-tertiary-base)' }}>Funds</span>}
              {!event.needs && <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: 'var(--glass-bg)' }}>Needs review</span>}
            </div>
          </div>
        </div>

        <Link
          href={`/event/${event.id}`}
          className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-on-primary transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-base) 0%, var(--color-moss) 100%)',
            boxShadow: '0 4px 14px rgba(59, 107, 74, 0.25), 0 1px 3px rgba(59, 107, 74, 0.1)',
          }}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
