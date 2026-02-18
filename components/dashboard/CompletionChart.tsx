'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CompletionChartProps {
  data: { name: string; completion: number }[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-brand-muted text-xs mb-1">{label}</p>
        <p className="text-brand-text font-semibold text-sm">
          {payload[0].value}% avg completion
        </p>
      </div>
    );
  }
  return null;
}

export default function CompletionChart({ data }: CompletionChartProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-brand-text mb-6">Completion by Programme</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity={1} />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 11 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="completion" fill="url(#barGradient)" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
