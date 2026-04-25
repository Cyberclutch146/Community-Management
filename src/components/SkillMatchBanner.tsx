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
        <div className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-gradient-to-br from-primary/5 via-surface-container to-tertiary/5 p-5 md:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserPlus size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface text-sm">Get personalized recommendations</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Add skills to your profile and we&apos;ll match you with events that need your expertise.
              </p>
            </div>
            <Link
              href="/profile"
              className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 flex-shrink-0"
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
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
            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
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
                className={`block ${condensed ? 'w-64' : 'w-72'} rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
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
                    <div className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm flex items-center gap-1">
                      <Sparkles size={10} className="text-amber-400" />
                      <span className="text-[10px] font-bold text-white">{matchPercent}% match</span>
                    </div>
                  </div>
                  {/* Urgency Badge */}
                  {event.urgency === 'high' && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider">
                        Urgent
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
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
                        className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize"
                      >
                        {skill}
                      </span>
                    ))}
                    {matchedSkills.length > 2 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
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
