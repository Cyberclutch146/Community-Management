'use client';

import { EventNeeds } from '@/types';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateDonation, addVolunteerSignup } from '@/services/eventService';

interface DonationPanelProps {
  eventId: string;
  needs: EventNeeds;
}

export function DonationPanel({ eventId, needs }: DonationPanelProps) {
  const { user, profile } = useAuth();
  const [pledged, setPledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'funds' | 'volunteers' | 'goods'>(
    needs.funds ? 'funds' : needs.volunteers ? 'volunteers' : 'goods'
  );

  const handleDonate = async () => {
    if (!user || loading) return;
    setLoading(true);
    try {
      // simulate donating $10
      await updateDonation(eventId, needs.funds?.current || 0, 10);
      setPledged(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVolunteer = async () => {
    if (!user || !profile || loading) return;
    setLoading(true);
    try {
      await addVolunteerSignup(eventId, user.uid, profile.displayName || 'Anonymous', needs.volunteers?.current || 0);
      setPledged(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-bright rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/30 sticky top-24">
      <h3 className="font-headline text-xl font-bold text-on-surface mb-6">How You Can Help</h3>
      
      <div className="flex gap-2 mb-6 border-b border-outline-variant/30 pb-2">
        {needs.funds && (
          <button 
            onClick={() => setActiveTab('funds')}
            className={`pb-2 px-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'funds' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
          >
            Donate Funds
          </button>
        )}
        {needs.volunteers && (
          <button 
            onClick={() => setActiveTab('volunteers')}
            className={`pb-2 px-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'volunteers' ? 'border-tertiary text-tertiary' : 'border-transparent text-secondary hover:text-on-surface'}`}
          >
            Volunteer Time
          </button>
        )}
        {needs.goods && (
          <button 
            onClick={() => setActiveTab('goods')}
            className={`pb-2 px-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'goods' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
          >
            Contribute Goods
          </button>
        )}
      </div>

      {activeTab === 'funds' && needs.funds && (
        <div className="animate-fade-in text-center">
          <p className="text-on-surface-variant text-sm flex mb-6 text-left">
            Your donation goes directly to the organizer to fulfill the goals of this event.
          </p>
          {!pledged ? (
            <button 
              onClick={handleDonate}
              disabled={loading || !user}
              className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold shadow hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : user ? 'Donate $10 Now' : 'Sign in to Donate'}
            </button>
          ) : (
            <div className="bg-primary-fixed text-on-primary-fixed p-4 rounded-xl flex items-center justify-center gap-2 font-semibold">
              <span className="material-symbols-outlined">check_circle</span>
              Thank you for your donation!
            </div>
          )}
        </div>
      )}

      {activeTab === 'volunteers' && needs.volunteers && (
        <div className="animate-fade-in">
          <p className="text-on-surface-variant text-sm mb-6">
            Sign up for a shift. The organizer will contact you with details and waivers if necessary.
          </p>
          {!pledged ? (
            <button 
              onClick={handleVolunteer}
              disabled={loading || !user}
              className="w-full bg-tertiary text-on-tertiary py-3.5 rounded-xl font-bold shadow hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : user ? 'Sign Up to Volunteer' : 'Sign in to Volunteer'}
            </button>
          ) : (
            <div className="bg-tertiary-fixed text-on-tertiary-fixed p-4 rounded-xl flex items-center justify-center gap-2 font-semibold">
              <span className="material-symbols-outlined">how_to_reg</span>
              You are signed up!
            </div>
          )}
        </div>
      )}

      {activeTab === 'goods' && needs.goods && (
        <div className="animate-fade-in">
          <p className="text-on-surface-variant text-sm mb-4">
            We are looking for these specific items in new or gently used condition:
          </p>
          <ul className="list-disc pl-5 mb-6 text-sm text-on-surface font-medium space-y-1">
            {needs.goods.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          {!pledged ? (
            <button 
              onClick={() => setPledged(true)}
              className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-colors active:scale-[0.98]"
            >
              I Can Bring Something
            </button>
          ) : (
            <div className="bg-surface-variant text-on-surface-variant p-4 rounded-xl flex items-center justify-center gap-2 font-semibold border border-outline-variant/50">
              <span className="material-symbols-outlined">inventory_2</span>
              Drop-off info sent
            </div>
          )}
        </div>
      )}
    </div>
  );
}
