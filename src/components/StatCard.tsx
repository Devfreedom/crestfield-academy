import type { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  tone?: 'navy' | 'gold';
};

const CHANGE_COLOR = {
  positive: 'text-success',
  negative: 'text-danger',
  neutral: 'text-slate-500',
} as const;

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  tone = 'navy',
}: StatCardProps) {
  const iconStyle =
    tone === 'gold' ? 'bg-gold/10 text-gold' : 'bg-navy/10 text-navy';

  return (
    <div className="stat-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="stat-card__body flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 font-poppins text-2xl font-bold text-navy">{value}</p>
          {change && (
            <p className={`mt-2 text-xs font-medium ${CHANGE_COLOR[changeType]}`}>{change}</p>
          )}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
