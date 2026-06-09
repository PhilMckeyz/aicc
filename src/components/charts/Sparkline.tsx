import React from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color,
  width = 120,
  height = 36,
}) => {
  if (data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min === 0 ? 1 : max - min;

  // Map each data point into pixel space
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    // Invert Y so high values are at the top
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  // Gradient id for the fill
  const gradId = React.useId();

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      
      {/* Area fill */}
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#${gradId})`}
      />
      
      {/* Stroke line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
      
      {/* End point dot */}
      {data.length > 0 && (
        <circle
          cx={width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r="3"
          className="fill-cmd-bg stroke-cmd-primary animate-pulse"
          stroke={color}
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
};
