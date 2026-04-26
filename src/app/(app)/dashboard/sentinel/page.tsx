'use client';

import { useState, useEffect } from 'react';
import { SentinelAlert } from '@/types/sentinel';
import SentinelAlertFeed from '@/components/SentinelAlertFeed';
import { Activity, Map as MapIcon, Loader2, ShieldAlert } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Use dynamic import for the map to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center rounded-xl" style={{ background: 'var(--glass-bg)' }}><Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--color-outline-base)' }} /></div> }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const SentinelMapOverlay = dynamic(
  () => import('@/components/SentinelMapOverlay'),
  { ssr: false }
);

export default function SentinelDashboardPage() {
  const [alerts, setAlerts] = useState<SentinelAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'map' | 'feed'>('map');

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch('/api/sentinel');
        if (res.ok) {
          const data = await res.json();
          setAlerts(data);
        }
      } catch (error) {
        console.error("Failed to fetch Sentinel data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
    
    // Poll every 5 minutes
    const interval = setInterval(fetchAlerts, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] min-h-[600px] md:min-h-[700px] px-2 md:px-0">
      {/* Header section */}
      <div className="shrink-0 premium-glass-strong p-4 md:p-6 relative overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(59,107,74,0.04), transparent, rgba(139,109,46,0.03))' }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold flex items-center gap-2 text-gradient-earth tracking-tight">
              <ShieldAlert className="h-5 w-5 shrink-0" style={{ color: 'var(--color-primary-base)' }} />
              Community Sentinel
            </h1>
            <p className="text-on-surface-variant mt-1 max-w-2xl text-xs md:text-sm font-medium leading-relaxed">
              Live safety updates and alerts to help event organizers and volunteers stay aware of nearby conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="shrink-0 flex p-1 rounded-full w-full max-w-xs mx-auto animate-fade-in-up delay-100"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 2px 8px rgba(42,45,43,0.04)',
        }}
      >
         <button 
           onClick={() => setActiveTab('map')} 
           className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
             activeTab === 'map'
               ? 'text-on-primary'
               : 'text-on-surface-variant hover:text-on-surface'
           }`}
           style={activeTab === 'map' ? {
             background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
             boxShadow: '0 2px 8px rgba(59,107,74,0.25)',
           } : undefined}
         >
           <MapIcon className="h-4 w-4" /> Safety Map
         </button>
         <button 
           onClick={() => setActiveTab('feed')} 
           className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
             activeTab === 'feed'
               ? 'text-on-primary'
               : 'text-on-surface-variant hover:text-on-surface'
           }`}
           style={activeTab === 'feed' ? {
             background: 'linear-gradient(135deg, var(--color-primary-base), var(--color-moss))',
             boxShadow: '0 2px 8px rgba(59,107,74,0.25)',
           } : undefined}
         >
           <Activity className="h-4 w-4" /> Alert Feed
         </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 premium-glass-strong p-2 md:p-3 overflow-hidden flex flex-col relative min-h-[500px] md:min-h-0 animate-fade-in-up delay-200">
        {activeTab === 'map' && (
          <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden z-0 shadow-inner h-full w-full relative" style={{ background: 'var(--color-surface-dim-base)' }}>
             <MapContainer 
                center={[39.8283, -98.5795]} 
                zoom={4} 
                style={{ height: '100%', width: '100%', zIndex: 0 }}
             >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <SentinelMapOverlay alerts={alerts} />
             </MapContainer>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="h-full overflow-hidden rounded-xl md:rounded-2xl bg-transparent">
            {loading ? (
               <div className="h-full flex flex-col items-center justify-center" style={{ background: 'var(--glass-bg)' }}>
                 <Loader2 className="h-8 w-8 animate-spin mb-4" style={{ color: 'var(--color-primary-base)' }} />
                 <p className="text-on-surface-variant font-medium text-sm">Synchronizing data streams...</p>
               </div>
            ) : (
               <SentinelAlertFeed alerts={alerts} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
