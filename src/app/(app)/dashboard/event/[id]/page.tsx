'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getEventById, getEventVolunteers, updateVolunteerStatus, EventVolunteer, deleteEvent, ADMIN_EMAIL } from '@/services/eventService';
import { CommunityEvent } from '@/types';
import { ArrowLeft, Users, Download, Calendar, Mail, CheckCircle, Circle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OrganizerEventPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [volunteers, setVolunteers] = useState<EventVolunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const [eventData, volunteerData] = await Promise.all([
          getEventById(eventId),
          getEventVolunteers(eventId)
        ]);

        if (eventData?.organizerId !== user.uid && user.email !== ADMIN_EMAIL) {
          toast.error('You do not have permission to view this event.');
          router.push('/dashboard');
          return;
        }

        setEvent(eventData);
        setVolunteers(volunteerData);
      } catch (err) {
        console.error('Failed to load event data:', err);
        toast.error('Could not load event data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [eventId, user, router]);

  const handleToggleAttendance = async (volunteerId: string, currentStatus: boolean | undefined) => {
    try {
      const newStatus = !currentStatus;
      await updateVolunteerStatus(eventId, volunteerId, newStatus);
      setVolunteers(prev => 
        prev.map(v => v.id === volunteerId ? { ...v, attended: newStatus } : v)
      );
      toast.success(`Volunteer marked as ${newStatus ? 'attended' : 'not attended'}.`);
    } catch (error) {
      console.error('Failed to update attendance:', error);
      toast.error('Failed to update attendance.');
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    
    try {
      await deleteEvent(eventId);
      toast.success('Event deleted successfully.');
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event.');
    }
  };

  const handleEmailAll = async () => {
    const emails = volunteers.map(v => v.userEmail).filter(Boolean);
    if (emails.length === 0) {
      toast.info('No email addresses available to contact.');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(emails.join(', '));
      toast.success('Emails copied to clipboard! Opening mail client...');
    } catch (err) {
      toast.success('Opening mail client...');
    }

    const subject = encodeURIComponent(`Update regarding ${event?.title || 'Community Event'}`);
    const mailtoLink = `mailto:?bcc=${emails.join(',')}&subject=${subject}`;
    
    // Fallback to simple location assignment
    window.location.href = mailtoLink;
  };

  const handleExportCSV = () => {
    if (volunteers.length === 0) {
      toast.info('No volunteers to export.');
      return;
    }

    const headers = ['Name', 'Email/ID', 'Signed Up Date'];
    const rows = volunteers.map(v => [
      v.userName,
      v.userEmail || v.userId,
      v.signedUpAt?.toDate?.()?.toLocaleDateString() || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `event_${eventId}_volunteers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Volunteer list exported successfully.');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f3d2b]"></div>
      </div>
    );
  }

  if (!event) return null;

  const currentVols = event.needs?.volunteers?.current || 0;
  const goalVols = event.needs?.volunteers?.goal || 1;
  const progress = Math.min(100, Math.round((currentVols / goalVols) * 100));

  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <button 
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#1f3d2b] mb-2">{event.title}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar size={16} />
            {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : (event.createdAt?.toDate?.()?.toLocaleDateString() || 'TBD')} • {event.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => router.push(`/dashboard/event/${eventId}/edit`)}
            className="bg-primary-container hover:bg-primary/20 text-on-primary-container px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Event
          </button>
          <button 
            onClick={handleEmailAll}
            className="bg-[#1f3d2b] hover:bg-[#1a3324] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Mail size={18} />
            Email All
          </button>
          <button 
            onClick={handleExportCSV}
            className="bg-[#e7e4de] hover:bg-[#dedbd5] text-[#1f3d2b] px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button 
            onClick={handleDeleteEvent}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm border border-red-100"
          >
            <Trash2 size={18} />
            Delete Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column: Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
              <Users size={20} className="text-[#1f3d2b]" />
              Volunteer Progress
            </h3>
            <div className="text-3xl font-bold text-[#1f3d2b] mb-2">
              {currentVols} <span className="text-sm font-normal text-gray-500">/ {goalVols}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1f3d2b] rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-[#1f3d2b]" />
              Checked In
            </h3>
            <div className="text-3xl font-bold text-[#1f3d2b] mb-2">
              {volunteers.filter(v => v.attended).length} <span className="text-sm font-normal text-gray-500">/ {volunteers.length}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1f3d2b] rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.round((volunteers.filter(v => v.attended).length / (volunteers.length || 1)) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Column: Volunteer List */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold">Volunteer Roster</h3>
              <span className="bg-[#1f3d2b]/10 text-[#1f3d2b] px-3 py-1 rounded-full text-sm font-medium">
                {volunteers.length} Signed Up
              </span>
            </div>
            
            {volunteers.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-20" />
                <p>No volunteers have signed up yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500">
                      <th className="px-6 py-4 font-medium">Volunteer Name</th>
                      <th className="px-6 py-4 font-medium">Signed Up</th>
                      <th className="px-6 py-4 font-medium text-center">Attended</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {volunteers.map(vol => (
                      <tr key={vol.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{vol.userName}</div>
                          <div className="text-sm text-gray-500 font-mono text-xs">{vol.userId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {vol.signedUpAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggleAttendance(vol.id, vol.attended)}
                            className={`p-2 rounded-lg transition-colors inline-block ${vol.attended ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                            title={vol.attended ? 'Mark as Not Attended' : 'Mark as Attended'}
                          >
                            {vol.attended ? <CheckCircle size={20} /> : <Circle size={20} />}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {vol.userEmail ? (
                            <a 
                              href={`mailto:${vol.userEmail}`}
                              className="text-[#1f3d2b] hover:bg-[#1f3d2b]/10 p-2 rounded-lg transition-colors inline-block"
                              title="Contact Volunteer"
                            >
                              <Mail size={18} />
                            </a>
                          ) : (
                            <button 
                              onClick={() => toast.info('No email provided for this volunteer.')}
                              className="text-gray-400 p-2 rounded-lg transition-colors inline-block cursor-not-allowed"
                              title="No Email Available"
                            >
                              <Mail size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
