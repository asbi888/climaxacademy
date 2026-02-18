'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { LogIn, Eye, EyeOff, User, Shield, Crown } from 'lucide-react';

type DemoRole = 'learner' | 'hr_admin' | 'climax_admin';

const demoAccounts: Record<DemoRole, { email: string; password: string; label: string }> = {
  learner: {
    email: 'priya.sharma@rogers.mu',
    password: 'demo123',
    label: 'Learner',
  },
  hr_admin: {
    email: 'hr.admin@rogers.mu',
    password: 'demo123',
    label: 'HR Admin',
  },
  climax_admin: {
    email: 'admin@climaxacademy.mu',
    password: 'demo123',
    label: 'Admin',
  },
};

const roleIcons: Record<DemoRole, typeof User> = {
  learner: User,
  hr_admin: Shield,
  climax_admin: Crown,
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState<DemoRole | null>(null);

  function selectRole(role: DemoRole) {
    setActiveRole(role);
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].password);
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      router.push(data.redirect);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with subtle radial gradient */}
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.04)_0%,transparent_40%)]" />

      {/* Decorative floating orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-sky-200/30 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <Logo size="xl" linkTo="" />
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-black/5 p-8 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-brand-text mb-2">
              Welcome Back
            </h1>
            <p className="text-brand-muted text-sm">
              Sign in to your Climax Academy account
            </p>
          </div>

          {/* Role toggle tabs */}
          <div className="flex rounded-xl bg-slate-100 border border-slate-200 p-1 mb-6">
            {(Object.keys(demoAccounts) as DemoRole[]).map((role) => {
              const Icon = roleIcons[role];
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => selectRole(role)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer',
                    activeRole === role
                      ? 'bg-white text-brand-accent border border-slate-200 shadow-sm'
                      : 'text-brand-muted hover:text-brand-text hover:bg-slate-50'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {demoAccounts[role].label}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-medium text-brand-muted uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setActiveRole(null);
                  setError('');
                }}
                placeholder="you@company.com"
                required
                className={cn(
                  'w-full px-4 py-3 rounded-xl text-sm text-brand-text placeholder:text-slate-400',
                  'bg-white border border-slate-300',
                  'outline-none transition-all duration-200',
                  'focus:border-brand-accent focus:bg-white focus:ring-1 focus:ring-brand-accent/20'
                )}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-medium text-brand-muted uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setActiveRole(null);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  required
                  className={cn(
                    'w-full px-4 py-3 pr-11 rounded-xl text-sm text-brand-text placeholder:text-slate-400',
                    'bg-white border border-slate-300',
                    'outline-none transition-all duration-200',
                    'focus:border-brand-accent focus:bg-white focus:ring-1 focus:ring-brand-accent/20'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted/60 hover:text-brand-text transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-slide-down">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </form>
        </div>

        {/* Demo credentials card */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 animate-slide-up stagger-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Demo Credentials
            </h3>
          </div>
          <div className="space-y-2.5">
            {(Object.keys(demoAccounts) as DemoRole[]).map((role) => {
              const Icon = roleIcons[role];
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => selectRole(role)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer',
                    'hover:bg-white group',
                    activeRole === role && 'bg-white'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                    activeRole === role
                      ? 'bg-brand-accent/15 text-brand-accent'
                      : 'bg-slate-100 text-brand-muted group-hover:text-brand-text'
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        'text-xs font-semibold transition-colors',
                        activeRole === role ? 'text-brand-accent' : 'text-brand-text'
                      )}>
                        {demoAccounts[role].label}
                      </span>
                      <span className="text-[10px] text-brand-muted/50 font-mono">demo123</span>
                    </div>
                    <p className="text-[11px] text-brand-muted/60 truncate font-mono">
                      {demoAccounts[role].email}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-fade-in stagger-3">
          <p className="text-xs text-brand-muted/40">
            Powered by{' '}
            <span className="text-brand-muted/60 font-medium">Climax Academy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
