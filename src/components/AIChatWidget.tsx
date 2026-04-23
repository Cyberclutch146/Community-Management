"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Add a greeting if opening for the first time
    if (!isOpen && messages.length === 0) {
      setMessages([
        { role: 'assistant', content: 'Hi there! I am the Kindred Relief Network AI assistant. How can I help you today?' }
      ]);
    }
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
      // Primary: Next.js API Route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get a response');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: error.message || 'Sorry, I am having trouble connecting right now. Please try again later.' 
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
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-4 rounded-full bg-primary text-on-primary shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[calc(100vw-32px)] md:w-96 h-[500px] max-h-[calc(100vh-120px)] bg-surface rounded-2xl shadow-2xl border border-outline-variant flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-semibold">Kindred AI Assistant</h3>
              </div>
              <button onClick={toggleChat} className="text-on-primary/80 hover:text-on-primary">
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
                  <div className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-on-primary rounded-tr-sm' 
                      : 'bg-surface-container text-on-surface rounded-tl-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container text-on-surface rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Typing...</span>
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
                placeholder="Ask me anything..."
                className="flex-1 bg-surface-container-lowest border border-outline rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary text-on-surface"
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
