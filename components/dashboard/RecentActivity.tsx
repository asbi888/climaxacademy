interface Activity {
  user_name: string;
  action: string;
  programme_title: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-brand-text mb-6">Recent Activity</h3>
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4 py-3">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent shrink-0 mt-1.5" />
              {index < activities.length - 1 && (
                <div className="w-px flex-1 bg-slate-200 mt-1" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0 pb-1">
              <p className="text-sm text-brand-text leading-relaxed">
                <span className="font-medium">{activity.user_name}</span>{' '}
                <span className="text-brand-muted">{activity.action}</span>{' '}
                <span className="font-medium text-brand-accent">{activity.programme_title}</span>
              </p>
              <p className="text-xs text-brand-muted mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <p className="text-center text-brand-muted text-sm py-8">No recent activity</p>
        )}
      </div>
    </div>
  );
}
