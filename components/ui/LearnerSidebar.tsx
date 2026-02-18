'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Award, LogOut, User } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/learn', icon: LayoutDashboard, exact: true },
  { label: 'My Programmes', href: '/learn', icon: BookOpen, match: '/learn/programme' },
  { label: 'Certificates', href: '/learn/certificates', icon: Award },
];

export default function LearnerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    if (item.match) return pathname.startsWith(item.match);
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
        <Logo size="sm" linkTo="/learn" />
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
      <div className="p-4 border-t border-slate-200">
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
