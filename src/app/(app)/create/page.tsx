'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/services/eventService';
import { uploadImage } from '@/services/storageService';
import { toast } from 'sonner';
import LocationPickerWrapper from '@/components/LocationPickerWrapper';
import DateTimePicker from '@/components/DateTimePicker';
import PromotionModal from '@/components/PromotionModal';

export default function CreateEventPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Urgent Needs');
  const [distance, setDistance] = useState('Local');
  const [image, setImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [urgency, setUrgency] = useState<'high' | 'normal'>('normal');
  
  const [needFunds, setNeedFunds] = useState(false);
  const [fundGoal, setFundGoal] = useState(1000);
  
  const [needVols, setNeedVols] = useState(false);
  const [volGoal, setVolGoal] = useState(10);
  
  const [needGoods, setNeedGoods] = useState(false);
  const [goodsItem, setGoodsItem] = useState('');
  const [goodsList, setGoodsList] = useState<string[]>([]);
  
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  
  const [loading, setLoading] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);

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
        location: locationName || profile.location || 'Unknown Location',
        lat,
        lng,
        distance,
        category,
        urgency,
        imageUrl: image,
        eventDate,
        needs: {
          ...(needFunds ? { funds: { goal: fundGoal, current: 0 } } : {}),
          ...(needVols ? { volunteers: { goal: volGoal, current: 0 } } : {}),
          ...(needGoods && goodsList.length > 0 ? { goods: goodsList } : {})
        }
      });
      toast.success('Event published successfully!');
      router.push(`/event/${newEventId}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create event. Please try again.');
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-on-surface">Description</label>
              <button 
                type="button" 
                onClick={async () => {
                  if (!title) {
                    toast.error('Please enter a title first to generate a description.');
                    return;
                  }
                  setGeneratingAi(true);
                  try {
                    const res = await fetch('/api/generate-description', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title, category }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setDescription(data.description);
                      toast.success('Description generated!');
                    } else {
                      toast.error(data.error || 'Failed to generate description');
                    }
                  } catch (err) {
                    toast.error('An error occurred while generating.');
                  } finally {
                    setGeneratingAi(false);
                  }
                }}
                disabled={generatingAi}
                className="text-xs flex items-center gap-1 font-bold text-primary hover:text-primary-container transition-colors disabled:opacity-50"
              >
                {generatingAi ? (
                  <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                )}
                {generatingAi ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
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
              <label className="block text-sm font-semibold text-on-surface mb-2">Urgency Level</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setUrgency('normal')}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${urgency === 'normal' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface border border-outline-variant/50'}`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('high')}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${urgency === 'high' ? 'bg-error text-on-error' : 'bg-surface-container-low text-on-surface border border-outline-variant/50'}`}
                >
                  High
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-on-surface mb-2">Event Date & Time</label>
              <DateTimePicker 
                value={eventDate}
                onChange={(val) => setEventDate(val)}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-on-surface">Event Image</label>
                <button 
                  type="button" 
                  onClick={async () => {
                    if (!title) {
                      toast.error('Please enter a title first to generate an image.');
                      return;
                    }
                    setGeneratingImage(true);
                    try {
                      toast.info('Generating image with AI...');
                      const prompt = `A high-quality, inspiring cover photo for a community event named: ${title}. ${category}. Beautiful lighting, realistic, no text.`;
                      
                      const response = await fetch('/api/generate-image', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt }),
                      });
                      
                      if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to fetch AI image');
                      }
                      
                      const blob = await response.blob();
                      const file = new File([blob], "ai-generated-event.jpg", { type: "image/jpeg" });
                      
                      const url = await uploadImage(file, 'campaigns');
                      setImage(url);
                      toast.success('AI Image generated successfully!');
                    } catch (err) {
                      console.error(err);
                      toast.error('Failed to generate image. Please try again.');
                    } finally {
                      setGeneratingImage(false);
                    }
                  }}
                  disabled={generatingImage || uploadingImage}
                  className="text-xs flex items-center gap-1 font-bold text-primary hover:text-primary-container transition-colors disabled:opacity-50"
                >
                  {generatingImage ? (
                    <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">image</span>
                  )}
                  {generatingImage ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>
              <div className="flex items-center gap-4">
                <label className={`bg-surface-container-low hover:bg-surface-container-high transition-colors border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface ${generatingImage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} flex-1 text-center font-medium flex items-center justify-center gap-2`}>
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  {uploadingImage ? 'Uploading...' : 'Choose File'}
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    disabled={uploadingImage || generatingImage}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingImage(true);
                      try {
                        const url = await uploadImage(file, 'campaigns');
                        setImage(url);
                      } catch(err) {
                        console.error('Failed to upload image', err);
                        toast.error('Failed to upload image. Please check permissions.');
                      } finally {
                        setUploadingImage(false);
                      }
                    }}
                  />
                </label>
                {image && (
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden flex-shrink-0 border border-outline-variant/30">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Optional. Leave blank to use a default image.</p>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-6">
            <label className="block text-sm font-semibold text-on-surface mb-2">Event Location</label>
            <p className="text-xs text-on-surface-variant mb-4">Search for an address or click on the map to set the exact location.</p>
            <LocationPickerWrapper 
              onLocationSelect={(loc) => {
                setLocationName(loc.name);
                setLat(loc.lat);
                setLng(loc.lng);
              }}
            />
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
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <input type="checkbox" id="needGoods" checked={needGoods} onChange={(e) => setNeedGoods(e.target.checked)} className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary" />
                  <label htmlFor="needGoods" className="text-sm font-medium">Specific Goods</label>
                </div>
                {needGoods && (
                  <div className="pl-9 space-y-3">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={goodsItem} 
                        onChange={(e) => setGoodsItem(e.target.value)} 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (goodsItem.trim()) {
                              setGoodsList([...goodsList, goodsItem.trim()]);
                              setGoodsItem('');
                            }
                          }
                        }}
                        placeholder="Add an item (e.g. Blankets) and press Enter" 
                        className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (goodsItem.trim()) {
                            setGoodsList([...goodsList, goodsItem.trim()]);
                            setGoodsItem('');
                          }
                        }}
                        className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-bold"
                      >
                        Add
                      </button>
                    </div>
                    {goodsList.length > 0 && (
                      <ul className="space-y-2">
                        {goodsList.map((item, index) => (
                          <li key={index} className="flex justify-between items-center bg-surface-container-high px-3 py-2 rounded-lg text-sm">
                            <span>{item}</span>
                            <button 
                              type="button" 
                              onClick={() => setGoodsList(goodsList.filter((_, i) => i !== index))}
                              className="text-error hover:bg-error/10 p-1 rounded-md"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              type="submit" 
              disabled={loading || !user} 
              className="flex-1 bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              {loading ? 'Publishing...' : user ? 'Publish Event' : 'Sign in to publish'}
            </button>
            
            <button 
              type="button"
              onClick={() => setPromotionModalOpen(true)}
              className="flex-1 bg-surface-container-high text-on-surface px-8 py-3 rounded-xl font-semibold border border-outline-variant/50 hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              Promote Event
            </button>
          </div>
        </form>
      </div>

      <PromotionModal 
        isOpen={promotionModalOpen} 
        onClose={() => setPromotionModalOpen(false)} 
      />
    </main>
  );
}
