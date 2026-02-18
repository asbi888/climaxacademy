'use client';

import dynamic from 'next/dynamic';

const EnrollmentChart = dynamic(() => import('@/components/dashboard/EnrollmentChart'), {
  ssr: false,
  loading: () => (
    <div className="glass-card p-6 h-[380px] flex items-center justify-center">
      <div className="skeleton w-full h-[300px]" />
    </div>
  ),
});

const CompletionChart = dynamic(() => import('@/components/dashboard/CompletionChart'), {
  ssr: false,
  loading: () => (
    <div className="glass-card p-6 h-[380px] flex items-center justify-center">
      <div className="skeleton w-full h-[300px]" />
    </div>
  ),
});

interface DashboardChartsProps {
  enrollmentTrends: { month: string; count: number }[];
  completionByProgramme: { name: string; completion: number }[];
}

export default function DashboardCharts({ enrollmentTrends, completionByProgramme }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up stagger-3">
      <EnrollmentChart data={enrollmentTrends} />
      <CompletionChart data={completionByProgramme} />
    </div>
  );
}
