'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, GraduationCap, BarChart3, LogOut, Settings } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'Employees', href: '/dashboard/employees', icon: Users },
  { label: 'Programmes', href: '/dashboard/programmes', icon: GraduationCap },
  { label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <Logo size="sm" linkTo="/dashboard" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-sky-50 text-brand-accent'
                  : 'text-brand-muted hover:text-brand-text hover:bg-slate-50'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-slate-200 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-muted hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
