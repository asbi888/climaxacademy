import { Award } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';

interface TopPerformer {
  name: string;
  department: string;
  avg_completion: number;
  certificates: number;
}

interface TopPerformersProps {
  data: TopPerformer[];
}

export default function TopPerformers({ data }: TopPerformersProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-brand-text mb-6">Top Performers</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider pb-3 pr-4">
                Employee
              </th>
              <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider pb-3 pr-4">
                Department
              </th>
              <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider pb-3 pr-4 w-40">
                Avg Progress
              </th>
              <th className="text-center text-xs font-medium text-brand-muted uppercase tracking-wider pb-3">
                Certs
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((performer, index) => (
              <tr
                key={performer.name}
                className={index % 2 === 1 ? 'bg-slate-50' : ''}
              >
                <td className="py-3 pr-4">
                  <span className="text-sm font-medium text-brand-text">{performer.name}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm text-brand-muted">{performer.department}</span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <ProgressBar value={performer.avg_completion} size="sm" color="sky" />
                    <span className="text-xs font-medium text-brand-muted whitespace-nowrap">
                      {performer.avg_completion}%
                    </span>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {performer.certificates > 0 && (
                      <Award className="w-4 h-4 text-brand-accent" />
                    )}
                    <span className="text-sm font-medium text-brand-text">
                      {performer.certificates}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-brand-muted text-sm">
                  No employee data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
