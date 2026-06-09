import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  Gavel, 
  Compass, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  FileCheck, 
  TrendingUp, 
  Flame, 
  BookOpen 
} from 'lucide-react';

interface IntelligenceRailProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const IntelligenceRail: React.FC<IntelligenceRailProps> = ({ isCollapsed, onToggleCollapse }) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('funding');

  // Static mock events
  const earnings = [
    { company: "MSFT", date: "JUN 22", est: "EPS: $3.12" },
    { company: "GOOGL", date: "JUN 23", est: "EPS: $1.85" },
    { company: "NVDA", date: "JUN 28", est: "EPS: $5.40" },
    { company: "TSLA", date: "JUL 02", est: "EPS: $0.65" },
    { company: "META", date: "JUL 24", est: "EPS: $4.10" }
  ];

  const fundingRounds = [
    { company: "Cognition AI", amount: "$175M", stage: "Series B", firm: "Founders Fund" },
    { company: "Suno AI", amount: "$125M", stage: "Series B", firm: "Lightspeed" },
    { company: "Phizzy Intel", amount: "$80M", stage: "Series A", firm: "Sequoia Capital" },
    { company: "Etched ASIC", amount: "$120M", stage: "Series A", firm: "Peter Thiel" },
    { company: "Physical Intel", amount: "$400M", stage: "Series Venture", firm: "Thrive Capital" }
  ];

  const regulatory = [
    { title: "EU AI Act Enforcement Guidelines", policy: "Tier-1 Frontier audits", status: "Active Phase" },
    { title: "US Sec Order on Compute Licensing", policy: "Cluster sizes > 10^26 FLOPs", status: "Evaluation" },
    { title: "SB-1047 Alternative Frameworks", policy: "Safety critical shutdown valves", status: "Proposed" }
  ];

  const topics = [
    { tag: "#InferenceTimeCompute", velocity: "98.4%", desc: "Reinforcement reasoning loops" },
    { tag: "#SovereignSuperclusters", velocity: "92.1%", desc: "National nuclear-backed GPUs" },
    { tag: "#SpeculativeDecoding", velocity: "88.7%", desc: "Fast draft model offloads" },
    { tag: "#LiquidCoolingASIC", velocity: "85.2%", desc: "Blackwell cluster heat dissipation" }
  ];

  const events = [
    { title: "AI Safety Summit Tokyo", date: "JUL 12 - 14", venue: "Toranomon Hills" },
    { title: "ICML 2026 Core Keynotes", date: "JUL 25 - 29", venue: "Miami Convention" },
    { title: "OpenAI Developer Day 3", date: "AUG 18", venue: "San Francisco CA" }
  ];

  const toggleAccordion = (name: string) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  return (
    <aside 
      className={`fixed right-0 top-14 bottom-0 z-30 bg-[#131A22] border-l border-cmd-border transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? "w-12" : "w-72"
      }`}
    >
      {/* Collapse Toggle trigger handle */}
      <button 
        onClick={onToggleCollapse}
        className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-cmd-bg border border-cmd-border flex items-center justify-center text-cmd-primary font-bold hover:border-cmd-primary hover:text-white cursor-pointer z-50 shadow-md transition-all"
      >
        {isCollapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      {/* Main sidebar content body */}
      {isCollapsed ? (
        <div className="flex-1 flex flex-col items-center pt-8 space-y-8 text-gray-500 font-mono">
          <Calendar className="w-5 h-5 hover:text-cmd-primary cursor-pointer" onClick={onToggleCollapse} title="Earnings & Events" />
          <DollarSign className="w-5 h-5 hover:text-cmd-positive cursor-pointer" onClick={onToggleCollapse} title="Funding Trackers" />
          <Gavel className="w-5 h-5 hover:text-cmd-warning cursor-pointer" onClick={onToggleCollapse} title="Regulations" />
          <Compass className="w-5 h-5 hover:text-cmd-primary cursor-pointer" onClick={onToggleCollapse} title="Trending Topics" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Section banner */}
          <div className="border-b border-cmd-border pb-2 shrink-0 flex justify-between items-center bg-[#131A22]">
            <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
              INTELLIGENCE RAIL
            </span>
            <span className="text-[9px] font-mono text-gray-500 uppercase">TELEMETRY</span>
          </div>

          {/* Accordion 1: Upcoming Earnings (MSFT, GOOGL, NVDA, TSMC) */}
          <div className="border border-cmd-border/50 rounded overflow-hidden">
            <button 
              onClick={() => toggleAccordion('earnings')}
              className="w-full bg-[#0B0F14]/40 hover:bg-[#0B0F14]/90 px-3 py-2 flex items-center justify-between text-left text-xs font-black font-mono text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cmd-primary" />
                EARNINGS CALENDAR
              </span>
              <span className="text-[9px] text-gray-500">{activeAccordion === 'earnings' ? '▼' : '▲'}</span>
            </button>
            
            {activeAccordion === 'earnings' && (
              <div className="p-2.5 bg-[#0B0F14]/10 space-y-2 border-t border-cmd-border/30 max-h-48 overflow-y-auto">
                {earnings.map((earn, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10.5px] border-b border-cmd-border/25 pb-1 last:border-b-0">
                    <span className="font-bold text-white font-mono">{earn.company}</span>
                    <div className="flex gap-4 text-right">
                      <span className="text-gray-400 font-mono text-[9.5px]">{earn.est}</span>
                      <span className="text-cmd-warning font-mono font-bold font-mono">{earn.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: Recent Funding Tracker */}
          <div className="border border-cmd-border/50 rounded overflow-hidden">
            <button 
              onClick={() => toggleAccordion('funding')}
              className="w-full bg-[#0B0F14]/40 hover:bg-[#0B0F14]/90 px-3 py-2 flex items-center justify-between text-left text-xs font-black font-mono text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-cmd-positive" />
                FUNDING ROUNDS
              </span>
              <span className="text-[9px] text-gray-500">{activeAccordion === 'funding' ? '▼' : '▲'}</span>
            </button>

            {activeAccordion === 'funding' && (
              <div className="p-2.5 bg-[#0B0F14]/10 space-y-2 border-t border-cmd-border/30 max-h-48 overflow-y-auto">
                {fundingRounds.map((f, idx) => (
                  <div key={idx} className="border-b border-cmd-border/25 pb-2 last:border-0 last:pb-0 space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-white">{f.company}</span>
                      <span className="text-[#00E676] font-bold font-mono text-xs">{f.amount}</span>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-gray-400 uppercase">
                      <span>{f.stage}</span>
                      <span>Lead: {f.firm}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 3: Regulatory Updates */}
          <div className="border border-cmd-border/50 rounded overflow-hidden">
            <button 
              onClick={() => toggleAccordion('rules')}
              className="w-full bg-[#0B0F14]/40 hover:bg-[#0B0F14]/90 px-3 py-2 flex items-center justify-between text-left text-xs font-black font-mono text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Gavel className="w-3.5 h-3.5 text-cmd-warning" />
                REGULATORY LAWS
              </span>
              <span className="text-[9px] text-gray-500">{activeAccordion === 'rules' ? '▼' : '▲'}</span>
            </button>

            {activeAccordion === 'rules' && (
              <div className="p-2.5 bg-[#0B0F14]/10 space-y-2.5 border-t border-cmd-border/30 max-h-48 overflow-y-auto">
                {regulatory.map((r, idx) => (
                  <div key={idx} className="space-y-0.5 border-b border-cmd-border/25 pb-1.5 last:border-0">
                    <h5 className="text-[10.5px] font-bold text-white truncate leading-tight">
                      {r.title}
                    </h5>
                    <p className="text-[9px] font-mono text-gray-400">
                      {r.policy}
                    </p>
                    <div className="flex justify-between text-[8.5px] font-mono text-cmd-warning pt-0.5">
                      <span>STATUS: active</span>
                      <span className="font-extrabold uppercase">{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 4: Trending Topics/Tags */}
          <div className="border border-cmd-border/50 rounded overflow-hidden">
            <button 
              onClick={() => toggleAccordion('topics')}
              className="w-full bg-[#0B0F14]/40 hover:bg-[#0B0F14]/90 px-3 py-2 flex items-center justify-between text-left text-xs font-black font-mono text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-cmd-negative" />
                TRENDING TOPICS
              </span>
              <span className="text-[9px] text-gray-500">{activeAccordion === 'topics' ? '▼' : '▲'}</span>
            </button>

            {activeAccordion === 'topics' && (
              <div className="p-2.5 bg-[#0B0F14]/10 space-y-2 border-t border-cmd-border/30 max-h-48 overflow-y-auto">
                {topics.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-start text-[10px] border-b border-cmd-border/25 pb-1.5 last:border-0">
                    <div>
                      <span className="font-bold text-[#00D4FF] font-mono">{t.tag}</span>
                      <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{t.desc}</p>
                    </div>
                    <span className="font-mono text-gray-500 font-bold tracking-tight bg-cmd-border/40 px-1 py-0.5 rounded text-[8.5px]">
                      {t.velocity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 5: Upcoming AI Events */}
          <div className="border border-cmd-border/50 rounded overflow-hidden">
            <button 
              onClick={() => toggleAccordion('events')}
              className="w-full bg-[#0B0F14]/40 hover:bg-[#0B0F14]/90 px-3 py-2 flex items-center justify-between text-left text-xs font-black font-mono text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-cmd-primary" />
                UPCOMING EVENTS (JULY)
              </span>
              <span className="text-[9px] text-gray-500">{activeAccordion === 'events' ? '▼' : '▲'}</span>
            </button>

            {activeAccordion === 'events' && (
              <div className="p-2.5 bg-[#0B0F14]/10 space-y-2.5 border-t border-cmd-border/30 max-h-48 overflow-y-auto">
                {events.map((ev, idx) => (
                  <div key={idx} className="space-y-0.5 border-b border-cmd-border/25 pb-1.5 last:border-0">
                    <h5 className="text-[10.5px] font-bold text-white truncate leading-tight">
                      {ev.title}
                    </h5>
                    <div className="flex justify-between text-[8px] font-mono text-gray-400 uppercase">
                      <span>{ev.date}</span>
                      <span className="text-cmd-primary">{ev.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Volatility warning at the bottom of expander */}
      {!isCollapsed && (
        <div className="p-3 bg-cmd-border/20 border-t border-cmd-border shrink-0 text-center space-y-2">
          <div className="bg-cmd-negative/10 border border-cmd-negative/40 p-2 text-left">
            <span className="text-[9.5px] font-mono text-cmd-negative font-black block tracking-widest uppercase">
              ⚠️ COMPUTATIONAL VOLATILITY ALERT
            </span>
            <p className="text-[10.5px] leading-tight text-gray-300 mt-1">
              Compute spot pricing in US-EAST spiking due to sudden multi-trillion parameters reinforcement training cluster runs.
            </p>
          </div>
          <span className="text-[8px] text-gray-500 font-mono block">SECURE CLOUD RUN SHIELD ACTIVE</span>
        </div>
      )}
    </aside>
  );
};
