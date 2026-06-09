import React from 'react';
import { AreaPulseChart } from '../charts/AreaPulseChart';
import { TrendingUp, Award, Rocket, Banknote, HelpCircle } from 'lucide-react';

interface MarketPulseCardProps {
  searchText?: string;
}

export const MarketPulseCard: React.FC<MarketPulseCardProps> = ({ searchText = "" }) => {
  // Mock performance metrics
  const kpis = [
    {
      id: "mp-1",
      label: "AI ANNOUNCEMENTS TODAY",
      value: "14",
      change: "+27% vs yesterday",
      trend: "up",
      color: "text-cmd-primary",
      icon: Award
    },
    {
      id: "mp-2",
      label: "NEW STARTUPS THIS WEEK",
      value: "52",
      change: "+15% vs last week",
      trend: "up",
      color: "text-cmd-positive",
      icon: Rocket
    },
    {
      id: "mp-3",
      label: "AI FUNDING THIS MONTH",
      value: "$4.82 Billion",
      change: "+34.5% MoM Velocity",
      trend: "up",
      color: "text-cmd-positive",
      icon: Banknote
    },
    {
      id: "mp-4",
      label: "TRENDING COMPANY",
      value: "Cognition AI",
      change: "Global dev-agent buzz",
      trend: "steady",
      color: "text-cmd-warning",
      icon: TrendingUp
    },
    {
      id: "mp-5",
      label: "TRENDING MODEL",
      value: "o1-reasoning",
      change: "Multi-step logic math",
      trend: "up",
      color: "text-cmd-primary",
      icon: HelpCircle
    }
  ];

  return (
    <div id="ai-market-pulse" className="bg-[#131A22] border border-cmd-border rounded p-4 space-y-4 shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold bg-[#00D4FF]/10 px-2 py-0.5 rounded">
            LIVE TELEMETRY
          </span>
          <h2 className="text-sm font-black tracking-wider text-white uppercase mt-1">
            AI Market Pulse
          </h2>
          <p className="text-[11px] text-gray-400">
            Real-time visual monitoring of neural venture capital velocities and parameter compute scales.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-cmd-positive font-mono">
          <span className="w-2 h-2 rounded-full bg-cmd-positive animate-pulse" />
          SYNCED
        </div>
      </div>

      {/* KPI Display Panels */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div 
              key={kpi.id} 
              className="bg-[#0B0F14]/60 border border-cmd-border/60 p-3 hover:border-cmd-primary/30 hover:bg-[#131A22] transition-all relative overflow-hidden"
            >
              {/* Backlight background accent */}
              <div className="absolute right-1 bottom-1 opacity-[0.03] text-white">
                <IconComponent className="w-12 h-12" />
              </div>

              <span className="text-[9px] font-mono text-gray-400 font-bold block tracking-wider truncate">
                {kpi.label}
              </span>
              <div className="text-sm font-black font-mono text-white mt-1">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-gray-400 mt-1">
                <span className={kpi.trend === "up" ? "text-cmd-positive" : "text-cmd-warning"}>
                  {kpi.trend === "up" ? "▲" : "■"}
                </span>
                <span className="truncate">{kpi.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Pulse Chart */}
      <div className="border border-cmd-border/40 bg-[#0B0F14]/40 p-3 rounded">
        <AreaPulseChart />
      </div>
    </div>
  );
};
