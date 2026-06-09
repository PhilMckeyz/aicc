import React, { useState, useMemo } from 'react';
import { mockStartups } from '../../data/startups';
import { Rocket, Sparkles, Filter, ShieldCheck, Flame, ArrowUpRight, ArrowDownRight, Gem } from 'lucide-react';

interface StartupsCardProps {
  searchText?: string;
}

export const StartupsCard: React.FC<StartupsCardProps> = ({ searchText = "" }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'watchScore' | 'fundingValue'>('watchScore');

  // Dynamically derive available categories
  const categories = useMemo(() => {
    const cats = new Set(mockStartups.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter & sort logic
  const filteredAndSorted = useMemo(() => {
    return mockStartups
      .filter((s) => {
        const matchesCategory = filterCategory === 'All' || s.category === filterCategory;
        
        const query = searchText.toLowerCase();
        const matchesSearch = !query || 
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.leadInvestors.some(inv => inv.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        return b[sortBy] - a[sortBy];
      });
  }, [filterCategory, sortBy, searchText]);

  return (
    <div id="ai-startup-intelligence" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col h-[520px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Widget Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-cmd-border/40 pb-3 shrink-0">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-2">
            <Rocket className="w-4 h-4 text-cmd-primary" />
            Startup Intelligence Hub
          </h2>
          <p className="text-[11px] text-gray-400">
            Monitoring promising early-stage neural companies, funding acceleration, and seed rounds.
          </p>
        </div>

        {/* Sorting selection buttons */}
        <div className="flex items-center gap-1.5 bg-[#0B0F14]/70 p-1 border border-cmd-border/60">
          <button 
            onClick={() => setSortBy('watchScore')}
            className={`px-2 py-0.5 text-[9px] font-mono uppercase transition-all tracking-wider cursor-pointer ${
              sortBy === 'watchScore'
                ? "bg-cmd-primary text-[#0B0F14] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            WATCH SCORE
          </button>
          <button 
            onClick={() => setSortBy('fundingValue')}
            className={`px-2 py-0.5 text-[9px] font-mono uppercase transition-all tracking-wider cursor-pointer ${
              sortBy === 'fundingValue'
                ? "bg-cmd-primary text-[#0B0F14] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            TOTAL FUNDING
          </button>
        </div>
      </div>

      {/* Categories filter rail */}
      <div className="py-2.5 flex gap-1 bg-[#0B0F14]/35 px-1 overflow-x-auto select-none shrink-0 border-b border-cmd-border/30">
        {categories.slice(0, 5).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-2 py-0.5 text-[9.5px] font-mono tracking-wider font-semibold uppercase border transition-all shrink-0 cursor-pointer ${
              filterCategory === cat
                ? "bg-cmd-primary text-[#0B0F14] border-cmd-primary"
                : "bg-[#0B0F14]/20 border-cmd-border text-gray-400 hover:text-white hover:border-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Startups Scrollable Grid */}
      <div className="flex-1 overflow-y-auto pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pr-1">
        {filteredAndSorted.length === 0 ? (
          <div className="col-span-2 text-center py-10 bg-[#0B0F14]/40 font-mono text-xs text-gray-500 rounded border border-dashed border-cmd-border/60">
            No startups listed in matching queries.
          </div>
        ) : (
          filteredAndSorted.map((startup) => {
            const trendIcon = 
              startup.trend === 'up' 
                ? <ArrowUpRight className="w-3.5 h-3.5 text-cmd-positive" />
                : startup.trend === 'down'
                ? <ArrowDownRight className="w-3.5 h-3.5 text-cmd-negative" />
                : <span className="text-gray-400">-</span>;

            // Simple visualizer for funding progression (bars)
            const maxValInHistory = Math.max(...startup.miniFundingHistory);

            return (
              <div 
                key={startup.id}
                className="bg-[#0B0F14]/45 border border-cmd-border/70 p-3 flex flex-col justify-between hover:border-cmd-primary/50 hover:bg-[#131A22] transition-all relative overflow-hidden"
              >
                {/* Backlight layout */}
                <div className="absolute top-1 right-1 opacity-[0.04]">
                  <Flame className="w-10 h-10 text-cmd-primary" />
                </div>

                <div className="space-y-2">
                  {/* Name and watch score */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-xs font-black text-white font-mono leading-none flex items-center gap-1.5">
                        {startup.name}
                        {startup.watchScore >= 95 && (
                          <Gem className="w-3 h-3 text-cmd-warning shrink-0" />
                        )}
                      </h3>
                      <span className="text-[9px] text-[#00D4FF] font-mono uppercase tracking-wider block mt-1">
                        {startup.category}
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[9px] text-gray-400 block uppercase font-bold text-[8.5px]">WATCH SCORE</span>
                      <span className="font-extrabold text-white text-xs">{startup.watchScore}/100</span>
                    </div>
                  </div>

                  {/* Seed progression graph */}
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block">
                      Seed Stage Progression Series:
                    </span>
                    <div className="flex items-end gap-1 h-6">
                      {startup.miniFundingHistory.map((val, idx) => {
                        const pctHeight = (val / maxValInHistory) * 100;
                        return (
                          <div
                            key={idx}
                            title={`Series Stage value: $${val}M`}
                            style={{ height: `${pctHeight}%` }}
                            className="bg-cmd-primary/45 hover:bg-cmd-primary w-full rounded-t-sm transition-all cursor-pointer"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Investors and funding amount metadata */}
                <div className="mt-3.5 pt-2 border-t border-cmd-border/40 flex justify-between items-end">
                  <div>
                    <span className="text-[8px] font-mono text-gray-500 uppercase block tracking-wider">
                      LEAD CAPITAL:
                    </span>
                    <div className="flex gap-1.5 flex-wrap mt-0.5">
                      {startup.leadInvestors.map((inv, idx) => (
                        <span 
                          key={idx}
                          className="text-[8.5px] font-mono bg-cmd-border/50 text-gray-300 font-semibold px-1 py-0.5 rounded truncate max-w-[100px]"
                        >
                          {inv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[8px] text-gray-400 block">TOTAL SUBSTRATE</span>
                    <span className="text-xs font-black text-cmd-positive">{startup.funding}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer system status */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex justify-between border-t border-cmd-border/40 mt-2 shrink-0">
        <span>COMPUTATION LOGISTICS: LICENSED SECURITY AGENT DIRECTORY</span>
        <span>SEED ACCELERATORS ACTIVE: {mockStartups.length} ENTRIES</span>
      </div>
    </div>
  );
};
