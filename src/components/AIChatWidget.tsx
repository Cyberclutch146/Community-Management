"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  action?: {
    type: 'navigate' | 'signed_up' | 'confirm_signup' | 'search_results';
    url?: string;
    eventId?: string;
    eventTitle?: string;
    results?: Array<{ id: string; title: string; category: string; location: string }>;
  };
};

// Simple markdown-ish renderer: bold, line breaks
function renderMessageContent(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Split by newlines
    const lines = part.split('\n');
    return lines.map((line, j) => (
      <React.Fragment key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  });
}

export default function AIChatWidget() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingSignup, setPendingSignup] = useState<{ eventId: string; eventTitle: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Add a greeting if opening for the first time
    if (!isOpen && messages.length === 0) {
      const greeting = user && profile
        ? `Hi ${profile.displayName?.split(' ')[0] || 'there'}! 👋 I'm the Kindred Relief Network AI assistant. I can help you find events, sign you up to volunteer, and navigate the platform. What would you like to do?`
        : 'Hi there! 👋 I\'m the Kindred Relief Network AI assistant. How can I help you today?';
      setMessages([
        { role: 'assistant', content: greeting }
      ]);
    }
  };

  const handleNavigate = (url: string) => {
    router.push(url);
    setIsOpen(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: inputMessage.trim() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          userId: user?.uid || '',
          userName: profile?.displayName || 'Volunteer',
          userEmail: user?.email || '',
          userSkills: profile?.skills || [],
          pendingSignup: pendingSignup || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get a response');
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        action: data.action || undefined,
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Handle side effects from actions
      if (data.action?.type === 'confirm_signup') {
        setPendingSignup({
          eventId: data.action.eventId || '',
          eventTitle: data.action.eventTitle || '',
        });
      } else if (data.action?.type === 'signed_up') {
        setPendingSignup(null);
        toast.success(`🎉 You've been signed up for ${data.action.eventTitle}!`, {
          duration: 5000,
          action: {
            label: 'View Event',
            onClick: () => router.push(data.action.url),
          },
        });
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: error.message || 'Sorry, I\'m having trouble connecting right now. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 md:bottom-8 md:right-8 z-[60] p-4 rounded-full bg-primary text-on-primary shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 group"
        aria-label="Toggle AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 md:bottom-24 md:right-8 z-[60] w-[calc(100vw-32px)] md:w-[420px] h-[540px] max-h-[calc(100vh-7rem-env(safe-area-inset-bottom))] md:max-h-[calc(100vh-120px)] bg-surface rounded-2xl shadow-2xl border border-outline-variant flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <div>
                  <h3 className="font-semibold text-sm">Kindred AI Assistant</h3>
                  <div className="flex items-center gap-1 text-on-primary/70 text-[10px]">
                    <Sparkles size={10} />
                    <span>Can search, sign up & navigate</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleChat} className="text-on-primary/80 hover:text-on-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-on-primary rounded-tr-sm'
                      : 'bg-surface-container text-on-surface rounded-tl-sm'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {renderMessageContent(msg.content)}
                    </div>

                    {/* Action Buttons */}
                    {msg.action && (
                      <div className="mt-2 pt-2 border-t border-current/10">
                        {msg.action.type === 'navigate' && msg.action.url && (
                          <button
                            onClick={() => handleNavigate(msg.action!.url!)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink size={12} />
                            View Page
                          </button>
                        )}

                        {msg.action.type === 'signed_up' && (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                              <CheckCircle2 size={12} />
                              Signed up!
                            </span>
                            {msg.action.url && (
                              <button
                                onClick={() => handleNavigate(msg.action!.url!)}
                                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              >
                                <ExternalLink size={12} />
                                View Event
                              </button>
                            )}
                          </div>
                        )}

                        {msg.action.type === 'search_results' && msg.action.results && msg.action.results.length > 0 && (
                          <div className="space-y-1.5 mt-1">
                            {msg.action.results.slice(0, 3).map((r) => (
                              <button
                                key={r.id}
                                onClick={() => handleNavigate(`/event/${r.id}`)}
                                className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between group"
                              >
                                <div>
                                  <span className="font-medium">{r.title}</span>
                                  <span className="text-current/60 ml-1.5">• {r.category}</span>
                                </div>
                                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                        )}

                        {msg.action.type === 'confirm_signup' && (
                          <span className="inline-flex items-center gap-1 text-xs text-current/60 italic">
                            💬 Reply &quot;yes&quot; to confirm
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container text-on-surface rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-surface border-t border-outline-variant flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={user ? "Ask me anything..." : "Log in for full features..."}
                className="flex-1 bg-surface-container-lowest border border-outline rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-full bg-primary text-on-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
