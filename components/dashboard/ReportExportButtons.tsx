'use client';

import { Download } from 'lucide-react';

interface ReportExportButtonsProps {
  reportTitle: string;
}

export default function ReportExportButtons({ reportTitle }: ReportExportButtonsProps) {
  const handleExport = (format: 'PDF' | 'CSV') => {
    alert(`Exporting "${reportTitle}" as ${format}. This feature is coming soon.`);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleExport('PDF')}
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-accent/10 text-brand-accent rounded-xl text-sm font-semibold hover:bg-brand-accent/20 transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4" />
        Export PDF
      </button>
      <button
        onClick={() => handleExport('CSV')}
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-brand-text border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </button>
    </div>
  );
}
