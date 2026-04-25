'use client';

import { useState, useEffect } from 'react';
import { SentinelAlert } from '@/types/sentinel';
import SentinelAlertFeed from '@/components/SentinelAlertFeed';
import { Activity, Map as MapIcon, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1f3d2b] flex items-center gap-3">
            <Activity className="h-8 w-8 text-[#1f3d2b]" />
            Community Sentinel
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time public data synchronization for environmental and social awareness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh] min-h-[600px]">
        {/* Map View */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden flex flex-col">
          <div className="p-3 bg-gray-50/50 flex justify-between items-center border-b border-gray-100 mb-2 rounded-t-lg">
             <h2 className="font-bold text-[#1f3d2b] flex items-center gap-2">
                <MapIcon className="h-4 w-4" /> Global Threat Map
             </h2>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 z-0">
             <MapContainer 
                center={[39.8283, -98.5795]} // Center of US roughly
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
        </div>

        {/* Feed View */}
        <div className="h-full">
          {loading ? (
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 text-[#1f3d2b] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Synchronizing data streams...</p>
             </div>
          ) : (
             <SentinelAlertFeed alerts={alerts} />
          )}
        </div>
      </div>
    </div>
  );
}
