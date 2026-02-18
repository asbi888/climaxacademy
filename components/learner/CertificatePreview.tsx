'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Loader2 } from 'lucide-react';
import { formatDateLong } from '@/lib/utils';

interface CertificatePreviewProps {
  certificate: {
    id: number;
    certificate_number: string;
    issued_at: string;
    valid_until: string;
  };
  userName: string;
  programmeTitle: string;
}

export default function CertificatePreview({
  certificate,
  userName,
  programmeTitle,
}: CertificatePreviewProps) {
  const [downloading, setDownloading] = useState(false);

  const downloadCertificate = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const element = document.getElementById('certificate-canvas');
      if (!element) return;

      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        useCORS: true,
      });

      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Climax-Academy-Certificate-${certificate.certificate_number}.pdf`);
    } catch (err) {
      console.error('Failed to generate certificate PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Download button */}
      <div className="flex justify-end">
        <button
          onClick={downloadCertificate}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-brand-accent to-sky-600 text-white hover:shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download as PDF
            </>
          )}
        </button>
      </div>

      {/* Certificate canvas - scaled preview */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-black/10">
          <div
            id="certificate-canvas"
            style={{
              width: '1120px',
              height: '700px',
              background: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              transformOrigin: 'top left',
            }}
            className="origin-top-left scale-[0.85] md:scale-100"
          >
            {/* Subtle background texture */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.03) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 60% 50% at 80% 100%, rgba(14,165,233,0.02) 0%, transparent 50%)',
                pointerEvents: 'none',
              }}
            />

            {/* Outer border - sky blue elegant */}
            <div
              style={{
                position: 'absolute',
                inset: '16px',
                border: '3px double rgba(14, 165, 233, 0.3)',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
            />

            {/* Inner decorative border */}
            <div
              style={{
                position: 'absolute',
                inset: '28px',
                border: '1px solid rgba(14, 165, 233, 0.12)',
                borderRadius: '4px',
                pointerEvents: 'none',
              }}
            />

            {/* Corner flourishes - top left */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                width: '60px',
                height: '60px',
                borderTop: '2px solid rgba(14, 165, 233, 0.4)',
                borderLeft: '2px solid rgba(14, 165, 233, 0.4)',
                borderTopLeftRadius: '8px',
                pointerEvents: 'none',
              }}
            />
            {/* Corner flourishes - top right */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '60px',
                height: '60px',
                borderTop: '2px solid rgba(14, 165, 233, 0.4)',
                borderRight: '2px solid rgba(14, 165, 233, 0.4)',
                borderTopRightRadius: '8px',
                pointerEvents: 'none',
              }}
            />
            {/* Corner flourishes - bottom left */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                width: '60px',
                height: '60px',
                borderBottom: '2px solid rgba(14, 165, 233, 0.4)',
                borderLeft: '2px solid rgba(14, 165, 233, 0.4)',
                borderBottomLeftRadius: '8px',
                pointerEvents: 'none',
              }}
            />
            {/* Corner flourishes - bottom right */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                width: '60px',
                height: '60px',
                borderBottom: '2px solid rgba(14, 165, 233, 0.4)',
                borderRight: '2px solid rgba(14, 165, 233, 0.4)',
                borderBottomRightRadius: '8px',
                pointerEvents: 'none',
              }}
            />

            {/* Certificate content */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '50px 80px',
                textAlign: 'center',
              }}
            >
              {/* Logo + Academy name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Image
                  src="/images/logocl.png"
                  alt="Climax Academy"
                  width={60}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#0F172A',
                    }}
                  >
                    CLIMAX
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '10px',
                      fontWeight: 300,
                      letterSpacing: '0.25em',
                      color: '#0EA5E9',
                      textTransform: 'uppercase',
                    }}
                  >
                    Academy
                  </span>
                </div>
              </div>

              {/* Certificate of Completion */}
              <h1
                style={{
                  fontFamily: 'var(--font-dm-serif), Georgia, serif',
                  fontSize: '42px',
                  fontWeight: 400,
                  color: '#0F172A',
                  letterSpacing: '0.04em',
                  marginBottom: '4px',
                  marginTop: '12px',
                }}
              >
                Certificate of Completion
              </h1>

              {/* Decorative line */}
              <div
                style={{
                  width: '320px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #0EA5E9, transparent)',
                  margin: '16px 0',
                }}
              />

              {/* Certify text */}
              <p
                style={{
                  fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#64748B',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                This is to certify that
              </p>

              {/* Learner name */}
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif), Georgia, serif',
                  fontSize: '38px',
                  fontWeight: 400,
                  color: '#0EA5E9',
                  marginBottom: '12px',
                  letterSpacing: '0.02em',
                }}
              >
                {userName}
              </h2>

              {/* Completion text */}
              <p
                style={{
                  fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#64748B',
                  marginBottom: '8px',
                  letterSpacing: '0.04em',
                }}
              >
                has successfully completed the programme
              </p>

              {/* Programme title */}
              <h3
                style={{
                  fontFamily: 'var(--font-dm-serif), Georgia, serif',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#0F172A',
                  marginBottom: '20px',
                  maxWidth: '700px',
                  lineHeight: '1.3',
                }}
              >
                {programmeTitle}
              </h3>

              {/* Date and certificate number */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '10px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '4px',
                    }}
                  >
                    Date Issued
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#334155',
                      fontWeight: 500,
                    }}
                  >
                    {formatDateLong(certificate.issued_at)}
                  </p>
                </div>
                <div
                  style={{
                    width: '1px',
                    height: '30px',
                    background: 'rgba(14, 165, 233, 0.3)',
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '10px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '4px',
                    }}
                  >
                    Certificate No.
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#334155',
                      fontWeight: 500,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {certificate.certificate_number}
                  </p>
                </div>
              </div>

              {/* Second decorative line */}
              <div
                style={{
                  width: '480px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.25), transparent)',
                  margin: '12px 0 20px',
                }}
              />

              {/* Signature area */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '100px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '200px',
                      borderBottom: '1px solid rgba(14, 165, 233, 0.3)',
                      marginBottom: '8px',
                      paddingBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-serif), Georgia, serif',
                        fontSize: '16px',
                        color: '#334155',
                        fontStyle: 'italic',
                      }}
                    >
                      Climax Production Ltd
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                      fontSize: '11px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Director of Training
                  </p>
                </div>

                {/* Small logo at bottom */}
                <div style={{ opacity: 0.5 }}>
                  <Image
                    src="/images/logocl.png"
                    alt="Climax"
                    width={32}
                    height={32}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>

            {/* Top accent line */}
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #0EA5E9, transparent)',
                pointerEvents: 'none',
              }}
            />

            {/* Bottom accent line */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #0EA5E9, transparent)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
