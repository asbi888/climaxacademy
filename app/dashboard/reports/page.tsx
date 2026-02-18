import { redirect } from 'next/navigation';
import { BarChart3, FileText, Award, Activity, Download, Calendar } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import ReportExportButtons from '@/components/dashboard/ReportExportButtons';

const reports = [
  {
    id: 'training-summary',
    title: 'Training Summary',
    description: 'Comprehensive overview of all training activities including enrolments, completion rates, and time spent across all programmes.',
    icon: FileText,
    color: 'sky' as const,
    dateRange: 'Last 12 months',
  },
  {
    id: 'certificate-report',
    title: 'Certificate Report',
    description: 'Detailed report of all certificates issued, including employee names, programme titles, issue dates, and validity periods.',
    icon: Award,
    color: 'emerald' as const,
    dateRange: 'Last 12 months',
  },
  {
    id: 'engagement-report',
    title: 'Engagement Report',
    description: 'Employee engagement metrics including login frequency, time spent learning, module completion patterns, and quiz performance trends.',
    icon: Activity,
    color: 'blue' as const,
    dateRange: 'Last 6 months',
  },
];

const colorConfig = {
  sky: {
    iconBg: 'bg-brand-accent/10',
    iconText: 'text-brand-accent',
  },
  emerald: {
    iconBg: 'bg-brand-emerald/10',
    iconText: 'text-brand-emerald',
  },
  blue: {
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
  },
};

export default async function ReportsPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    redirect('/login');
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-brand-accent" />
          Reports & Exports
        </h1>
        <p className="text-brand-muted mt-1">
          Generate and download detailed training reports for your organization
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const Icon = report.icon;
          const colors = colorConfig[report.color];

          return (
            <div
              key={report.id}
              className="glass-card glass-card-hover p-6 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${colors.iconText}`} />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-brand-text mb-2">{report.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">
                {report.description}
              </p>

              {/* Date Range */}
              <div className="flex items-center gap-2 text-xs text-brand-muted mb-5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{report.dateRange}</span>
              </div>

              {/* Export Buttons */}
              <ReportExportButtons reportTitle={report.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
