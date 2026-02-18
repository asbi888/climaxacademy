'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface EnrollmentChartProps {
  data: { month: string; count: number }[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-brand-muted text-xs mb-1">{label}</p>
        <p className="text-brand-text font-semibold text-sm">
          {payload[0].value} enrollment{payload[0].value !== 1 ? 's' : ''}
        </p>
      </div>
    );
  }
  return null;
}

export default function EnrollmentChart({ data }: EnrollmentChartProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-brand-text mb-6">Enrollment Trends</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#0EA5E9"
              strokeWidth={2.5}
              fill="url(#enrollmentGradient)"
              dot={{ fill: '#0EA5E9', stroke: '#FFFFFF', strokeWidth: 2, r: 4 }}
              activeDot={{ fill: '#0EA5E9', stroke: '#38BDF8', strokeWidth: 2, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
