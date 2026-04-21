"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreateEvent() {
  const [submitted, setSubmitted] = useState(false);
  const [eventName, setEventName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
        </div>
        <h2 className="font-headline text-3xl font-bold text-on-surface">Event Created!</h2>
        <p className="text-secondary leading-relaxed">
          &quot;{eventName || "Your Event"}&quot; has been published. People nearby can now discover and support your cause.
        </p>
        <div className="flex gap-3 w-full mt-4">
          <button className="btn-primary flex-1 justify-center" onClick={() => { setSubmitted(false); setEventName(""); }}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Another
          </button>
          <button className="btn-secondary flex-1 justify-center">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="font-headline text-4xl text-on-surface mb-2">Create New Event</h1>
        <p className="font-body text-on-surface-variant text-lg">Organize relief efforts and coordinate resources for your community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
        {/* Section: Basic Info */}
        <div className="space-y-6">
          <h2 className="font-headline text-xl text-primary border-b border-outline-variant/30 pb-2">Event Details</h2>
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="eventName">Event Name</label>
            <input 
              className="w-full bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-on-surface font-body" 
              id="eventName" 
              placeholder="e.g., Downtown Food Drive" 
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="eventDesc">Description</label>
            <textarea 
              className="w-full bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-on-surface font-body resize-none" 
              id="eventDesc" 
              placeholder="Describe the purpose and goals of this event..." 
              rows={4}
              required
            ></textarea>
          </div>
        </div>

        {/* Section: Location & Time */}
        <div className="space-y-6 pt-4">
          <h2 className="font-headline text-xl text-primary border-b border-outline-variant/30 pb-2">Location & Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="eventDate">Date</label>
              <input 
                className="w-full bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-on-surface font-body text-stone-500" 
                id="eventDate" 
                type="date"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="eventTime">Time</label>
              <input 
                className="w-full bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-on-surface font-body text-stone-500" 
                id="eventTime" 
                type="time"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Location</label>
            <div className="relative h-48 rounded-lg overflow-hidden border border-outline-variant/50 flex items-center justify-center bg-surface">
              {/* Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-outline-variant">
                 <span className="material-symbols-outlined text-6xl">map</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center bg-surface-container-lowest p-2 rounded-lg shadow-sm w-full max-w-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-stone-400 mr-2 text-[20px]">search</span>
                  <input className="bg-transparent border-none focus:ring-0 w-full text-sm font-body text-on-surface p-0 outline-none" placeholder="Search address..." type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Resources */}
        <div className="space-y-6 pt-4">
          <h2 className="font-headline text-xl text-primary border-b border-outline-variant/30 pb-2">Resource Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface p-4 rounded-lg border border-outline-variant/30 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <span className="material-symbols-outlined mt-1">group</span>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="volunteers">Volunteers Needed</label>
                <input 
                  className="w-full bg-surface-container-lowest rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-2 text-on-surface font-body" 
                  id="volunteers" 
                  min="0" 
                  placeholder="0" 
                  type="number"
                />
              </div>
            </div>
            <div className="bg-surface p-4 rounded-lg border border-outline-variant/30 flex items-start gap-4">
              <div className="bg-tertiary/10 p-3 rounded-full text-tertiary">
                <span className="material-symbols-outlined mt-1">volunteer_activism</span>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="funds">Target Funds ($)</label>
                <input 
                  className="w-full bg-surface-container-lowest rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-2 text-on-surface font-body" 
                  id="funds" 
                  min="0" 
                  placeholder="0.00" 
                  step="100" 
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 flex items-center justify-end gap-4 border-t border-outline-variant/30">
          <button 
            className="px-6 py-3 rounded-xl font-body font-semibold text-primary hover:bg-primary/5 transition-colors" 
            type="button"
          >
            Save Draft
          </button>
          <button 
            className="px-8 py-3 rounded-xl font-body font-semibold bg-primary text-on-primary shadow-sm hover:bg-primary/90 active:scale-95 transition-all" 
            type="submit"
          >
            Publish Event
          </button>
        </div>
      </form>
    </div>
  );
}
