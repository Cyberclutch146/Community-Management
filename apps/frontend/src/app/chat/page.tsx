"use client";

import { useState } from "react";
import Link from "next/link";

interface Channel {
  id: string;
  name: string;
  eventId?: string;
  lastMessage: string;
  time: string;
  unread: number;
  isUrgent?: boolean;
}

interface Message {
  id: string;
  user: string;
  initials: string;
  text: string;
  time: string;
  isSelf: boolean;
  isOrganizer?: boolean;
}

export default function CommunityChat() {
  const [activeChannel, setActiveChannel] = useState("1");
  const [showChannels, setShowChannels] = useState(false);

  const channels: Channel[] = [
    { id: "1", name: "Winter Shelter Restock", eventId: "1", lastMessage: "We still need about 10 more volunteers...", time: "10:40 AM", unread: 2, isUrgent: true },
    { id: "2", name: "Weekly Pantry", eventId: "2", lastMessage: "Great turnout this Tuesday!", time: "9:15 AM", unread: 0 },
    { id: "3", name: "Park Cleanup Crew", eventId: "3", lastMessage: "Tools have been delivered", time: "Yesterday", unread: 5 },
    { id: "4", name: "General", lastMessage: "Welcome to Kindred Relief!", time: "Mon", unread: 0 },
  ];

  const messages: Message[] = [
    { id: "1", user: "Jane Smith", initials: "JS", text: "I've just arrived at the staging area with the water cases. Where should I unload them?", time: "09:14 AM", isSelf: false },
    { id: "2", user: "Mark K.", initials: "MK", text: "Bring them around back by the blue tent, we have a pallet set up there.", time: "09:16 AM", isSelf: false },
    { id: "3", user: "Sarah Connor (Organizer)", initials: "SC", text: "**Update for everyone:** We are running low on size L gloves. If anyone is doing a supply run soon, please grab a box. Also, lunch will be served at 12:30 PM near the main entrance.", time: "09:30 AM", isSelf: true, isOrganizer: true },
    { id: "4", user: "Elena P.", initials: "EP", text: "I'm heading out now, I'll grab the gloves on my way back.", time: "09:45 AM", isSelf: false },
  ];

  const activeChannelData = channels.find(c => c.id === activeChannel);

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden absolute inset-0 z-10 bg-surface">
      {/* Channel list — sidebar on desktop, slide-over on mobile */}
      <div className={`${showChannels ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 border-r border-outline-variant/30 bg-surface-bright flex-shrink-0 absolute md:relative z-30 h-full`}>
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-on-surface">Channels</h3>
          <button
            onClick={() => setShowChannels(false)}
            className="md:hidden p-2 -mr-2 text-on-surface hover:bg-surface-container rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-4 border-b border-outline-variant/30">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full bg-surface-container pl-10 pr-4 py-2 text-sm rounded-full border border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder-outline"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto w-full">
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => { setActiveChannel(ch.id); setShowChannels(false); }}
              className={`w-full text-left flex items-center gap-3 p-4 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${activeChannel === ch.id ? 'bg-primary-container/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${ch.isUrgent ? 'bg-error-container text-error' : 'bg-surface-container-high text-on-surface'}`}>
                {ch.isUrgent ? (
                  <span className="material-symbols-outlined text-[20px]">emergency</span>
                ) : (
                  <span className="material-symbols-outlined text-[20px]">forum</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm truncate ${activeChannel === ch.id ? 'font-bold text-primary' : 'font-bold text-on-surface'}`}>
                    {ch.name}
                  </p>
                  <span className="text-[10px] text-outline flex-shrink-0 font-medium">{ch.time}</span>
                </div>
                <p className="text-xs text-secondary truncate mt-0.5">{ch.lastMessage}</p>
              </div>
              {ch.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">{ch.unread}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-surface">
        {/* Chat Header */}
        <div className="px-4 md:px-8 py-4 md:py-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChannels(true)}
              className="md:hidden p-2 -ml-2 text-on-surface hover:bg-surface-container rounded-full"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="min-w-0">
              <h1 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-1 truncate">{activeChannelData?.name || 'Select a channel'}</h1>
              <div className="flex items-center gap-2 text-xs md:text-sm text-on-surface-variant whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px]">group</span>
                <span>42 Volunteers</span>
                <span className="mx-1 md:mx-2">•</span>
                <span className="material-symbols-outlined text-[16px] text-primary">circle</span>
                <span className="text-primary font-semibold">Active Event</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 ml-2">
            <button className="px-3 md:px-4 py-2 bg-surface text-primary border border-outline-variant rounded-full text-sm font-semibold hover:bg-surface-variant transition-colors flex items-center gap-1 md:gap-2">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span className="hidden sm:inline">Details</span>
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col">
          {/* Date Divider */}
          <div className="flex justify-center my-4">
            <span className="bg-surface-variant text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full">Today, Oct 12</span>
          </div>

          {messages.map((msg) => {
            if (msg.isOrganizer || msg.isSelf) {
              return (
                <div key={msg.id} className="flex gap-3 md:gap-4 max-w-3xl ml-auto">
                  <div className="flex flex-col items-end w-full">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs text-on-surface-variant">{msg.time}</span>
                      <span className="font-semibold text-primary">{msg.user}</span>
                    </div>
                    <div className="bg-primary-container p-3 md:p-4 rounded-2xl rounded-tr-sm shadow-sm text-on-primary-container text-sm md:text-base leading-relaxed border border-primary/20">
                      {msg.text.includes('**') ? (
                        <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold flex-shrink-0 text-sm md:text-base">
                    {msg.initials}
                  </div>
                </div>
              );
            }
            return (
              <div key={msg.id} className="flex gap-3 md:gap-4 max-w-3xl">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-headline font-bold flex-shrink-0 text-sm md:text-base ${
                  msg.id === '1' ? 'bg-secondary-container text-on-secondary-container' : 
                  msg.id === '2' ? 'bg-tertiary-container text-on-tertiary-container' : 
                  'bg-surface-variant text-on-surface-variant'
                }`}>
                  {msg.initials}
                </div>
                <div className="w-full">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-on-surface">{msg.user}</span>
                    <span className="text-xs text-on-surface-variant">{msg.time}</span>
                  </div>
                  <div className="bg-surface-container-lowest p-3 md:p-4 rounded-2xl rounded-tl-sm border border-outline-variant/20 shadow-sm text-on-surface text-sm md:text-base leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Area */}
        <div className="p-4 md:p-6 bg-surface-bright border-t border-outline-variant/30 flex-shrink-0 pb-safe pb-8 md:pb-6">
          <div className="max-w-4xl mx-auto flex items-end gap-2 md:gap-4">
            <button className="p-2 md:p-3 text-primary hover:bg-surface-container rounded-full transition-colors flex-shrink-0 mb-0.5 md:mb-1">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 resize-none p-3 md:p-4 text-on-surface placeholder:text-on-surface-variant text-sm md:text-base outline-none block" 
                placeholder="Type a message to the group..." 
                rows={2}
              ></textarea>
            </div>
            <button className="p-3 md:p-4 bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-colors shadow-sm flex-shrink-0 flex items-center justify-center mb-0.5 md:mb-1">
              <span className="material-symbols-outlined fill-current">send</span>
            </button>
          </div>
          <div className="text-center mt-2 hidden md:block">
            <span className="text-xs text-on-surface-variant">Press Enter to send, Shift + Enter for new line.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
