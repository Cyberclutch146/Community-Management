'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { subscribeToMessages, sendMessage } from '@/services/chatService';
import { ChatMessage } from '@/types';

interface ChatBoxProps {
  eventId: string;
}

export function ChatBox({ eventId }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [debugError, setDebugError] = useState<string | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToMessages(eventId, (newMessages) => {
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, [eventId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setDebugError(null);
    
    if (!inputText.trim()) {
      setDebugError("Input is empty.");
      return;
    }
    if (!user) {
      setDebugError("User not logged in.");
      return;
    }
    if (isSending) {
      setDebugError("Already sending...");
      return;
    }

    setIsSending(true);
    try {
      const senderName = profile?.displayName || user.displayName || user.email?.split('@')[0] || 'Community Member';
      await sendMessage(eventId, user.uid, senderName, inputText.trim());
      setInputText('');
    } catch (err: any) {
      console.error("Error sending message:", err);
      setDebugError(err.message || "Unknown error sending message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-surface-bright rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col h-[500px]">
      <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low rounded-t-2xl flex justify-between items-center">
        <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">chat</span>
          Community Chat
        </h3>
        <div className="text-xs text-outline">
          Debug: {user ? 'Auth OK' : 'No Auth'} | {profile ? 'Profile OK' : 'No Profile'} | {isSending ? 'Sending' : 'Ready'}
        </div>
      </div>
      
      {debugError && (
        <div className="bg-error/10 text-error text-sm p-3 border-b border-error/20 font-medium">
          Error: {debugError}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(msg => {
          const isMe = user && msg.userId === user.uid;
          const timestampStr = msg.createdAt?.seconds 
            ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : 'Just now';
            
          return (
            <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-surface-variant flex-shrink-0 flex items-center justify-center text-sm font-bold text-secondary">
                  {msg.userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1 mx-1">
                  <span className="text-xs font-semibold text-secondary">{isMe ? 'You' : msg.userName}</span>
                  <span className="text-[10px] text-outline">{timestampStr}</span>
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
          disabled={isSending}
          className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface placeholder:text-outline disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={!inputText.trim() || isSending}
          className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary-container hover:text-on-primary-container"
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
          )}
        </button>
      </form>
    </div>
  );
}
