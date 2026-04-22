'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (name: string, email: string) => Promise<void>;
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventTime: string;
  enrolledCount: number;
}

export function VolunteerModal({ 
  isOpen, 
  onClose, 
  onRegister, 
  eventTitle,
  eventDescription,
  eventLocation,
  eventTime,
  enrolledCount
}: VolunteerModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: ''
  });
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.otp) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await onRegister(formData.name, formData.email);
      const randomId = Math.random().toString(36).substring(2, 12).toUpperCase();
      setTicketId(randomId);
      setStep('success');
      toast.success('Successfully registered!');
    } catch (err) {
      console.error(err);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error('Please enter your email first');
      return;
    }
    setSendingOtp(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`OTP sent to ${formData.email}`);
    } catch (err) {
      toast.error('Failed to send OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketId)}`;

  const calendarUrl = (() => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(`Volunteer: ${eventTitle}`);
    const details = encodeURIComponent(eventDescription);
    const location = encodeURIComponent(eventLocation);
    const startDate = new Date().toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dates = `${startDate}/${endDate}`;
    return `${baseUrl}&text=${text}&details=${details}&location=${location}&dates=${dates}`;
  })();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-surface-bright w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-2xl font-bold text-on-surface">
              {step === 'form' ? 'Volunteer Registration' : 'Registration Complete'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-surface-variant rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {step === 'form' ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-secondary mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-secondary mb-2" htmlFor="email">
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    id="email"
                    type="email"
                    required
                    className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !formData.email}
                    className="whitespace-nowrap px-4 bg-secondary text-on-secondary rounded-xl font-bold text-xs hover:opacity-90 transition-all disabled:opacity-50 active:scale-95"
                  >
                    {sendingOtp ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-secondary mb-2" htmlFor="otp">
                  OTP Verification
                </label>
                <input
                  id="otp"
                  type="text"
                  required
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register as Volunteer'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-primary-fixed text-on-primary-fixed p-4 rounded-full">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-on-surface mb-2">My Ticket</h3>
              <p className="text-on-surface-variant text-sm mb-4">
                Thank you for volunteering for <br />
                <span className="font-bold text-primary">{eventTitle}</span>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 text-left">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Enrolled</span>
                  <span className="text-lg font-bold text-on-surface">{enrolledCount + 1} People</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Event Time</span>
                  <span className="text-sm font-bold text-on-surface line-clamp-2 leading-tight">{eventTime}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl inline-block shadow-md mb-6 border border-outline-variant/30">
                <img src={qrUrl} alt="Ticket QR Code" className="w-40 h-40" />
                <div className="mt-3 font-mono text-sm font-bold text-secondary tracking-widest uppercase mb-3">
                  {ticketId}
                </div>
                <a 
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-[10px] font-bold text-primary transition-colors border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                  ADD TO CALENDAR
                </a>
              </div>

              <div className="space-y-3">
                <a 
                  href={qrUrl} 
                  download={`ticket-${ticketId}.png`}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold shadow hover:bg-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download Ticket
                </a>

                <a 
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-surface-container-high text-on-surface py-3.5 rounded-xl font-bold hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">calendar_add_on</span>
                  Add to Google Calendar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
