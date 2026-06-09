import React, { useState } from 'react';
import { CompanyWatchlistItem } from '../../types';
import { watchlistCompanies } from '../../data/companies';
import { Sparkline } from '../charts/Sparkline';
import { TrendingUp, TrendingDown, HelpCircle, ArrowUpRight, ArrowDownRight, Eye, Briefcase, User } from 'lucide-react';

interface WatchlistCardProps {
  searchText?: string;
}

export const WatchlistCard: React.FC<WatchlistCardProps> = ({ searchText = "" }) => {
  const [selectedCoId, setSelectedCoId] = useState<string | null>(null);

  // Filter watchlist list
  const filteredCompanies = watchlistCompanies.filter((co) => {
    const query = searchText.toLowerCase();
    return !query || 
      co.name.toLowerCase().includes(query) ||
      co.ceo.toLowerCase().includes(query) ||
      co.category.toLowerCase().includes(query);
  });

  const selectedCo = watchlistCompanies.find(c => c.id === selectedCoId);

  return (
    <div id="ai-company-watchlist" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col h-[520px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Header and counter */}
      <div className="flex justify-between items-center border-b border-cmd-border/40 pb-3">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cmd-primary" />
            AI Labs Watchlist
          </h2>
          <p className="text-[11px] text-gray-400">
            Evaluating momentum coefficients, computing allocations, and capital capitalization.
          </p>
        </div>
        <div className="text-[10px] font-mono text-gray-400">
          TRACKING {watchlistCompanies.length} LABS
        </div>
      </div>

      {/* Main Grid: Split List and Details Panel if selected */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden pt-3">
        {/* Company List Box */}
        <div className={`overflow-y-auto space-y-1.5 pr-1 ${selectedCoId ? "md:col-span-7" : "md:col-span-12"}`}>
          {filteredCompanies.length === 0 ? (
            <div className="p-4 text-center bg-[#0B0F14]/40 text-gray-500 font-mono text-xs">
              No matching labs found.
            </div>
          ) : (
            filteredCompanies.map((co) => {
              const isSelected = co.id === selectedCoId;
              const statusColor = 
                co.statusIndicator === 'active' 
                  ? "bg-cmd-positive" 
                  : co.statusIndicator === 'deploying' 
                  ? "bg-cmd-primary" 
                  : "bg-cmd-warning";

              const trendIcon = 
                co.weeklyTrend === 'up' 
                  ? <ArrowUpRight className="w-3.5 h-3.5 text-cmd-positive" />
                  : co.weeklyTrend === 'down'
                  ? <ArrowDownRight className="w-3.5 h-3.5 text-cmd-negative" />
                  : <span className="text-gray-400 font-bold text-xs">-</span>;

              return (
                <div
                  key={co.id}
                  onClick={() => setSelectedCoId(isSelected ? null : co.id)}
                  className={`border p-2.5 flex items-center justify-between gap-3 rounded cursor-pointer transition-all ${
                    isSelected 
                      ? "bg-[#1C2431]/40 border-cmd-primary/85" 
                      : "bg-[#0B0F14]/40 border-cmd-border/60 hover:border-gray-500 hover:bg-[#131A22]"
                  }`}
                >
                  {/* Left Side: Avatar block + name */}
                  <div className="flex items-center gap-2.5 min-w-[120px]">
                    <div className="w-7 h-7 bg-cmd-border/40 flex items-center justify-center text-white font-mono font-bold text-xs shrink-0">
                      {co.name.charAt(0)}
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] font-black text-white truncate">{co.name}</div>
                      <div className="text-[9px] text-gray-400 truncate uppercase mt-0.5">{co.category}</div>
                    </div>
                  </div>

                  {/* Mid: Mini Sparkline */}
                  <div className="hidden sm:block">
                    <Sparkline 
                      data={co.sparklineData} 
                      color={co.weeklyTrend === 'up' ? '#00E676' : co.weeklyTrend === 'down' ? '#FF5C5C' : '#00D4FF'} 
                      width={80} 
                      height={20} 
                    />
                  </div>

                  {/* Right: Trend Arrow + Momentum Score */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1">
                      {trendIcon}
                      <span className="font-mono text-xs font-black text-white">{co.momentumScore}</span>
                    </div>
                    {/* Status Pill */}
                    <div className="w-3.5 h-3.5 flex items-center justify-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} title={`${co.statusIndicator} phase`} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detailed Pane if clicked */}
        {selectedCo && (
          <div className="md:col-span-5 bg-[#0B0F14]/70 border border-cmd-border/80 rounded p-3 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-3">
              {/* Name & Valuation */}
              <div className="flex justify-between items-start border-b border-cmd-border/60 pb-2">
                <div>
                  <h3 className="text-xs font-black font-mono text-white inline-flex items-center gap-1">
                    {selectedCo.name}
                  </h3>
                  <p className="text-[9px] text-[#00D4FF] uppercase font-mono">{selectedCo.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 block font-mono">VALUATION</span>
                  <span className="text-xs font-black text-cmd-positive font-mono">{selectedCo.marketValuation}</span>
                </div>
              </div>

              {/* Bio description */}
              <p className="text-[11px] text-gray-300 leading-relaxed font-sans bg-[#131A22]/50 p-2 border border-cmd-border/40">
                {selectedCo.description}
              </p>

              {/* Metadata list */}
              <div className="space-y-1 text-[10px] font-mono">
                <div className="flex justify-between py-1 border-b border-cmd-border/30">
                  <span className="text-gray-400 inline-flex items-center gap-1">
                    <User className="w-3 h-3 text-cmd-primary" />
                    FOUNDER / CEO
                  </span>
                  <span className="text-white font-medium">{selectedCo.ceo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cmd-border/30">
                  <span className="text-gray-400 inline-flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-cmd-primary" />
                    CORE ALIGNMENT
                  </span>
                  <span className="text-cmd-primary uppercase font-bold text-[9px]">Sovereign Trust</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400 inline-flex items-center gap-1">
                    <Eye className="w-3 h-3 text-cmd-primary" />
                    STATE COEFFICIENT
                  </span>
                  <span className="text-cmd-warning font-semibold uppercase text-[9px]">{selectedCo.statusIndicator}</span>
                </div>
              </div>
            </div>

            {/* Quick action helper inside watchlist */}
            <div className="pt-2 border-t border-cmd-border/40 mt-3">
              <button 
                onClick={() => setSelectedCoId(null)}
                className="w-full bg-cmd-border hover:bg-cmd-primary/10 text-gray-300 font-mono text-[9px] py-1 uppercase border border-cmd-border tracking-wider transition-all"
              >
                COLLAPSE DETAIL PANEL
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer meta */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex justify-between border-t border-cmd-border/40 mt-2 shrink-0">
        <span>STOCHASTIC COEFFICIENT: HIGH-DENSITY ALPHA</span>
        <span>UPDATES RETRIEVED EVERY 1.5HRS</span>
      </div>
    </div>
  );
};
