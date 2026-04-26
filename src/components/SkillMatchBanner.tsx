'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getEvents } from '@/services/eventService';
import { getRecommendedEvents, getMatchPercentage } from '@/services/recommendationService';
import { CommunityEvent } from '@/types';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SkillMatchBannerProps {
  condensed?: boolean;
}

export default function SkillMatchBanner({ condensed = false }: SkillMatchBannerProps) {
  const { user, profile } = useAuth();
  const [recommendations, setRecommendations] = useState<
    Array<{ event: CommunityEvent; score: number; matchedSkills: string[] }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!profile?.skills || profile.skills.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const result = await getEvents(50);
        const recommended = getRecommendedEvents(profile.skills, result.events, condensed ? 3 : 5);
        setRecommendations(recommended);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [profile?.skills, condensed]);

  // Don't render while loading or if user isn't logged in
  if (loading || !user) return null;

  // No skills set — show CTA
  if (!profile?.skills || profile.skills.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-8"
      >
        <div
          className="relative overflow-hidden rounded-2xl p-5 md:p-6"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px) saturate(1.3)',
            border: '1px solid rgba(212, 168, 82, 0.25)',
            boxShadow: '0 4px 20px rgba(212, 168, 82, 0.08)',
          }}
        >
          {/* Warm ambient gradient */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(59,107,74,0.04), transparent, rgba(139,109,46,0.04))' }} />
          <div className="relative flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 168, 82, 0.15), rgba(139, 109, 46, 0.1))',
              }}
            >
              <UserPlus size={20} className="text-[var(--color-warm-amber)]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface text-sm">Get personalized recommendations</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Add skills to your profile and we&apos;ll match you with events that need your expertise.
              </p>
            </div>
            <Link
              href="/profile"
              className="text-xs font-bold text-[var(--color-warm-amber)] hover:text-[var(--color-earth-gold)] transition-colors flex items-center gap-1 flex-shrink-0"
            >
              Add Skills
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // No recommendations found
  if (recommendations.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 md:mb-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-warm-amber), var(--color-earth-gold))',
              boxShadow: '0 3px 10px rgba(212, 168, 82, 0.3)',
            }}
          >
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-headline text-base md:text-lg font-bold text-on-surface">
              Recommended for You
            </h3>
            {!condensed && (
              <p className="text-xs text-on-surface-variant">
                Based on your skills: {profile.skills.slice(0, 3).join(', ')}
                {profile.skills.length > 3 ? ` +${profile.skills.length - 3} more` : ''}
              </p>
            )}
          </div>
        </div>
        {condensed && (
          <Link
            href="/feed"
            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Scrollable Event Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {recommendations.map(({ event, score, matchedSkills }, index) => {
          const matchPercent = getMatchPercentage(score);
          const imageUrl = event.imageUrl || event.image || '/logo.svg';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex-shrink-0"
            >
              <Link
                href={`/event/${event.id}`}
                className={`block ${condensed ? 'w-64' : 'w-72'} rounded-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-1`}
                style={{
                  background: 'var(--glass-bg-strong)',
                  backdropFilter: 'blur(16px) saturate(1.3)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                }}
              >
                {/* Image */}
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Match Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <div
                      className="px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,168,82,0.9), rgba(196,155,58,0.9))',
                        boxShadow: '0 2px 8px rgba(212,168,82,0.3)',
                      }}
                    >
                      <Sparkles size={10} className="text-white" />
                      <span className="text-[10px] font-bold text-white">{matchPercent}% match</span>
                    </div>
                  </div>
                  {/* Urgency Badge */}
                  {event.urgency === 'high' && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider" style={{ boxShadow: '0 2px 6px rgba(239,68,68,0.3)' }}>
                        Urgent
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-base)' }}>
                    {event.category}
                  </span>
                  <h4 className="font-semibold text-on-surface text-sm mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Matched Skills */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {matchedSkills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
                        style={{
                          background: 'rgba(59, 107, 74, 0.1)',
                          color: 'var(--color-primary-base)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {matchedSkills.length > 2 && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'var(--glass-bg)', color: 'var(--color-on-surface-variant-base)' }}
                      >
                        +{matchedSkills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
