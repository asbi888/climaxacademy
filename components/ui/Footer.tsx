import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Container from '@/components/ui/Container';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
  Programmes: [
    { label: 'Leadership', href: '/programmes' },
    { label: 'Communication', href: '/programmes' },
    { label: 'Team Building', href: '/programmes' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <Container className="py-16">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center text-center mb-12">
          <Logo size="lg" linkTo="/" />
          <p className="mt-4 text-slate-400 text-sm max-w-md">
            Empowering professionals across Mauritius through world-class soft skills training.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Climax Production Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Powered by <span className="text-sky-400">Climax Academy</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
