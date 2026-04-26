'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getEvents } from '@/services/eventService';
import { getRecommendedEvents, getMatchPercentage } from '@/services/recommendationService';
import { CommunityEvent } from '@/types';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, UserPlus, Flame } from 'lucide-react';
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
        const recommended = getRecommendedEvents(profile.skills, result.events, condensed ? 4 : 6);
        setRecommendations(recommended);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [profile?.skills, condensed]);

  if (loading || !user) return null;

  // No skills set — show clean CTA
  if (!profile?.skills || profile.skills.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface">Unlock Personalized Matches</h3>
              <p className="text-sm text-on-surface-variant mt-1">Add skills to your profile to see events that need your exact expertise.</p>
            </div>
          </div>
          <Link
            href="/profile"
            className="shrink-0 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2"
          >
            Add Skills
            <ArrowRight size={16} />
          </Link>
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
      transition={{ duration: 0.5 }}
      className="mb-8 md:mb-12"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-primary" />
            <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
              Recommended for You
            </h3>
          </div>
          {!condensed && (
            <p className="text-sm text-on-surface-variant">
              Because you're skilled in <span className="font-semibold text-primary">{profile.skills.slice(0, 2).join(', ')}</span>
              {profile.skills.length > 2 ? ` and ${profile.skills.length - 2} more` : ''}
            </p>
          )}
        </div>
        {condensed && (
          <Link
            href="/feed"
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            See all
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Scrollable Event Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
        {recommendations.map(({ event, score, matchedSkills }, index) => {
          const matchPercent = getMatchPercentage(score);
          const imageUrl = event.imageUrl || event.image || '/logo.svg';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className="flex-shrink-0 snap-start"
            >
              <Link
                href={`/event/${event.id}`}
                className={`block ${condensed ? 'w-[280px]' : 'w-[320px]'} bg-surface-bright rounded-[24px] overflow-hidden border border-outline-variant/30 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md`}
              >
                {/* Image Area */}
                <div className="relative h-40 w-full overflow-hidden bg-surface-container">
                  <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {event.urgency === 'high' ? (
                      <span className="px-2.5 py-1 rounded-full bg-error text-on-error text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                        <Flame size={12} /> Urgent
                      </span>
                    ) : (
                      <div /> // Spacer
                    )}
                    
                    <div className="px-2.5 py-1 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center gap-1 shadow-sm backdrop-blur-md">
                      <Sparkles size={12} />
                      {matchPercent}% Match
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <h4 className="font-headline font-bold text-on-surface text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Matched Skills */}
                  <div className="mt-4 pt-4 border-t border-outline-variant/20">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">Why it's a match</p>
                    <div className="flex flex-wrap gap-1.5">
                      {matchedSkills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium capitalize"
                        >
                          {skill}
                        </span>
                      ))}
                      {matchedSkills.length > 3 && (
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                          +{matchedSkills.length - 3}
                        </span>
                      )}
                    </div>
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
