'use client';

import { SentinelAlert } from '@/types/sentinel';
import { AlertTriangle, CloudRain, Activity, MessageCircle, ExternalLink } from 'lucide-react';

interface SentinelAlertFeedProps {
  alerts: SentinelAlert[];
}

export default function SentinelAlertFeed({ alerts }: SentinelAlertFeedProps) {
  
  const getIcon = (type: string, severity: string) => {
    switch (type) {
      case 'WEATHER': return <CloudRain className={`h-5 w-5 ${severity === 'Extreme' ? 'text-red-600' : 'text-blue-500'}`} />;
      case 'SEISMIC': return <Activity className="h-5 w-5 text-red-500" />;
      case 'SOCIAL': return <MessageCircle className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Extreme': return <span className="px-2 py-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase rounded tracking-wider">Extreme</span>;
      case 'Severe': return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-[10px] font-bold uppercase rounded tracking-wider">Severe</span>;
      case 'Moderate': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase rounded tracking-wider">Moderate</span>;
      case 'Minor': return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase rounded tracking-wider">Minor</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-[10px] font-bold uppercase rounded tracking-wider">Unknown</span>;
    }
  };

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        <Activity className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <p className="font-medium">No active alerts detected.</p>
        <p className="text-sm">The community sentinel is monitoring data streams.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <h2 className="font-serif font-bold text-[#1f3d2b] flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Sentinel Feed
        </h2>
        <span className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded border shadow-sm">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2 space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
            <div className="flex justify-between items-start mb-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                  {getIcon(alert.type, alert.severity)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 leading-tight">{alert.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{alert.locationName}</p>
                </div>
              </div>
              <div>
                {getSeverityBadge(alert.severity)}
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mt-2 line-clamp-2 pl-11">
              {alert.description}
            </p>
            
            <div className="flex items-center justify-between mt-3 pl-11">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                {alert.source} • {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              
              {alert.url && (
                <a href={alert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors">
                  Source <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
