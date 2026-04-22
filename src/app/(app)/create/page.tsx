'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/services/eventService';
import { uploadImage } from '@/services/storageService';

export default function CreateEventPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Urgent Needs');
  const [distance, setDistance] = useState('Local');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1593113565694-c6ccdd8dcb15?q=80&w=2669&auto=format&fit=crop');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [needFunds, setNeedFunds] = useState(false);
  const [fundGoal, setFundGoal] = useState(1000);
  
  const [needVols, setNeedVols] = useState(false);
  const [volGoal, setVolGoal] = useState(10);
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || loading) return;
    
    setLoading(true);
    try {
      const newEventId = await createEvent({
        title,
        description,
        organizer: profile.displayName || 'Anonymous',
        organizerId: user.uid,
        location: profile.location || 'Unknown Location',
        distance,
        category,
        urgency: 'normal',
        imageUrl: image,
        needs: {
          ...(needFunds ? { funds: { goal: fundGoal, current: 0 } } : {}),
          ...(needVols ? { volunteers: { goal: volGoal, current: 0 } } : {})
        }
      });
      router.push(`/event/${newEventId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="mb-10">
        <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Create an Event</h2>
        <p className="text-secondary font-medium mt-2">Start a local response initiative to gather volunteers or necessary supplies.</p>
      </div>

      <div className="bg-surface-bright rounded-2xl p-8 border border-outline-variant/30">
        <p className="text-on-surface-variant mb-6 pb-6 border-b border-outline-variant/30">
          We believe in grassroots organizing. Share your vision and rally your community around local needs.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Event Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface" 
              placeholder="e.g. Neighborhood Cleanup" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Description</label>
            <textarea 
              required
              className="w-full h-32 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface resize-none" 
              placeholder="Describe the goal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-on-surface mb-2">Category</label>
              <select 
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Urgent Needs</option>
                <option>Food Drive</option>
                <option>Volunteers</option>
                <option>Community</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-on-surface mb-2">Event Image</label>
              <div className="flex items-center gap-4">
                <label className="bg-surface-container-low hover:bg-surface-container-high transition-colors border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface cursor-pointer flex-1 text-center font-medium flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  {uploadingImage ? 'Uploading...' : 'Choose File'}
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    disabled={uploadingImage}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingImage(true);
                      try {
                        const url = await uploadImage(file, 'campaigns');
                        setImage(url);
                      } catch(err) {
                        console.error('Failed to upload image', err);
                        alert('Failed to upload image. Please check permissions / rules.');
                      } finally {
                        setUploadingImage(false);
                      }
                    }}
                  />
                </label>
                {image && !image.includes('unsplash') && (
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden flex-shrink-0 border border-outline-variant/30">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Optional. Leave blank to use a default image.</p>
            </div>
          </div>

          <div className="border border-outline-variant/50 rounded-xl p-4 bg-surface-container-lowest">
            <div className="font-semibold text-sm mb-4">What do you need?</div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input type="checkbox" id="needFunds" checked={needFunds} onChange={(e) => setNeedFunds(e.target.checked)} className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary" />
                <label htmlFor="needFunds" className="text-sm font-medium">Funds</label>
                {needFunds && (
                  <input type="number" value={fundGoal} onChange={(e) => setFundGoal(Number(e.target.value))} placeholder="Goal ($)" className="ml-auto w-32 bg-surface-container border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm" />
                )}
              </div>
              <div className="flex items-center gap-4">
                <input type="checkbox" id="needVols" checked={needVols} onChange={(e) => setNeedVols(e.target.checked)} className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary" />
                <label htmlFor="needVols" className="text-sm font-medium">Volunteers</label>
                {needVols && (
                  <input type="number" value={volGoal} onChange={(e) => setVolGoal(Number(e.target.value))} placeholder="Goal (people)" className="ml-auto w-32 bg-surface-container border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm" />
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !user} 
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            {loading ? 'Publishing...' : user ? 'Publish Event' : 'Sign in to publish'}
          </button>
        </form>
      </div>
    </main>
  );
}
