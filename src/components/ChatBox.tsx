'use client';

import { useState } from 'react';
import { Message, currentUser } from '@/data/mockData';

interface ChatBoxProps {
  initialMessages: Message[];
  eventId: string;
}

export function ChatBox({ initialMessages, eventId }: ChatBoxProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      eventId,
      userId: currentUser.id,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="bg-surface-bright rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col h-[500px]">
      <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low rounded-t-2xl">
        <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">chat</span>
          Community Chat
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(msg => {
          const isMe = msg.userId === currentUser.id;
          return (
            <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-surface-variant flex-shrink-0 flex items-center justify-center text-sm font-bold text-secondary">
                  U
                </div>
              )}
              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1 mx-1">
                  <span className="text-xs font-semibold text-secondary">{isMe ? 'You' : 'Volunteer'}</span>
                  <span className="text-[10px] text-outline">{msg.timestamp}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe 
                    ? 'bg-primary text-on-primary rounded-tr-sm' 
                    : 'bg-surface-container text-on-surface rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <form onSubmit={handleSend} className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest rounded-b-2xl flex gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question or offer help..." 
          className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface placeholder:text-outline"
        />
        <button 
          type="submit" 
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary-container hover:text-on-primary-container"
        >
          <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
        </button>
      </form>
    </div>
  );
}
