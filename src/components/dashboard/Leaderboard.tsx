import React, { useState, useMemo } from 'react';
import { productLeaderboard } from '../../data/companies';
import { Trophy, ArrowUpDown, ChevronUp, ChevronDown, Award, Search, Sparkles } from 'lucide-react';

interface LeaderboardProps {
  searchText?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ searchText = "" }) => {
  const [sortKey, setSortKey] = useState<'rank' | 'growth' | 'buzzScore'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Derive available categories
  const categories = useMemo(() => {
    const cats = new Set(productLeaderboard.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const handleSort = (key: 'rank' | 'growth' | 'buzzScore') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc'); // Default to descending for numbers
    }
  };

  // Compile sorted/filtered catalog
  const filteredProducts = useMemo(() => {
    return productLeaderboard
      .filter((p) => {
        const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
        
        const query = searchText.toLowerCase();
        const matchesSearch = !query || 
          p.product.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.creators.toLowerCase().includes(query);

        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (sortOrder === 'asc') {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
  }, [categoryFilter, sortKey, sortOrder, searchText]);

  const RenderSortArrow = ({ col }: { col: 'rank' | 'growth' | 'buzzScore' }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-500 opacity-30" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="w-3.5 h-3.5 ml-1 text-cmd-primary" /> 
      : <ChevronDown className="w-3.5 h-3.5 ml-1 text-cmd-primary" />;
  };

  return (
    <div id="ai-product-leaderboard" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col h-[520px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Widget Header */}
      <div className="flex justify-between items-center border-b border-cmd-border/40 pb-3">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-2">
            <Trophy className="w-4 h-4 text-cmd-primary" />
            AI Product Leaderboard
          </h2>
          <p className="text-[11px] text-gray-400">
            Real-time deployment ranks based on client search queries and social platform buzz vectors.
          </p>
        </div>
        <div className="text-[10px] bg-cmd-positive/10 text-cmd-positive border border-cmd-positive/20 px-2 py-0.5 rounded font-mono">
          AGGREGATING {productLeaderboard.length} APPS
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="py-2.5 flex gap-1.5 overflow-x-auto select-none shrink-0 border-b border-cmd-border/30">
        {categories.slice(0, 6).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-2 py-1 text-[9px] font-mono tracking-wider font-semibold uppercase border transition-all shrink-0 cursor-pointer ${
              categoryFilter === cat
                ? "bg-cmd-primary text-[#0B0F14] border-cmd-primary"
                : "bg-[#0B0F14]/40 border-cmd-border text-gray-400 hover:text-white hover:border-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spreadsheet grid layout */}
      <div className="flex-grow overflow-y-auto mt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-cmd-border text-[10px] font-mono text-gray-400 uppercase tracking-wider select-none bg-[#0B0F14]/30">
              <th 
                className="py-2.5 pl-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('rank')}
              >
                <div className="flex items-center">
                  RANK <RenderSortArrow col="rank" />
                </div>
              </th>
              
              <th className="py-2.5">PRODUCT</th>
              
              <th className="py-2.5 hidden sm:table-cell">CATEGORY</th>
              
              <th 
                className="py-2.5 text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('growth')}
              >
                <div className="flex items-center justify-end">
                  GROWTH <RenderSortArrow col="growth" />
                </div>
              </th>
              
              <th 
                className="py-2.5 pr-3 text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('buzzScore')}
              >
                <div className="flex items-center justify-end">
                  BUZZ <RenderSortArrow col="buzzScore" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cmd-border/40 font-mono text-xs">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 font-mono">
                  No products match the search parameters.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p, idx) => {
                // Formatting indices for visually pleasing aesthetics
                const rankColor = p.rank === 1 
                  ? "text-cmd-warning font-black" 
                  : p.rank === 2 
                  ? "text-gray-300 font-black" 
                  : "text-gray-400 font-bold";

                return (
                  <tr 
                    key={p.id} 
                    className="hover:bg-[#1C2431]/20 transition-all cursor-pointer group"
                  >
                    {/* Rank cell */}
                    <td className={`py-3 pl-3 font-semibold ${rankColor}`}>
                      #{String(p.rank).padStart(2, '0')}
                    </td>

                    {/* Product & Creator */}
                    <td className="py-3">
                      <div className="font-bold text-white group-hover:text-cmd-primary transition-all">
                        {p.product}
                      </div>
                      <div className="text-[10px] text-gray-400">{p.creators}</div>
                    </td>

                    {/* Category */}
                    <td className="py-3 hidden sm:table-cell text-gray-400 text-[11px] uppercase">
                      {p.category}
                    </td>

                    {/* Weekly Growth Rate */}
                    <td className="py-3 text-right text-cmd-positive font-black">
                      +{p.growth}%
                    </td>

                    {/* Weekly Buzz score */}
                    <td className="py-3 text-right pr-3 text-cmd-primary font-bold">
                      <span className="flex items-center justify-end gap-1">
                        {p.buzzScore}
                        <Sparkles className="w-2.5 h-2.5 text-cmd-primary inline-block opacity-65" />
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table system specs block */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex justify-between border-t border-cmd-border/40 shrink-0 select-none">
        <span>METRICS SOURCE: PUBLIC API TRAFFIC VECTORS</span>
        <span>AUDITING REFRESH: EXECUTED CONTINUOUSLY</span>
      </div>
    </div>
  );
};
