'use client';

import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  emptyMessage = 'No data available',
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-slate-200 bg-white', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-slate-600">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider',
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-brand-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={cn(
                  'border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-brand-text', col.className)}>
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
