import React, { useState, useMemo } from 'react';
import { mockNews } from '../../data/news';
import { AlertCircle, Flame, Filter, SlidersHorizontal, Layers, Search } from 'lucide-react';

interface NewsFeedProps {
  searchText?: string;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ searchText = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [importanceThreshold, setImportanceThreshold] = useState<number>(0); // 0 to 1
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = ['All', 'Models', 'Agents', 'Research', 'Robotics', 'Enterprise', 'Startups'];

  // Compound filter logic
  const filteredNews = useMemo(() => {
    return mockNews.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesImportance = item.importanceScore >= importanceThreshold;
      
      const query = (searchText || searchFilter || '').toLowerCase();
      const matchesSearch = !query || 
        item.headline.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesImportance && matchesSearch;
    });
  }, [selectedCategory, importanceThreshold, searchFilter, searchText]);

  return (
    <div id="ai-news-feed" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col h-[520px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Widget Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cmd-border/40 pb-3">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase flex items-center gap-1.5 font-mono">
            <Flame className="w-4 h-4 text-cmd-negative animate-bounce" />
            AI Operations News Feed
          </h2>
          <p className="text-[11px] text-gray-400">
            Real-time global announcements with contextual importance weighting indicators.
          </p>
        </div>
        
        {/* Dynamic active counter */}
        <div className="text-[10px] bg-cmd-negative/10 text-cmd-negative px-2 py-1 border border-cmd-negative/20 rounded font-mono">
          {filteredNews.length} BROADCASTS DETECTED
        </div>
      </div>

      {/* Interactive Filtering Row */}
      <div className="py-2.5 space-y-2">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[10px] font-mono tracking-wider font-semibold uppercase border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cmd-primary text-[#0B0F14] border-cmd-primary"
                  : "bg-[#0B0F14]/40 border-cmd-border text-gray-400 hover:text-white hover:border-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sliders and searches */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0B0F14]/40 p-2 border border-cmd-border/40">
          {/* Importance slider */}
          <div className="flex items-center gap-2 flex-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] text-gray-400 font-mono uppercase whitespace-nowrap">
              Priority: {Math.round(importanceThreshold * 100)}%+
            </span>
            <input
              type="range"
              min="0"
              max="0.95"
              step="0.05"
              value={importanceThreshold}
              onChange={(e) => setImportanceThreshold(parseFloat(e.target.value))}
              className="w-full max-w-[124px] h-1 bg-cmd-border rounded-lg appearance-none cursor-pointer accent-cmd-primary"
            />
          </div>

          {/* In-view quick word filtering */}
          <div className="relative flex-1 max-w-[200px]">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              placeholder="Keyword search..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-[#131A22] text-[10px] text-white border border-cmd-border pl-7 pr-2 py-1 focus:outline-none focus:border-cmd-primary"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Feed Container */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1.5 mt-1">
        {filteredNews.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#0B0F14]/30 border border-cmd-border/30 rounded">
            <AlertCircle className="w-6 h-6 text-cmd-warning mb-2 animate-pulse" />
            <p className="text-xs text-mono font-bold text-white">NO RELEVANT COVERAGE FOUND</p>
            <p className="text-[10px] text-gray-400 mt-1 max-w-xs">
              Clear keyword searches, decrease priority thresholds, or switch category tabs to trace global intelligence channels.
            </p>
          </div>
        ) : (
          filteredNews.map((news) => {
            // Pick color according to importance level
            const isCritical = news.importanceScore >= 0.90;
            const isHigh = news.importanceScore >= 0.80 && news.importanceScore < 0.90;

            const accentBorder = isCritical
              ? "border-cmd-negative bg-cmd-negative/[0.03]"
              : isHigh
              ? "border-cmd-warning bg-cmd-warning/[0.01]"
              : "border-cmd-border bg-[#0B0F14]/20";

            const accentText = isCritical
              ? "text-cmd-negative font-extrabold"
              : isHigh
              ? "text-cmd-warning font-bold"
              : "text-cmd-primary font-medium";

            return (
              <div
                key={news.id}
                className={`border-l-2 p-2.5 rounded-r hover:bg-[#1C2431]/20 transition-all group cursor-pointer ${accentBorder}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    {/* Header line metadata */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono tracking-wider">
                      <span className="text-cmd-primary bg-cmd-primary/10 px-1 py-0.5 rounded uppercase font-bold">
                        {news.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-300 font-semibold">{news.source}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{news.timestamp}</span>
                    </div>

                    {/* News Headline */}
                    <p className="text-xs font-semibold text-white leading-tight group-hover:text-cmd-primary transition-colors">
                      {news.headline}
                    </p>

                    {/* Underlying contextual impact */}
                    <p className="text-[10px] text-gray-400 leading-snug">
                      <span className="text-cmd-primary font-bold">IMPACT ANALYSIS:</span> {news.impactAnalysis}
                    </p>
                  </div>

                  {/* Impact Rating score layout */}
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-mono uppercase block ${accentText}`}>
                      {news.importanceScore >= 0.9 ? "CRITICAL" : news.importanceScore >= 0.8 ? "HIGH" : "NORMAL"}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      W: {Math.round(news.importanceScore * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer statistics indicator */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex items-center justify-between border-t border-cmd-border/40 mt-2 shrink-0">
        <span>SECURITY: SYSTEM-CLEARANCE-LOGGED</span>
        <span>AGGREGATE RATINGS FROM 18 REGIONAL SENSORS</span>
      </div>
    </div>
  );
};
