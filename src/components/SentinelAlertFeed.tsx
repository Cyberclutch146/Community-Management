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
      case 'WEATHER': return <CloudRain className={`h-4 w-4 ${severity === 'Extreme' ? 'text-red-600 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'}`} />;
      case 'SEISMIC': return <Activity className="h-4 w-4 text-red-500 dark:text-red-400" />;
      case 'SOCIAL': return <MessageCircle className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Extreme': return <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-800/50 text-[9px] font-bold uppercase rounded-sm tracking-widest shadow-sm">Extreme</span>;
      case 'Severe': return <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50 text-[9px] font-bold uppercase rounded-sm tracking-widest shadow-sm">Severe</span>;
      case 'Moderate': return <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50 text-[9px] font-bold uppercase rounded-sm tracking-widest shadow-sm">Moderate</span>;
      case 'Minor': return <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 text-[9px] font-bold uppercase rounded-sm tracking-widest shadow-sm">Minor</span>;
      default: return <span className="px-2 py-0.5 bg-slate-50 dark:bg-zinc-800/50 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700/50 text-[9px] font-bold uppercase rounded-sm tracking-widest shadow-sm">Unknown</span>;
    }
  };

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-zinc-800/60 p-10 text-center text-slate-500 dark:text-slate-400">
        <Activity className="h-10 w-10 mx-auto text-slate-300 dark:text-zinc-600 mb-3" />
        <p className="font-medium text-slate-700 dark:text-slate-300 text-sm">No active alerts detected.</p>
        <p className="text-xs mt-1">The community sentinel is monitoring data streams.</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent overflow-hidden flex flex-col h-full rounded-2xl">
      <div className="p-3 md:p-4 bg-white dark:bg-zinc-900 flex flex-col gap-3 border-b border-slate-100 dark:border-zinc-800 z-10 relative">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 tracking-tight">
            <Activity className="h-5 w-5 text-emerald-800 dark:text-emerald-500" />
            Live Sentinel Feed
          </h2>
          <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm uppercase tracking-wider">
            {filteredAlerts.length} Active
          </span>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Filter className="h-3 w-3 text-slate-300 dark:text-zinc-600 shrink-0 mr-1" />
          {['ALL', 'WEATHER', 'SEISMIC', 'SOCIAL'].map(type => (
             <button
               key={type}
               onClick={() => { setFilterType(type); setPage(1); }}
               className={`shrink-0 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all duration-300 border ${filterType === type ? 'bg-emerald-800 dark:bg-emerald-600 text-white border-emerald-800 dark:border-emerald-600 shadow-sm' : 'bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-zinc-700 hover:border-emerald-800/30 dark:hover:border-emerald-500/30 hover:text-emerald-800 dark:hover:text-emerald-400'}`}
             >
               {type}
             </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2 md:p-3 space-y-3 bg-slate-50/50 dark:bg-zinc-950/50">
        {paginatedAlerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200/60 dark:border-zinc-800/60 hover:shadow-md hover:border-emerald-800/30 dark:hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-800 dark:bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-2 gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-slate-400 dark:text-zinc-500 group-hover:text-emerald-800 dark:group-hover:text-emerald-500 transition-colors duration-300">
                  {getIcon(alert.type, alert.severity)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">{alert.title}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 font-medium">{alert.locationName}</p>
                </div>
              </div>
              <div>
                {getSeverityBadge(alert.severity)}
              </div>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 pl-8 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
              {alert.description}
            </p>
            
            <div className="flex items-center justify-between mt-3 pl-8 border-t border-slate-100 dark:border-zinc-800/60 pt-3">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                {alert.source} • {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              
              {alert.url && (
                <a href={alert.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-400 flex items-center gap-1 font-semibold transition-colors bg-slate-50 dark:bg-zinc-800/50 px-2 py-1 rounded border border-slate-200/60 dark:border-zinc-700 hover:border-emerald-800/30 dark:hover:border-emerald-500/30">
                  Source <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
        
        {paginatedAlerts.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs font-medium">
             <Activity className="h-8 w-8 mx-auto text-slate-300 dark:text-zinc-600 mb-3 opacity-50" />
             No active alerts match the selected filter.
          </div>
        )}

        {hasMore && (
          <div className="pt-2 pb-6 flex justify-center relative z-10">
            <button 
              onClick={() => setPage(p => p + 1)}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:bg-emerald-800 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white hover:border-emerald-800 dark:hover:border-emerald-600 font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300 text-xs tracking-wide uppercase"
            >
              Load More Alerts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
