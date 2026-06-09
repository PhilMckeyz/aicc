import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ChartDataPoint {
  time: string;
  computecIndex: number;
  vcInflowNum: number;
  modelEfficiency: number;
}

const pulseDataset: ChartDataPoint[] = [
  { time: "08:00", computecIndex: 4850, vcInflowNum: 13.5, modelEfficiency: 72 },
  { time: "09:00", computecIndex: 4875, vcInflowNum: 13.6, modelEfficiency: 76 },
  { time: "10:00", computecIndex: 4860, vcInflowNum: 13.6, modelEfficiency: 78 },
  { time: "11:00", computecIndex: 4890, vcInflowNum: 13.8, modelEfficiency: 81 },
  { time: "12:00", computecIndex: 4912, vcInflowNum: 14.2, modelEfficiency: 84 },
  { time: "13:00", computecIndex: 4905, vcInflowNum: 14.1, modelEfficiency: 86 },
  { time: "14:00", computecIndex: 4920, vcInflowNum: 14.2, modelEfficiency: 89 },
  { time: "15:00", computecIndex: 4935, vcInflowNum: 14.5, modelEfficiency: 92 },
  { time: "16:00", computecIndex: 4950, vcInflowNum: 14.7, modelEfficiency: 94 }
];

export const AreaPulseChart = () => {
  const [activeMetric, setActiveMetric] = useState<'computecIndex' | 'vcInflowNum' | 'modelEfficiency'>('computecIndex');

  const metricConfig = {
    computecIndex: {
      label: "Computec Grid Index",
      color: "#00D4FF", // Electric Cyan
      unit: " pts"
    },
    vcInflowNum: {
      label: "Venture Capital Inflow",
      color: "#00E676", // Soft Emerald
      unit: "B USD"
    },
    modelEfficiency: {
      label: "Avg Model Inference Efficiency",
      color: "#FFC857", // Amber
      unit: " Tok/ms"
    }
  };

  const currentHighlight = metricConfig[activeMetric];

  // Custom Formatter or Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cmd-bg border border-cmd-border text-xs px-3 py-2 rounded font-mono shadow-xl">
          <p className="text-gray-400 mb-1">Time: {payload[0].payload.time}</p>
          <p style={{ color: currentHighlight.color }} className="font-bold">
            {currentHighlight.label}: {payload[0].value}{currentHighlight.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-cmd-border/40 pb-2">
        {(Object.keys(metricConfig) as Array<keyof typeof metricConfig>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveMetric(key)}
            className={`px-3 py-1.5 text-xs font-mono font-medium border uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeMetric === key
                ? "bg-cmd-surface border-cmd-primary text-cmd-primary glow-primary"
                : "border-cmd-border text-gray-400 hover:text-white hover:border-gray-500"
            }`}
          >
            {metricConfig[key].label}
          </button>
        ))}
      </div>

      {/* Recharts Container */}
      <div className="h-60 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={pulseDataset}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentHighlight.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={currentHighlight.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#253041" opacity={0.4} />
            
            <XAxis
              dataKey="time"
              stroke="#A0AEC0"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="JetBrains Mono, monospace"
            />
            
            <YAxis
              stroke="#A0AEC0"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="JetBrains Mono, monospace"
              domain={['auto', 'auto']}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={currentHighlight.color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#activeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Legend Description */}
      <div className="flex gap-4 items-center">
        <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
          <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: currentHighlight.color }} />
          REALTIME AGGREGATE
        </span>
        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest border border-dashed border-cmd-border px-1.5 py-0.5">
          Sampling interval: 1HR
        </span>
        <span className="ml-auto text-[10px] text-cmd-positive font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cmd-positive animate-pulse" />
          HEALTHY SECURE
        </span>
      </div>
    </div>
  );
};
