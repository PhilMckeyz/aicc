import React, { useState } from 'react';
import { Header } from './components/dashboard/Header';
import { IntelligenceRail } from './components/dashboard/IntelligenceRail';
import { AnalystConsole } from './components/terminal/AnalystConsole';

// Import Reusable Dashboard Cards
import { MarketPulseCard } from './components/dashboard/MarketPulseCard';
import { NewsFeed } from './components/news/NewsFeed';
import { WatchlistCard } from './components/watchlist/WatchlistCard';
import { ResearchRadarCard } from './components/dashboard/ResearchRadarCard';
import { Leaderboard } from './components/dashboard/Leaderboard';
import { StartupsCard } from './components/dashboard/StartupsCard';
import { OSSCard } from './components/dashboard/OSSCard';
import { MediaCarousel } from './components/dashboard/MediaCarousel';
import { CardVisibility } from './types';

import { 
  BarChart, 
  HelpCircle, 
  TrendingUp, 
  Clock, 
  Compass, 
  GitBranch, 
  AlertOctagon, 
  Flame, 
  Laptop,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [consoleQueryTrigger, setConsoleQueryTrigger] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [cardVisibility, setCardVisibility] = useState<CardVisibility>({
    marketPulse: true,
    newsFeed: true,
    watchlist: true,
    researchRadar: true,
    leaderboard: true,
    startups: true,
    oss: true,
    media: true,
  });

  const handleGlobalSearch = (value: string) => {
    setGlobalSearch(value);
  };

  const handleAskAnalyst = (query: string) => {
    setConsoleQueryTrigger(query);
  };

  const clearQueryTrigger = () => {
    setConsoleQueryTrigger('');
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-100 flex flex-col relative overflow-x-hidden antialiased select-none">
      
      {/* 1. Header with integrated News Headlines ticker marquee */}
      <Header 
        onAskAnalyst={handleAskAnalyst} 
        cardVisibility={cardVisibility}
        onCardVisibilityChange={setCardVisibility}
      />

      {/* 2. Primary layout body */}
      <div className="flex-1 flex pt-[88px] relative">
        
        {/* Main Dashboard bento grid workspace (adjust right spacing according to sidebar collapse state) */}
        <main 
          className={`flex-grow p-4 space-y-6 pb-28 transition-all duration-300 ${
            isSidebarCollapsed ? "mr-12" : "mr-72"
          }`}
        >
          {/* Dashboard Meta bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#131A22]/40 p-3 border border-cmd-border/60 rounded">
            <div className="space-y-1">
              <span className="text-[9px] font-mono bg-cmd-primary/10 text-cmd-primary px-1.5 py-0.5 rounded font-black tracking-widest uppercase">
                COGNITIVE SENSORY CONTEXT DIRECTORY
              </span>
              <h2 className="text-sm font-semibold tracking-wide text-white leading-none">
                AI COMMAND OPS CENTER
              </h2>
            </div>

            {/* Quick stats indicator */}
            <div className="flex gap-4 font-mono text-[10px]">
              <div className="text-right">
                <span className="text-gray-500 block text-[9px]">SENSE FLOP VELOCITY</span>
                <span className="text-cmd-positive font-bold">142.5 Exaflops</span>
              </div>
              <div className="text-right border-l border-cmd-border/50 pl-3">
                <span className="text-gray-500 block text-[9px]">COMPILING INTEGRITY</span>
                <span className="text-cmd-primary font-bold">99.85% Pure</span>
              </div>
              <div className="text-right border-l border-cmd-border/50 pl-3">
                <span className="text-gray-500 block text-[9px]">COGNITIVE DRIFT</span>
                <span className="text-cmd-positive font-semibold">0.02%</span>
              </div>
            </div>
          </div>

          {/* GRID: The 8 Bloomberg-style bento grid container cards */}
          <div className="grid grid-cols-12 gap-5 auto-rows-min">
            
            {/* CARD 1: AI Market Pulse (12 columns on mobile, 8 columns on large desktop) */}
            {cardVisibility.marketPulse && (
              <div className="col-span-12 xl:col-span-8">
                <MarketPulseCard searchText={globalSearch} />
              </div>
            )}

            {/* CARD 2: AI Operations news feed (12 columns on mobile, 4 columns on large desktop) */}
            {cardVisibility.newsFeed && (
              <div className="col-span-12 xl:col-span-4">
                <NewsFeed searchText={globalSearch} />
              </div>
            )}

            {/* CARD 3: AI Company Watchlist (12 columns on mobile, 6 columns on medium desktop) */}
            {cardVisibility.watchlist && (
              <div className="col-span-12 lg:col-span-6">
                <WatchlistCard searchText={globalSearch} />
              </div>
            )}

            {/* CARD 4: Research Radar (12 columns on mobile, 6 columns on medium desktop) */}
            {cardVisibility.researchRadar && (
              <div className="col-span-12 lg:col-span-6">
                <ResearchRadarCard searchText={globalSearch} />
              </div>
            )}

            {/* CARD 5: AI Product Leaderboard (12 columns on mobile, 6 columns on medium desktop) */}
            {cardVisibility.leaderboard && (
              <div className="col-span-12 lg:col-span-6">
                <Leaderboard searchText={globalSearch} />
              </div>
            )}

            {/* CARD 6: Startup Intelligence Hub (12 columns on mobile, 6 columns on medium desktop) */}
            {cardVisibility.startups && (
              <div className="col-span-12 lg:col-span-6">
                <StartupsCard searchText={globalSearch} />
              </div>
            )}

            {/* CARD 7: Open Source Intelligence Heatmap (12 columns on mobile, 12 on tablets) */}
            {cardVisibility.oss && (
              <div className="col-span-12">
                <OSSCard searchText={globalSearch} />
              </div>
            )}

            {/* CARD 8: Podcast & Video carousel (12 columns on mobile) */}
            {cardVisibility.media && (
              <div className="col-span-12">
                <MediaCarousel searchText={globalSearch} />
              </div>
            )}

            {/* If all cards are hidden, show helpful placeholder */}
            {Object.values(cardVisibility).every(val => !val) && (
              <div className="col-span-12 p-12 text-center bg-[#131A22]/85 border border-dashed border-cmd-border rounded flex flex-col items-center justify-center space-y-3">
                <span className="text-[11px] font-mono bg-cmd-negative/10 text-cmd-negative px-2 py-0.5 rounded font-black tracking-widest uppercase animate-pulse">
                  ⚡ ALL CHANNELS OFFLINE
                </span>
                <p className="text-[11px] text-gray-400 font-mono max-w-md">
                  All ecosystem viewports are currently hidden. Toggle checkmarks in the top "Active viewports" dropdown registry to restore target portal feeds.
                </p>
              </div>
            )}

          </div>
        </main>

        {/* 3. Collabsible Right Intelligence Rail */}
        <IntelligenceRail 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

      </div>

      {/* 4. Bottom Command-Center Chat Terminal Overlay */}
      <AnalystConsole 
        externalQueryTrigger={consoleQueryTrigger} 
        onClearExternalQuery={clearQueryTrigger}
      />
      
    </div>
  );
}
