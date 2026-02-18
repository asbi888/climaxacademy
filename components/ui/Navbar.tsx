'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Programmes', href: '/programmes' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-brand-accent'
                    : 'text-brand-muted hover:text-brand-text'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold px-5 py-2 rounded-xl border border-slate-300 text-brand-text hover:border-brand-accent hover:text-brand-accent transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-text p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200 animate-slide-down">
          <Container>
            <div className="py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block py-2 text-sm font-medium transition-colors',
                    pathname === link.href ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-text'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="block py-2 text-sm font-semibold text-brand-accent"
              >
                Sign In
              </Link>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}
