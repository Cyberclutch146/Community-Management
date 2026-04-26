'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getEvents } from '@/services/eventService';
import { getRecommendedEvents } from '@/services/recommendationService';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SkillMatchBannerProps {
  condensed?: boolean;
}

export default function SkillMatchBanner({ condensed = false }: SkillMatchBannerProps) {
  const { user, profile } = useAuth();
  const [hasRecommendations, setHasRecommendations] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!profile?.skills || profile.skills.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const result = await getEvents(50);
        const recommended = getRecommendedEvents(profile.skills, result.events, 3, profile.equipment || []);
        setHasRecommendations(recommended.length > 0);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [profile?.skills]);

  if (loading || !user) return null;

  // No skills set — show clean CTA
  if (!profile?.skills || profile.skills.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={condensed ? 'mb-6' : 'mb-8'}
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

  if (!hasRecommendations) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={condensed ? 'mb-6' : 'mb-8'}
    >
      <div className="premium-glass-strong rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(59,107,74,0.12)' }}>
            <Sparkles size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface">Recommended for You</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              We found event matches based on <span className="font-semibold text-primary">{profile.skills.slice(0, 2).join(', ')}</span>
              {profile.skills.length > 2 ? ` and ${profile.skills.length - 2} more` : ''}.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
