'use client';

import { useState, FormEvent } from 'react';
import {
  CheckCircle,
  Send,
  Building2,
  User,
  Mail,
  Phone,
  Users,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Shield,
  Award,
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

const programmes = [
  'Leadership Essentials',
  'Effective Communication',
  'Conflict Resolution',
  'Emotional Intelligence',
  'Team Building',
  'Strategic Negotiation',
];

const benefits = [
  {
    icon: Sparkles,
    title: 'Tailored Programmes',
    description: 'Custom-designed content aligned with your organisational goals and industry context.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Impact',
    description: 'Real-time analytics dashboard to track learner progress and ROI on training investment.',
  },
  {
    icon: Shield,
    title: 'Certified Facilitators',
    description: 'Delivered by experienced professionals with deep expertise in behavioural development.',
  },
  {
    icon: Award,
    title: 'Recognised Credentials',
    description: 'Learners receive verifiable digital certificates upon programme completion.',
  },
];

const employeeRanges = [
  { value: '', label: 'Select range' },
  { value: '1-50', label: '1 - 50' },
  { value: '50-200', label: '50 - 200' },
  { value: '200-500', label: '200 - 500' },
  { value: '500-1000', label: '500 - 1,000' },
  { value: '1000+', label: '1,000+' },
];

const inputClasses =
  'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-brand-text placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-colors duration-200 text-sm';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>([]);

  function toggleProgramme(programme: string) {
    setSelectedProgrammes((prev) =>
      prev.includes(programme)
        ? prev.filter((p) => p !== programme)
        : [...prev, programme]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-emerald/5 rounded-full blur-3xl pointer-events-none" />

          <Container className="relative z-10">
            <div className="text-center mb-16 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-6">
                <Mail className="w-4 h-4" />
                Corporate Enquiries
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4 font-serif">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                Partner with Climax Academy to empower your workforce through
                world-class soft skills training. Let us design a programme
                tailored to your organisation.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Left - Contact Form */}
              <div className="lg:col-span-3 animate-slide-up stagger-1">
                <div className="glass-card p-8">
                  {submitted ? (
                    <div className="text-center py-16 animate-scale-in">
                      <div className="w-20 h-20 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-brand-emerald" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-text mb-3">
                        Thank You!
                      </h3>
                      <p className="text-brand-muted max-w-md mx-auto">
                        Our team will contact you within 24 hours. We look
                        forward to discussing how Climax Academy can support
                        your organisation.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h2 className="text-xl font-semibold text-brand-text mb-1">
                        Enquiry Form
                      </h2>
                      <p className="text-sm text-brand-muted mb-6">
                        Fill in the details below and our partnerships team will
                        get back to you.
                      </p>

                      {/* Company Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                          <Building2 className="w-4 h-4 text-brand-muted" />
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="e.g. Acme Ltd"
                          className={inputClasses}
                        />
                      </div>

                      {/* Two cols: Contact Person + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                            <User className="w-4 h-4 text-brand-muted" />
                            Contact Person
                          </label>
                          <input
                            type="text"
                            name="contactPerson"
                            required
                            placeholder="Full name"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                            <Mail className="w-4 h-4 text-brand-muted" />
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@company.com"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Two cols: Phone + Employees */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                            <Phone className="w-4 h-4 text-brand-muted" />
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+230 5XXX XXXX"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                            <Users className="w-4 h-4 text-brand-muted" />
                            Number of Employees
                          </label>
                          <select
                            name="employees"
                            required
                            className={`${inputClasses} appearance-none cursor-pointer`}
                            defaultValue=""
                          >
                            {employeeRanges.map((range) => (
                              <option
                                key={range.value}
                                value={range.value}
                                disabled={range.value === ''}
                                className="bg-brand-card text-brand-text"
                              >
                                {range.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Programmes of Interest */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-3">
                          <Sparkles className="w-4 h-4 text-brand-muted" />
                          Programmes of Interest
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {programmes.map((programme) => {
                            const isSelected =
                              selectedProgrammes.includes(programme);
                            return (
                              <label
                                key={programme}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 text-sm ${
                                  isSelected
                                    ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-text'
                                    : 'bg-slate-50 border-slate-200 text-brand-muted hover:border-slate-300 hover:text-brand-text'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleProgramme(programme)}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-4.5 h-4.5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                                    isSelected
                                      ? 'bg-brand-accent border-brand-accent'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                  style={{ width: '18px', height: '18px' }}
                                >
                                  {isSelected && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                {programme}
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                          <MessageSquare className="w-4 h-4 text-brand-muted" />
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell us about your training needs, team size, timelines..."
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        className="w-full"
                      >
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right - Why Partner Panel */}
              <div className="lg:col-span-2 animate-slide-up stagger-2">
                <div className="glass-card p-8 sticky top-28">
                  <h2 className="text-xl font-semibold text-brand-text mb-6">
                    Why Partner with{' '}
                    <span className="text-gradient">Climax Academy</span>?
                  </h2>

                  {/* Benefits */}
                  <div className="space-y-5 mb-8">
                    {benefits.map((benefit) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={benefit.title} className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-brand-accent" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-brand-text mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-xs text-brand-muted leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200 my-6" />

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-2xl font-bold text-gradient">500+</p>
                      <p className="text-xs text-brand-muted mt-1">
                        Professionals Trained
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-2xl font-bold text-gradient">98%</p>
                      <p className="text-xs text-brand-muted mt-1">
                        Satisfaction Rate
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200 my-6" />

                  {/* Logo */}
                  <div className="flex justify-center">
                    <Logo variant="full" size="lg" linkTo="/" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
