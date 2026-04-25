'use client';

import { SentinelAlert } from '@/types/sentinel';
import { AlertTriangle, CloudRain, Activity, MessageCircle, ExternalLink, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

interface SentinelAlertFeedProps {
  alerts: SentinelAlert[];
}

export default function SentinelAlertFeed({ alerts }: SentinelAlertFeedProps) {
  const [filterType, setFilterType] = useState('ALL');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const filteredAlerts = useMemo(() => {
    return alerts.filter(a => filterType === 'ALL' || a.type === filterType);
  }, [alerts, filterType]);

  const paginatedAlerts = useMemo(() => {
    return filteredAlerts.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredAlerts, page]);

  const hasMore = paginatedAlerts.length < filteredAlerts.length;
  
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
      case 'Extreme': return <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">Extreme</span>;
      case 'Severe': return <span className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">Severe</span>;
      case 'Moderate': return <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">Moderate</span>;
      case 'Minor': return <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">Minor</span>;
      default: return <span className="px-2 py-1 bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">Unknown</span>;
    }
  };

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-12 text-center text-slate-500">
        <Activity className="h-12 w-12 mx-auto text-slate-300 mb-4" />
        <p className="font-medium text-slate-700">No active alerts detected.</p>
        <p className="text-sm mt-1">The community sentinel is monitoring data streams.</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent overflow-hidden flex flex-col h-full rounded-2xl">
      <div className="p-4 md:p-6 bg-white/80 backdrop-blur-md flex flex-col gap-4 border-b border-slate-100 z-10 relative">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-slate-800 flex items-center gap-2 tracking-tight">
            <Activity className="h-6 w-6 text-emerald-500" />
            Live Sentinel Feed
          </h2>
          <span className="text-xs text-emerald-600 font-bold bg-emerald-50/50 px-3 py-1.5 rounded-full border border-emerald-100/50 shadow-sm">
            {filteredAlerts.length} Active
          </span>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="h-4 w-4 text-emerald-300 shrink-0 mr-1" />
          {['ALL', 'WEATHER', 'SEISMIC', 'SOCIAL'].map(type => (
             <button
               key={type}
               onClick={() => { setFilterType(type); setPage(1); }}
               className={`shrink-0 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 border ${filterType === type ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20' : 'bg-white/80 text-slate-500 border-slate-200 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50/50'}`}
             >
               {type}
             </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 p-3 md:p-4 space-y-4 bg-slate-50/50">
        {paginatedAlerts.map((alert) => (
          <div key={alert.id} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200/60 transition-all duration-300 group relative overflow-hidden transform hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-emerald-50/50 rounded-full p-2.5 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(alert.type, alert.severity)}
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">{alert.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">{alert.locationName}</p>
                </div>
              </div>
              <div>
                {getSeverityBadge(alert.severity)}
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mt-3 line-clamp-2 pl-14 leading-relaxed group-hover:text-slate-800 transition-colors">
              {alert.description}
            </p>
            
            <div className="flex items-center justify-between mt-4 pl-14 border-t border-slate-100 pt-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {alert.source} • {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              
              {alert.url && (
                <a href={alert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1.5 font-bold transition-colors bg-slate-50 px-3 py-1.5 rounded-full hover:bg-emerald-50 border border-slate-200/60 hover:border-emerald-200/60">
                  Source <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
        
        {paginatedAlerts.length === 0 && (
          <div className="text-center py-16 text-emerald-800/60 text-sm font-medium">
             <Activity className="h-10 w-10 mx-auto text-emerald-200 mb-4 opacity-50" />
             No active alerts match the selected filter.
          </div>
        )}

        {hasMore && (
          <div className="pt-4 pb-8 flex justify-center relative z-10">
            <button 
              onClick={() => setPage(p => p + 1)}
              className="bg-white border border-slate-200 text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 font-bold py-2.5 px-8 rounded-full shadow-sm hover:shadow-md hover:shadow-emerald-600/20 transition-all duration-300 text-sm"
            >
              Load More Alerts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
