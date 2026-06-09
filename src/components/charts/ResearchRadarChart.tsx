import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

const radarDataSample: RadarDataPoint[] = [
  { subject: 'Memory Efficiency', A: 95, fullMark: 100 },
  { subject: 'Inference Speed', A: 88, fullMark: 100 },
  { subject: 'Alignment Safety', A: 78, fullMark: 100 },
  { subject: 'Compute Feasibility', A: 84, fullMark: 100 },
  { subject: 'Commercial Impact', A: 90, fullMark: 100 },
  { subject: 'Math Reasoning', A: 92, fullMark: 100 }
];

export const ResearchRadarChart = () => {
  return (
    <div className="h-60 w-full relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarDataSample}>
          <PolarGrid stroke="#253041" />
          <PolarAngleAxis
            dataKey="subject"
            stroke="#A0AEC0"
            fontSize={9}
            fontFamily="JetBrains Mono, monospace"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            stroke="#253041"
            fontSize={8}
            tick={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0B0F14',
              borderColor: '#253041',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
          <Radar
            name="Radar Signature"
            dataKey="A"
            stroke="#00D4FF"
            fill="#00D4FF"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
