import React, { useEffect, useState, useRef } from 'react';
import { Search, Bell, Settings, Power, Calendar, ShieldCheck, HelpCircle, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { CardVisibility } from '../../types';

interface HeaderProps {
  onAskAnalyst: (query: string) => void;
  cardVisibility: CardVisibility;
  onCardVisibilityChange: (value: CardVisibility) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAskAnalyst, cardVisibility, onCardVisibilityChange }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [askQuery, setAskQuery] = useState('');
  const [notificationsCount, setNotificationsCount] = useState(4);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const activeCount = Object.values(cardVisibility).filter(Boolean).length;
  const totalCount = Object.keys(cardVisibility).length;

  const cardOptions = [
    { key: 'marketPulse', label: 'AI Market Pulse' },
    { key: 'newsFeed', label: 'AI Operations News' },
    { key: 'watchlist', label: 'AI Company Watchlist' },
    { key: 'researchRadar', label: 'Research Radar' },
    { key: 'leaderboard', label: 'AI Product Leaderboard' },
    { key: 'startups', label: 'Startup Intelligence' },
    { key: 'oss', label: 'Open Source Heatmap' },
    { key: 'media', label: 'Podcast & Video' },
  ] as const;

  const toggleCard = (key: keyof CardVisibility) => {
    onCardVisibilityChange({
      ...cardVisibility,
      [key]: !cardVisibility[key]
    });
  };

  const selectAll = () => {
    onCardVisibilityChange({
      marketPulse: true,
      newsFeed: true,
      watchlist: true,
      researchRadar: true,
      leaderboard: true,
      startups: true,
      oss: true,
      media: true,
    });
  };

  const clearAll = () => {
    onCardVisibilityChange({
      marketPulse: false,
      newsFeed: false,
      watchlist: false,
      researchRadar: false,
      leaderboard: false,
      startups: false,
      oss: false,
      media: false,
    });
  };


  useEffect(() => {
    // Live update timestamp in terminal (Bloomberg Style)
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askQuery.trim()) {
      onAskAnalyst(askQuery);
      setAskQuery('');
    }
  };

  const clearNotifications = () => {
    setNotificationsCount(0);
  };

  // Mock AI headlines ticker items
  const tickerItems = [
    { text: "OPENAI RELEASES NEW REASONING o3 MODEL", trend: "up", trendColor: "text-cmd-positive" },
    { text: "ANTHROPIC LAUNCHES ENTERPRISE MULTI-WORKSPACE REVISION CAPABILITIES", trend: "up", trendColor: "text-cmd-positive" },
    { text: "NVIDIA BLACKWELL CHIPS SHIP WITH WATER-COOLING OPTIMIZATION ARRAYS", trend: "up", trendColor: "text-cmd-positive" },
    { text: "PERPLEXITY SECURES $250M SERIES-F AT NEW SCALE STRUCTURAL VALUATION", trend: "steady", trendColor: "text-cmd-primary" },
    { text: "MISTRAL OFFERS SMALL-WEIGHTS DEV MODELS FOR CRITICAL LOCAL INFRASTRUCTURE", trend: "up", trendColor: "text-cmd-positive" },
    { text: "DEEPSEEK REINFORCEMENT TRAINING DEMONSTRATES 10X COST ADVANTAGE", trend: "up", trendColor: "text-cmd-positive" },
    { text: "EU COMMISSION ENFORCES FRONTIER MODEL COMPLIANCE AUDITING STANDARD", trend: "down", trendColor: "text-cmd-negative" },
    { text: "GOOGL DEEPMIND ALPHA-FOLD REVEALS 150M MOLECULAR SYNERGY BINDINGS", trend: "up", trendColor: "text-cmd-positive" },
    { text: "FIGURE HUMAN ROBOT DEPLOYMENT SURGES IN GERMAN VEHICLE INTEGRATION PLANTS", trend: "steady", trendColor: "text-cmd-primary" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F14] border-b border-cmd-border">
      {/* Top Banner Navigation Row */}
      <div className="h-14 px-4 flex items-center justify-between gap-4">
        {/* Left Segment: Logo & Status indicator */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cmd-primary rounded-sm flex items-center justify-center animate-pulse">
              <span className="w-1.5 h-1.5 bg-cmd-bg rounded-sm" />
            </div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase font-mono flex items-center gap-1">
              AI COMMAND <span className="text-cmd-primary glow-primary">CENTER</span>
            </h1>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 border-l border-cmd-border pl-4">
            <span className="w-2 h-2 rounded-full bg-cmd-positive animate-pulse-slow" />
            <span className="text-[10px] font-mono tracking-wider text-cmd-positive uppercase font-bold">
              SYSTEM: MONITORING
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
            <Calendar className="w-3 h-3 text-cmd-primary" />
            {currentTime || "09 JUN 2026 15:13 UTC"}
          </div>
        </div>

        {/* Center Segment: Portal Viewports & Prompt Analyst controls */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center gap-2">
          {/* Card Filter Dropdown with Checkboxes */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              id="dash-filter-dropdown-trigger"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-[#131A22] text-xs text-white border border-cmd-border px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cmd-primary/50 focus:border-cmd-primary flex items-center justify-between font-mono hover:bg-[#1f2832] transition-colors"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cmd-primary" />
                <span className="uppercase text-gray-300">
                  Active viewports: <b className="text-white">{activeCount}/{totalCount}</b>
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div id="dash-filter-dropdown-menu" className="absolute top-10 left-0 right-0 mt-1 bg-[#131A22] border border-cmd-border rounded shadow-2xl z-[100] p-2.5 space-y-2 max-h-96 overflow-y-auto animate-fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-cmd-border/40 text-[10px] font-mono shrink-0">
                  <span className="text-gray-400 font-bold uppercase select-none">Toggle Grid Portals</span>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={selectAll} 
                      className="text-cmd-primary hover:text-white transition-colors cursor-pointer"
                    >
                      ALL
                    </button>
                    <span className="text-gray-600">|</span>
                    <button 
                      type="button"
                      onClick={clearAll} 
                      className="text-cmd-negative hover:text-white transition-colors cursor-pointer"
                    >
                      NONE
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  {cardOptions.map((opt) => {
                    const isChecked = cardVisibility[opt.key];
                    return (
                      <div
                        key={opt.key}
                        onClick={() => toggleCard(opt.key)}
                        className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer select-none font-mono text-[11px] border transition-colors ${
                          isChecked 
                            ? 'bg-cmd-primary/[0.04] border-cmd-primary/30 text-white hover:bg-cmd-primary/[0.08]' 
                            : 'bg-transparent border-transparent text-gray-500 hover:bg-[#1a232e]'
                        }`}
                      >
                        <span className={isChecked ? 'font-bold text-slate-100' : 'text-slate-400'}>{opt.label}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'bg-cmd-primary border-cmd-primary text-[#0B0F14]' 
                            : 'border-cmd-border bg-transparent'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Prompt AI Analyst Bar */}
          <form onSubmit={handleAskSubmit} className="relative flex-1">
            <HelpCircle className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cmd-primary" />
            <input
              type="text"
              placeholder="Ask AI Analyst (e.g. 'show startups')..."
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              className="w-full bg-[#131A22] text-xs text-cmd-primary placeholder-cmd-primary/40 border border-cmd-primary/30 pl-8 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-cmd-primary/70 focus:border-cmd-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-cmd-primary border border-cmd-primary/30 px-1 rounded hover:bg-cmd-primary/10"
            >
              ASK
            </button>
          </form>
        </div>

        {/* Right Segment: Access tools & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications Button */}
          <button 
            onClick={clearNotifications}
            className="p-1.5 text-gray-400 hover:text-white border border-cmd-border/40 hover:border-gray-600 rounded bg-[#131A22] relative transition-all"
            title="Sovereign Incident Alerts"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cmd-warning text-[#0B0F14] text-[9px] font-bold px-1 rounded-full animate-bounce">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button className="p-1.5 text-gray-400 hover:text-white border border-cmd-border/40 hover:border-gray-600 rounded bg-[#131A22] transition-all">
            <Settings className="w-4 h-4" />
          </button>

          {/* Security Officer Badge */}
          <div className="flex items-center gap-2 border-l border-cmd-border pl-3">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[10px] text-white font-mono font-bold leading-none">PHIL.MCKEYZ</span>
              <span className="text-[9px] text-cmd-primary font-mono leading-none mt-1 uppercase flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-cmd-primary" />
                SEC LEVEL 5
              </span>
            </div>
            {/* Elegant Initial Circle Avatar */}
            <div className="w-7 h-7 rounded-sm bg-cmd-primary/10 border border-cmd-primary/40 flex items-center justify-center font-mono text-xs font-bold text-cmd-primary">
              PM
            </div>
          </div>
        </div>
      </div>

      {/* Continuously scrollable ticker */}
      <div className="h-7 bg-[#131A22] border-t border-cmd-border overflow-hidden flex items-center relative select-none">
        <div className="px-3 h-full shrink-0 bg-cmd-primary text-[#0B0F14] font-mono font-black text-[9px] flex items-center border-r border-cmd-border uppercase z-10">
          GLOBAL NEWS MARQUEE
        </div>
        
        <div className="flex overflow-hidden w-full relative">
          <div className="animate-ticker flex items-center whitespace-nowrap py-1 font-mono text-[10px]">
            {/* Generate triplicated array to guarantee seamless looping */}
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="inline-flex items-center mx-6 text-gray-300">
                <span className="w-1.5 h-1.5 bg-cmd-border rounded-full mr-2" />
                <span className="text-gray-400 mr-1.5">INTELLIGENCE REPORT:</span>
                <span className="font-bold uppercase tracking-wider">{item.text}</span>
                <span className={`ml-2 text-[8px] font-extrabold ${item.trendColor}`}>
                  {item.trend === 'up' ? '▲ SECURE' : item.trend === 'down' ? '▼ CRITICAL' : '■ ACTIVE'}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
