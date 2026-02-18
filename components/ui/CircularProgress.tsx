'use client';

import { useEffect, useState } from 'react';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: 'sky' | 'emerald' | 'blue';
  showValue?: boolean;
}

const colorMap = {
  sky: 'stroke-brand-accent',
  emerald: 'stroke-brand-emerald',
  blue: 'stroke-blue-400',
};

const textColorMap = {
  sky: 'text-brand-accent',
  emerald: 'text-brand-emerald',
  blue: 'text-blue-400',
};

export default function CircularProgress({
  value,
  size = 80,
  strokeWidth = 6,
  color = 'sky',
  showValue = true,
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(animatedValue, 0), 100);
  const offset = circumference - (clampedValue / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-slate-200"
          strokeWidth={strokeWidth}
        />
        {/* Foreground ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      </svg>
      {showValue && (
        <span className={`absolute text-sm font-bold ${textColorMap[color]}`}>
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}
