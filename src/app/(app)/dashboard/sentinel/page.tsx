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
  { ssr: false, loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-xl"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> }
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
      {/* Header section shrink to fit */}
      <div className="shrink-0 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/20 border border-emerald-100/50 rounded-[2rem] p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-serif font-bold flex items-center gap-3 text-slate-800 tracking-tight">
            <ShieldAlert className="h-8 w-8 text-emerald-500 shrink-0" />
            Community Sentinel
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
            Real-time public data synchronization for environmental and social awareness.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full opacity-[0.03] pointer-events-none text-emerald-900">
           <Activity className="w-full h-full transform translate-x-1/4 scale-150" />
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 flex bg-white/80 backdrop-blur-md border border-slate-200/60 p-1.5 rounded-2xl w-full max-w-sm mx-auto shadow-sm">
         <button 
           onClick={() => setActiveTab('map')} 
           className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'map' ? 'bg-white shadow-sm text-emerald-700 ring-1 ring-emerald-100/50' : 'text-slate-500 hover:text-emerald-600 hover:bg-white/50'}`}
         >
           <MapIcon className="h-4 w-4" /> Threat Map
         </button>
         <button 
           onClick={() => setActiveTab('feed')} 
           className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'feed' ? 'bg-white shadow-sm text-emerald-700 ring-1 ring-emerald-100/50' : 'text-slate-500 hover:text-emerald-600 hover:bg-white/50'}`}
         >
           <Activity className="h-4 w-4" /> Live Feed
         </button>
      </div>

      {/* Content Area flexes to fill available space */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-sm border border-slate-200/60 p-2 md:p-4 overflow-hidden flex flex-col relative min-h-[500px] md:min-h-0">
        {activeTab === 'map' && (
          <div className="flex-1 rounded-2xl md:rounded-[1.5rem] overflow-hidden z-0 bg-slate-50 shadow-inner h-full w-full relative">
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
          <div className="h-full overflow-hidden rounded-2xl md:rounded-[1.5rem] border border-slate-200/60 bg-white">
            {loading ? (
               <div className="bg-slate-50/50 h-full flex flex-col items-center justify-center">
                  <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
                  <p className="text-slate-500 font-medium text-sm">Synchronizing data streams...</p>
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
