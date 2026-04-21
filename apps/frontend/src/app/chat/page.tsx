"use client";

import Link from "next/link";

// Community Chat
export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-primary">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=150"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="font-bold tracking-tight leading-tight">SF Tech Innovators</h1>
            <p className="text-[11px] text-green-500 font-medium">12 online</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-primary">
          <i className="fas fa-info-circle"></i>
        </button>
      </header>

      {/* Chat Area */}
      {/* Subtracting the BottomNav (h-20 approx) and Input Area to make scrolling correct. 
          Actually flex-1 will automatically fill space. */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f2f2f7] pb-4">
        {/* Date divider */}
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-gray-200/50 text-gray-500 rounded-full text-xs font-medium">
            Today
          </span>
        </div>

        {/* System Message */}
        <div className="flex justify-center">
          <span className="text-xs text-gray-500">Alex joined the community 👋</span>
        </div>

        {/* Received Message */}
        <div className="flex items-end gap-2 max-w-[85%]">
          <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full mb-1" />
          <div>
            <div className="text-[10px] text-gray-500 mb-1 ml-3">Sarah • 10:42 AM</div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 text-sm">
              Are we still on for the pitch prep session tonight?
            </div>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex items-end gap-2 max-w-[85%] ml-auto justify-end">
          <div>
            <div className="text-[10px] text-gray-500 mb-1 mr-3 text-right">You • 10:45 AM</div>
            <div className="bg-accent text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-sm text-sm">
              Yes! I've booked conference room B for us. See you at 6?
            </div>
          </div>
        </div>

        {/* Received Message with attachment */}
        <div className="flex items-end gap-2 max-w-[85%]">
          <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full mb-1" />
          <div>
            <div className="text-[10px] text-gray-500 mb-1 ml-3">Sarah • 10:48 AM</div>
            <div className="bg-white p-2 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
                className="w-48 h-32 object-cover rounded-xl mb-2"
              />
              <div className="text-sm px-2 pb-1">Perfect, I'll bring the new slide deck.</div>
            </div>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 z-50 relative pb-[env(safe-area-inset-bottom)] md:pb-4">
        <div className="flex items-end gap-3 bg-surface p-2 rounded-3xl border border-gray-200">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-primary transition flex-shrink-0">
            <i className="fas fa-plus"></i>
          </button>
          <textarea
            placeholder="Message SF Tech Innovators..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2.5 text-sm outline-none max-h-32"
            style={{ minHeight: "40px" }}
          ></textarea>
          <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-blue-600 transition shadow-sm flex-shrink-0">
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
